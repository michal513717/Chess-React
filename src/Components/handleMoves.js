export const handleMovePawn = (piece, board) => {
  let possibleAttack = [];
  let possibleMoves = [];
  const { x, y } = piece;

  if (piece.type === 1) {
    if (x === 1) {
      possibleMoves.push({ x: x + 1, y }, { x: x + 2, y });
    } else {
      if (x + 1 === 7) {
        handlePromotionChess();
      }
      if (x + 1 <= 7 && board[x + 1][y] === 0) {
        possibleMoves.push({ x: x + 1, y });
      }
    }

    if (board[x + 1][y + 1] !== 0 && board[x + 1][y + 1] !== piece.type) {
      possibleAttack.push({ x: x + 1, y: y + 1 });
    }

    if (board[x + 1][y - 1] !== 0 && board[x + 1][y - 1] !== piece.type) {
      possibleAttack.push({ x: x + 1, y: y - 1 });
    }
  } else {
    if (x === 6) {
      possibleMoves.push({ x: x - 1, y }, { x: x - 2, y });
    } else {
      if (x - 1 === 0) {
        handlePromotionChess();
      }
      if (x - 1 >= 0 && board[x - 1][y] === 0) {
        possibleMoves.push({ x: x - 1, y });
      }
    }

    if (board[x - 1][y + 1] !== 0 && board[x - 1][y + 1] !== piece.type) {
      possibleAttack.push({ x: x - 1, y: y + 1 });
    }

    if (board[x - 1][y - 1] !== 0 && board[x - 1][y - 1] !== piece.type) {
      possibleAttack.push({ x: x - 1, y: y - 1 });
    }
  }

  return { possibleMoves, possibleAttack };
};

export const handleMoveKing = (piece, board) => {
  let possibleMoves = [];
  let possibleAttack = [];

  const { x, y } = piece;

  if (x <= 6 && board[x + 1][y] !== piece.type) {
    possibleMoves.push({ x: x + 1, y: y });
  }
  if (x <= 6 && y >= 1 && board[x + 1][y - 1] !== piece.type) {
    possibleMoves.push({ x: x + 1, y: y - 1 });
  }
  if (x <= 6 && y <= 6 && board[x + 1][y + 1] !== piece.type) {
    possibleMoves.push({ x: x + 1, y: y + 1 });
  }
  if (y <= 6 && board[x][y + 1] !== piece.type) {
    possibleMoves.push({ x: x, y: y + 1 });
  }
  if (y >= 1 && board[x][y - 1] !== piece.type) {
    possibleMoves.push({ x: x, y: y - 1 });
  }
  if (x >= 1 && board[x - 1][y] !== piece.type) {
    possibleMoves.push({ x: x - 1, y: y });
  }
  if (x >= 1 && y <= 6 && board[x - 1][y + 1] !== piece.type) {
    possibleMoves.push({ x: x - 1, y: y + 1 });
  }
  if (x >= 1 && y >= 1 && board[x - 1][y - 1] !== piece.type) {
    possibleMoves.push({ x: x - 1, y: y - 1 });
  }

  possibleMoves.forEach((item) => {
    if (board[item.x][item.y] !== (piece.type && 0)) {
      possibleAttack.push({ x: item.x, y: item.y });
    }
  });

  return { possibleMoves, possibleAttack };
};

export const handleMoveQueen = (piece, board) => {
  let possibleMoves = [];
  let possibleAttack = [];

  possibleMoves.push(...checkDiagonalDown(piece, board).possibleMoves);
  possibleMoves.push(...checkDiagonalUp(piece, board).possibleMoves);
  possibleMoves.push(...checkVertically(piece, board).possibleMoves);
  possibleMoves.push(...checkHorizontally(piece, board).possibleMoves);
  possibleAttack.push(...checkHorizontally(piece, board).possibleAttack);
  possibleAttack.push(...checkVertically(piece, board).possibleAttack);
  possibleAttack.push(...checkDiagonalUp(piece, board).possibleAttack);
  possibleAttack.push(...checkDiagonalDown(piece, board).possibleAttack);

  return { possibleMoves, possibleAttack };
};

export const handleMoveKnight = (piece, board) => {
  let possibleMoves = [];
  let possibleAttack = [];
  const { x, y } = piece;

  if (x >= 2 && y >= 1 && board[x - 2][y - 1] !== piece.type) {
    possibleMoves.push({ x: x - 2, y: y - 1 });
  }
  if (x >= 1 && y >= 2 && board[x - 1][y - 2] !== piece.type) {
    possibleMoves.push({ x: x - 1, y: y - 2 });
  }
  if (x <= 5 && y >= 1 && board[x + 2][y - 1] !== piece.type) {
    possibleMoves.push({ x: x + 2, y: y - 1 });
  }
  if (x <= 6 && y >= 2 && board[x + 1][y - 2] !== piece.type) {
    possibleMoves.push({ x: x + 1, y: y - 2 });
  }
  if (x <= 6 && y <= 5 && board[x + 1][y + 2] !== piece.type) {
    possibleMoves.push({ x: x + 1, y: y + 2 });
  }
  if (x <= 5 && y <= 6 && board[x + 2][y + 1] !== piece.type) {
    possibleMoves.push({ x: x + 2, y: y + 1 });
  }
  if (x >= 1 && y <= 5 && board[x - 1][y + 2] !== piece.type) {
    possibleMoves.push({ x: x - 1, y: y + 2 });
  }
  if (x >= 2 && y <= 6 && board[x - 2][y + 1] !== piece.type) {
    possibleMoves.push({ x: x - 2, y: y + 1 });
  }

  possibleMoves.forEach((item) => {
    if (board[item.x][item.y] !== (piece.type && 0)) {
      possibleAttack.push({ x: item.x, y: item.y });
    }
  });

  return { possibleMoves, possibleAttack };
};

export const handleMoveRook = (piece, board) => {
  let possibleMoves = [];
  let possibleAttack = [];

  possibleMoves.push(...checkVertically(piece, board).possibleMoves);
  possibleMoves.push(...checkHorizontally(piece, board).possibleMoves);
  possibleAttack.push(...checkHorizontally(piece, board).possibleAttack);
  possibleAttack.push(...checkVertically(piece, board).possibleAttack);

  return { possibleMoves, possibleAttack };
};

export const handleMoveBishop = (piece, board) => {
  let possibleMoves = [];
  let possibleAttack = [];

  possibleMoves.push(...checkDiagonalUp(piece, board).possibleMoves);
  possibleMoves.push(...checkDiagonalDown(piece, board).possibleMoves);
  possibleAttack.push(...checkDiagonalUp(piece, board).possibleAttack);
  possibleAttack.push(...checkDiagonalDown(piece, board).possibleAttack);

  return { possibleMoves, possibleAttack };
};

const checkVertically = (piece, board) => {
  let possibleMoves = [];
  let possibleAttack = [];

  for (let i = piece.x + 1; i < 7; i++) {
    if (board[i][piece.y] === 0) {
      possibleMoves.push({ x: i, y: piece.y });
    } else {
      if (board[i][piece.y] !== piece.type) {
        possibleAttack.push({ x: i, y: piece.y });
      }
      break;
    }
  }

  for (let i = piece.x - 1; i >= 0; i--) {
    if (board[i][piece.y] === 0) {
      possibleMoves.push({ x: i, y: piece.y });
    } else {
      if (board[i][piece.y] !== piece.type) {
        possibleAttack.push({ x: i, y: piece.y });
      }
      break;
    }
  }

  return { possibleMoves, possibleAttack };
};

const checkHorizontally = (piece, board) => {
  let possibleMoves = [];
  let possibleAttack = [];

  for (let i = piece.y + 1; i <= 7; i++) {
    if (board[piece.x][i] === 0) {
      possibleMoves.push({ x: piece.x, y: i });
    } else {
      if (board[piece.x][i] !== piece.type) {
        possibleAttack.push({ x: piece.x, y: i });
      }
      break;
    }
  }

  for (let i = piece.y - 1; i >= 0; i--) {
    if (board[piece.x][i] === 0) {
      possibleMoves.push({ x: piece.x, y: i });
    } else {
      if (board[piece.x][i] !== piece.type) {
        possibleAttack.push({ x: piece.x, y: i });
      }
      break;
    }
  }

  return { possibleMoves, possibleAttack };
};

const checkDiagonalDown = (piece, board) => {
  let possibleMoves = [];
  let possibleAttack = [];

  let iteration = 1;
  for (let i = piece.x + 1; i <= 7; i++) {
    if (board[i][iteration + piece.y] === 0) {
      possibleMoves.push({ x: i, y: piece.y + iteration });
    } else {
      if (board[i][iteration + piece.y] !== piece.type) {
        possibleAttack.push({ x: i, y: piece.y + iteration });
      }
      break;
    }
    iteration += 1;
  }

  iteration = 1;
  for (let i = piece.x + 1; i <= 7; i++) {
    if (board[i][piece.y - iteration] === 0) {
      possibleMoves.push({ x: i, y: piece.y - iteration });
    } else {
      if (board[i][piece.y - iteration] !== piece.type) {
        possibleAttack.push({ x: i, y: piece.y - iteration });
      }
      break;
    }
    iteration += 1;
  }

  possibleAttack = deleteNegative(possibleAttack);
  possibleMoves = deleteNegative(possibleMoves);

  return { possibleMoves, possibleAttack };
};

const checkDiagonalUp = (piece, board) => {
  let possibleAttack = [];
  let possibleMoves = [];
  let iteration = 1;
  for (let i = piece.x - 1; i >= 0; i--) {
    if (board[i][iteration + piece.y] === 0) {
      possibleMoves.push({ x: i, y: piece.y + iteration });
    } else {
      if (board[i][iteration + piece.y] !== piece.type) {
        possibleAttack.push({ x: i, y: piece.y + iteration });
      }
      break;
    }
    iteration += 1;
  }

  iteration = 1;
  for (let i = piece.x - 1; i >= 0; i--) {
    if (board[i][piece.y - iteration] === 0) {
      possibleMoves.push({ x: i, y: piece.y - iteration });
    } else {
      if (board[i][piece.y - iteration] !== piece.type) {
        possibleAttack.push({ x: i, y: piece.y - iteration });
      }
      break;
    }
    iteration += 1;
  }

  possibleAttack = deleteNegative(possibleAttack);
  possibleMoves = deleteNegative(possibleMoves);

  return { possibleMoves, possibleAttack };
};

const deleteNegative = (possibleMoves) => {
  return possibleMoves.filter((item) => {
    return item.x >= 0 && item.x <= 7 && item.y <= 7 && item.y >= 0;
  });
};

const handlePromotionChess = () => {
  console.log("promotion !");
};
