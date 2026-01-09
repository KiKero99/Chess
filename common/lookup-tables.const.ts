export const EMPTY_MOVE = 255;
export const WHITE = 0;
export const BLACK = 1;

function fillEmpty(arr: Uint8Array, index: number) {
  while (index < arr.length) {
    arr[index++] = EMPTY_MOVE;
  }
}

//KNIGHTS
const KNIGHT_DELTAS = [
    [-2,-1], [-2,1], [-1,-2], [-1,2],
    [1,-2], [1,2], [2,-1], [2,1]
];

const knightMoves: Uint8Array[] = Array.from({ length: 64 }, () => new Uint8Array(8));

function getKnightMoves(sq: number, row: number, col: number) {
  const arr = knightMoves[sq];
  let index = 0;

  for (const [dr, dc] of KNIGHT_DELTAS) {
    const r = row + dr;
    const c = col + dc;

    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      arr[index++] = r * 8 + c;
    }
  }

  //The rest of the moves are invalid
  fillEmpty(arr, index);
}

//KING
const KING_DELTAS = [
  [-1, -1], [-1,  0], [-1,  1],
  [ 0, -1],           [ 0,  1],
  [ 1, -1], [ 1,  0], [ 1,  1],
];

const kingMoves: Uint8Array[] = Array.from({ length: 64 }, () => new Uint8Array(8));

function getKingMoves(sq: number, row: number, col: number) {
  const arr = kingMoves[sq];
  let index = 0;

  for (const [dr, dc] of KING_DELTAS) {
    const r = row + dr;
    const c = col + dc;

    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      arr[index++] = r * 8 + c;
    }
  }

  //The rest of the moves are invalid
  fillEmpty(arr, index);
}

//ROOKS
const ROOK_DELTAS = [
  [ 1,  0],
  [ 0,  1],
  [-1,  0],
  [ 0, -1],
];

const rookMoves: Uint8Array[] = Array.from({ length: 64 }, () => new Uint8Array(18));

function getRookMoves(sq: number, row: number, col: number) {
  const arr = rookMoves[sq];
  let index = 0;
  for (const [dr, dc] of ROOK_DELTAS) {
    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      arr[index++] = r * 8 + c;
      r += dr;
      c += dc;
    }
    arr[index++] = EMPTY_MOVE;
  }

  //The rest of the moves are invalid
  fillEmpty(arr, index);
}

//BISHOPS
const BISHOP_DELTAS = [
  [ 1,  1],
  [ 1, -1],
  [-1,  1],
  [-1, -1],
];

const bishopMoves: Uint8Array[] = Array.from({ length: 64 }, () => new Uint8Array(18));

function getBishopMoves(sq: number, row: number, col: number) {
  const arr = bishopMoves[sq];
  let index = 0;

  for (const [dr, dc] of BISHOP_DELTAS) {
    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      arr[index++] = r * 8 + c;
      r += dr;
      c += dc;
    }
    arr[index++] = EMPTY_MOVE;
  }

  //The rest of the moves are invalid
  fillEmpty(arr, index);
}

//PAWNS
//We have 2 cause depending on light square or dark pawn moves up or down
const pawnMoves: Uint8Array[][] = [
  Array.from({ length: 64 }, () => new Uint8Array(2)),
  Array.from({ length: 64 }, () => new Uint8Array(2)),
];

function getPawnMoves(sq: number, row: number) {
  //White
  {
    const arr = pawnMoves[WHITE][sq];
    let i = 0;

    if (row < 7) {
      arr[i++] = sq + 8;
      if (row === 1) arr[i++] = sq + 16;
    }

    fillEmpty(arr, i);
  }

  //Black
  {
    const arr = pawnMoves[BLACK][sq];
    let i = 0;

    if (row > 0) {
      arr[i++] = sq - 8;
      if (row === 6) arr[i++] = sq - 16;
    }

    fillEmpty(arr, i);
  }
}

const pawnCaptures: Uint8Array[][] = [
  Array.from({ length: 64 }, () => new Uint8Array(2)),
  Array.from({ length: 64 }, () => new Uint8Array(2)),
];

function getPawnCaptures(sq: number, row: number, col: number) {
  //White
  {
    const arr = pawnCaptures[WHITE][sq];
    let i = 0;

    if (row < 7 && col > 0) arr[i++] = sq + 7;
    if (row < 7 && col < 7) arr[i++] = sq + 9;

    fillEmpty(arr, i);
  }

  //Black
  {
    const arr = pawnCaptures[BLACK][sq];
    let i = 0;

    if (row > 0 && col > 0) arr[i++] = sq - 9;
    if (row > 0 && col < 7) arr[i++] = sq - 7;

    fillEmpty(arr, i);
  }
}

for (let sq = 0; sq < 64; sq++) {
  const row = Math.floor(sq / 8);
  const col = sq % 8;

  getKingMoves(sq, row, col);
  getRookMoves(sq, row, col);
  getBishopMoves(sq, row, col);
  getPawnMoves(sq, row);
  getPawnCaptures(sq, row, col);
  getKnightMoves(sq, row, col);
}


const queenMoves: Uint8Array[] = Array.from(
  { length: 64 },
  (_, sq) => {
    const combined = [
      ...bishopMoves[sq],
      ...rookMoves[sq],
    ];

    return new Uint8Array(combined);
  }
);

export { knightMoves, queenMoves, rookMoves, pawnMoves, pawnCaptures, bishopMoves, kingMoves };