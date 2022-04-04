export const changePossibleMoves = (item) => {
  return {
    type: "CHANGE_POSSIBLE_MOVES",
    payload: {
      item,
    },
  };
};

export const changePickedPiece = (item) => {
  return {
    type: "CHANGE_PICKED_PIECE",
    payload: {
      item,
    },
  };
};

export const movePiece = (board, allPieces) => {
  return {
    type: "MOVE_PIECE",
    payload: {
      board,
      allPieces,
    },
  };
};

export const changePossibleAttack = (item) => {
  return {
    type: "CHANGE_POSSIBLE_ATTACK",
    payload: {
      item,
    },
  };
};
