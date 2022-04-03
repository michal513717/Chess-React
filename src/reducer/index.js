const initialState = {
  board: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
  ],
  allPieces: [
    { typeOfPiece: "pawn_white", x: 1, y: 0, type: 1 },
    { typeOfPiece: "pawn_white", x: 1, y: 1, type: 1 },
    { typeOfPiece: "pawn_white", x: 1, y: 2, type: 1 },
    { typeOfPiece: "pawn_white", x: 1, y: 3, type: 1 },
    { typeOfPiece: "pawn_white", x: 1, y: 4, type: 1 },
    { typeOfPiece: "pawn_white", x: 1, y: 5, type: 1 },
    { typeOfPiece: "pawn_white", x: 1, y: 6, type: 1 },
    { typeOfPiece: "pawn_white", x: 1, y: 7, type: 1 },
    { typeOfPiece: "rook_white", x: 0, y: 0, type: 1 },
    { typeOfPiece: "knight_white", x: 0, y: 1, type: 1 },
    { typeOfPiece: "bishop_white", x: 0, y: 2, type: 1 },
    { typeOfPiece: "queen_white", x: 0, y: 3, type: 1 },
    { typeOfPiece: "king_white", x: 0, y: 4, type: 1 },
    { typeOfPiece: "bishop_white", x: 0, y: 5, type: 1 },
    { typeOfPiece: "knight_white", x: 0, y: 6, type: 1 },
    { typeOfPiece: "rook_white", x: 0, y: 7, type: 1 },
    { typeOfPiece: "pawn_black", x: 6, y: 0, type: 2 },
    { typeOfPiece: "pawn_black", x: 6, y: 1, type: 2 },
    { typeOfPiece: "pawn_black", x: 6, y: 2, type: 2 },
    { typeOfPiece: "pawn_black", x: 6, y: 3, type: 2 },
    { typeOfPiece: "pawn_black", x: 6, y: 4, type: 2 },
    { typeOfPiece: "pawn_black", x: 6, y: 5, type: 2 },
    { typeOfPiece: "pawn_black", x: 6, y: 6, type: 2 },
    { typeOfPiece: "pawn_black", x: 6, y: 7, type: 2 },
    { typeOfPiece: "rook_black", x: 7, y: 0, type: 2 },
    { typeOfPiece: "knight_black", x: 7, y: 1, type: 2 },
    { typeOfPiece: "bishop_black", x: 7, y: 2, type: 2 },
    { typeOfPiece: "queen_black", x: 7, y: 3, type: 2 },
    { typeOfPiece: "king_black", x: 7, y: 4, type: 2 },
    { typeOfPiece: "bishop_black", x: 7, y: 5, type: 2 },
    { typeOfPiece: "knight_black", x: 7, y: 6, type: 2 },
    { typeOfPiece: "rook_black", x: 7, y: 7, type: 2 },
  ],
  possibleMoves: [],
  possibleAttack: [],
  allEnemyPossibleAttack: [],
  pickedPiece: [],
  turnPlayer: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_POSSIBLE_MOVES":
      return {
        ...state,
        possibleMoves: [...action.payload.item],
      };
    case "CHANGE_POSSIBLE_ATTACK":
      return {
        ...state,
        possibleAttack: [...action.payload.item],
      };
    case "CHANGE_PICKED_PIECE":
      return {
        ...state,
        pickedPiece: [action.payload.item],
      };
    case "MOVE_PIECE":
      return {
        ...state,
        allPieces: [...action.payload.allPieces],
        board: [...action.payload.board],
        possibleMoves: [],
        possibleAttack: [],
        turnPlayer: state.turnPlayer === 1 ? 2 : 1,
      };
    default:
      return state;
  }
};

export default rootReducer;
