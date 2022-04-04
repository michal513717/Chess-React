import PropTypes, { arrayOf } from "prop-types";
import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import pieces from "../assets/impotedSVG";
import { changePossibleMoves as changePossibleMovesAction } from "../actions";
import { movePiece as MovePieceAction } from "../actions";
import { changePickedPiece as changePickedPieceAction } from "../actions";
import { changePossibleAttack as changePossibleAttackAction } from "../actions";
import {
  handleMovePawn,
  handleMoveBishop,
  handleMoveKing,
  handleMoveKnight,
  handleMoveQueen,
  handleMoveRook,
} from "./handleMoves";

const handleActions = {
  bishop: (piece, board) => handleMoveBishop(piece, board),
  pawn: (piece, board) => handleMovePawn(piece, board),
  king: (piece, board) => handleMoveKing(piece, board),
  knight: (piece, board) => handleMoveKnight(piece, board),
  queen: (piece, board) => handleMoveQueen(piece, board),
  rook: (piece, board) => handleMoveRook(piece, board),
};

const StyledChees = styled.div`
  background: url(${({ url }) => pieces[url]}) no-repeat;
  background-size: contain;
  min-width: 100px;
  min-height: 100px;
  position: absolute;
  top: 0;
`;

const FreeField = styled.div`
  min-width: 100px;
  min-height: 100px;
  width: 100%;
  height: 100%;
  background: green;
  border-radius: 50%;
  opacity: 0.3;
  position: absolute;
  top: 0;
  z-index: 1;
`;

const FieldToAttack = styled.div`
  min-width: 100px;
  min-height: 100px;
  width: 100%;
  height: 100%;
  background: red;
  border-radius: 50%;
  opacity: 0.3;
  position: absolute;
  top: 0;
  z-index: 999;
`;

class ChessPiece extends React.Component {
  handleClickPieces = async (piece) => {
    if (piece.type === this.props.turnPlayer) {
      if (piece !== this.props.currentPickedPiece) {
        await this.props.changePickedPiece(piece);
      }
      this.handleSearchMoves(piece);
    }
  };

  handleMove = async (x, y, typeOfAction = "move") => {
    const { currentPickedPiece } = this.props;

    let newBoard = JSON.parse(JSON.stringify(this.props.board)); // deep copy of props "board"
    let newAllPieces = JSON.parse(JSON.stringify(this.props.allPieces));

    if (typeOfAction === "attack") {
      newAllPieces = newAllPieces.filter((item) => {
        return !(item.x === x && item.y === y);
      });
    }

    newBoard[currentPickedPiece[0].x][currentPickedPiece[0].y] = 0;
    newBoard[x][y] = currentPickedPiece[0].type;

    newAllPieces.forEach((item) => {
      if (item.x === currentPickedPiece[0].x && item.y === currentPickedPiece[0].y) {
        item.x = x;
        item.y = y;
      }
    });

    await this.props.movePiece(newBoard, newAllPieces);
    this.handleCheckKing();
  };

  handleCheckKing = () => {
    const { board, currentPickedPiece, allPieces } = this.props;
    let allEnemyPossibleAttack = [];
    let positionOfKing = {};
    allPieces.forEach((item) => {
      if (item.type === currentPickedPiece[0].type) {
        let object = handleActions[item.typeOfPiece.split("_")[0]](item, board);
        allEnemyPossibleAttack.push(...object.possibleAttack, ...object.possibleMoves);
      } else {
        if (item.typeOfPiece.split("_")[0] === "king") {
          positionOfKing = item;
        }
      }
    });

    allEnemyPossibleAttack.forEach((item) => {
      if (item.x === positionOfKing.x && item.y === positionOfKing.y) {
        this.handleCanKingEscape(allEnemyPossibleAttack, positionOfKing);
      }
    });
  };

  handleCanKingEscape = (allEnemyPossibleAttack, positionOfKing) => {
    let whereCanKingEscape = handleActions["king"](positionOfKing, this.props.board);
    whereCanKingEscape = [
      ...whereCanKingEscape.possibleMoves,
      ...whereCanKingEscape.possibleAttack,
    ];
    let possibleKingMoves = [];

    whereCanKingEscape.forEach((item) => {
      let canKingGoThere = true;
      allEnemyPossibleAttack.forEach((item2) => {
        if (item.x === item2.x && item.y === item2.y) {
          canKingGoThere = false;
        }
      });
      if (canKingGoThere) {
        possibleKingMoves.push(item);
      }
    });

    this.handleCanBlockKing();
    console.log(possibleKingMoves);
  };

  handleCanBlockKing = () => {};

  handleSearchMoves = (piece) => {
    const { board } = this.props;
    let MovesToCheck = [];
    let typeOfPiece = piece.typeOfPiece.split("_")[0];

    MovesToCheck = handleActions[typeOfPiece](piece, board);

    this.props.changePossibleAttack(MovesToCheck.possibleAttack);
    this.props.changePossibleMoves(MovesToCheck.possibleMoves);
  };

  render() {
    const { possibleMoves, possibleAttack, fieldX, fieldY, allPieces } = this.props;

    const result = [...allPieces].filter((element) => {
      return element.x === fieldX && element.y === fieldY;
    });

    return (
      <>
        {possibleAttack.filter((item) => {
          return item.x === fieldX && item.y === fieldY;
        }).length > 0 ? (
          <FieldToAttack onClick={() => this.handleMove(fieldX, fieldY, "attack")}></FieldToAttack>
        ) : (
          <></>
        )}
        {possibleMoves.filter((item) => {
          return item.x === fieldX && item.y === fieldY;
        }).length > 0 ? (
          <FreeField onClick={() => this.handleMove(fieldX, fieldY)}></FreeField>
        ) : (
          <></>
        )}
        {result.length > 0 ? (
          <StyledChees
            url={result[0].typeOfPiece}
            onClick={() => this.handleClickPieces(result[0])}
          ></StyledChees>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
  allPieces: state.allPieces,
  possibleMoves: state.possibleMoves,
  possibleAttack: state.possibleAttack,
  turnPlayer: state.turnPlayer,
  currentPickedPiece: state.pickedPiece,
});

const mapDispatchToProps = (dispatch) => ({
  changePossibleMoves: (possibleMoves) => dispatch(changePossibleMovesAction(possibleMoves)),
  movePiece: (board, allPieces) => dispatch(MovePieceAction(board, allPieces)),
  changePickedPiece: (pickedPiece) => dispatch(changePickedPieceAction(pickedPiece)),
  changePossibleAttack: (possibleAttack) => dispatch(changePossibleAttackAction(possibleAttack)),
});

ChessPiece.propTypes = {
  board: PropTypes.arrayOf(arrayOf(PropTypes.number)).isRequired,
  turnPlayer: PropTypes.number.isRequired,

  allPieces: PropTypes.arrayOf(
    PropTypes.shape({
      typeOfPiece: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      type: PropTypes.number.isRequired,
    }),
  ),

  possibleAttack: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ),

  possibleMoves: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ),

  currentPickedPiece: PropTypes.arrayOf(
    PropTypes.shape({
      typeOfPiece: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      type: PropTypes.number.isRequired,
    }),
  ),

  changePossibleMoves: PropTypes.func,
  movePiece: PropTypes.func,
  changePickedPiece: PropTypes.func,
  changePossibleAttack: PropTypes.func,

  fieldX: PropTypes.number.isRequired,
  fieldY: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessPiece);
