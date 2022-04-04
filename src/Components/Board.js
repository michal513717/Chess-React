import React from "react";
import styled from "styled-components";
import CheesPiece from "./ChessPiece";

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100wh;
  display: flex;
  flex-direction: center;
  align-items: center;
`;

const StyledBoard = styled.div`
  display: grid;
  width: 80vh;
  height: 80vh;
  grid-template-columns: repeat(8, 1fr);
  grid-template-row: repeat(8, 1fr);
  border: 2px solid black;
  min-width: 800px;
  min-height: 800px;
`;

const StyledField = styled.div`
  background-color: ${({ color }) => (color ? "rgb(255,205,157)" : "rgb(210,141,73)")};
  min-width: 100px;
  min-height: 100px;
  position: relative;
`;

class Board extends React.Component {
  state = {
    board: [],
  };

  componentDidMount() {
    let board = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board.push(
          <StyledField key={`${i}-${j}`} color={(i + j) % 2}>
            <CheesPiece fieldX={i} fieldY={j} />
          </StyledField>,
        );
      }
    }

    this.setState(() => ({
      board: board,
    }));
  }

  render() {
    return (
      <StyledWrapper>
        <StyledBoard>{this.state.board}</StyledBoard>
      </StyledWrapper>
    );
  }
}

export default Board;
