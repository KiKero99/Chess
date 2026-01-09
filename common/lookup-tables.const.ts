export const EMPTY_MOVE = 255;
export const WHITE = 0;
export const BLACK = 1;

//MAYBE DO ALL IN 1 ITERATION FOR THE MOMENT LEAVING SEPARATE AS IS EASIER

//KNIGHTS
const KNIGHT_DELTAS = [
    [-2,-1], [-2,1], [-1,-2], [-1,2],
    [1,-2], [1,2], [2,-1], [2,1]
];

const knightMoves: Uint8Array[] = Array.from({ length: 64 }, () => new Uint8Array(8));

for (let sq = 0; sq < 64; sq ++) {
    const row = Math.floor(sq / 8);
    const col = sq % 8;
    const moves = [];
    for (const [dr, dc] of KNIGHT_DELTAS) {
        const r = row + dr;
        const c = col + dc;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) moves.push(r * 8 + c)
    }

    const arr = knightMoves[sq];
    for (let i = 0; i < moves.length; i++) arr[i] = moves[i];

    //The rest of the moves are invalid
    for (let i = moves.length; i < arr.length; i++) arr[i] = EMPTY_MOVE;
}

const kingMoves: Uint8Array[] = Array.from({ length: 64 }, () => new Uint8Array([255]));
const queenMoves: Uint8Array[] = Array.from({ length: 64 }, () => new Uint8Array([255]));

//ROOKS
const ROOK_DELTAS = [
  [ 1,  0],
  [ 0,  1],
  [-1,  0],
  [ 0, -1],
];

const rookMoves: Uint8Array[] = Array.from({ length: 64 }, () => new Uint8Array(18));

for (let sq = 0; sq <64; sq++) {
  const row = Math.floor(sq / 8);
  const col = sq % 8;

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
  while (index < arr.length) {
    arr[index++] = EMPTY_MOVE;
  }
}

//BISHOPS
const BISHOP_DELTAS = [
  [ 1,  1],
  [ 1, -1],
  [-1,  1],
  [-1, -1],
];

const bishopMoves: Uint8Array[] = Array.from({ length: 64 }, () => new Uint8Array(18));

for (let sq = 0; sq < 64; sq++) {
  const row = Math.floor(sq / 8);
  const col = sq % 8;

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
  while (index < arr.length) {
    arr[index++] = EMPTY_MOVE;
  }
}

//PAWNS
//We have 2 cause depending on light square or dark pawn moves up or down
const pawnMoves: Uint8Array[][] = [
  Array.from({ length: 64 }, () => new Uint8Array(2)),
  Array.from({ length: 64 }, () => new Uint8Array(2)),
];

for (let sq = 0; sq < 64; sq++) {
  const row = Math.floor(sq / 8);

  //White
  {
    const arr = pawnMoves[WHITE][sq];
    let i = 0;

    if (row < 7) {
      arr[i++] = sq + 8;
      if (row === 1) arr[i++] = sq + 16;
    }

    while (i < arr.length) arr[i++] = EMPTY_MOVE;
  }

  //Black
  {
    const arr = pawnMoves[BLACK][sq];
    let i = 0;

    if (row > 0) {
      arr[i++] = sq - 8;
      if (row === 6) arr[i++] = sq - 16;
    }

    while (i < arr.length) arr[i++] = EMPTY_MOVE;
  }
}

const pawnCaptures: Uint8Array[][] = [
  Array.from({ length: 64 }, () => new Uint8Array(2)),
  Array.from({ length: 64 }, () => new Uint8Array(2)),
];

for (let sq = 0; sq < 64; sq++) {
  const row = Math.floor(sq / 8);
  const col = sq % 8;

  //White
  {
    const arr = pawnCaptures[WHITE][sq];
    let i = 0;

    if (row < 7 && col > 0) arr[i++] = sq + 7;
    if (row < 7 && col < 7) arr[i++] = sq + 9;

    while (i < arr.length) arr[i++] = EMPTY_MOVE;
  }

  //Black
  {
    const arr = pawnCaptures[BLACK][sq];
    let i = 0;

    if (row > 0 && col > 0) arr[i++] = sq - 9;
    if (row > 0 && col < 7) arr[i++] = sq - 7;

    while (i < arr.length) arr[i++] = EMPTY_MOVE;
  }
}

export { knightMoves, queenMoves, rookMoves, pawnMoves, pawnCaptures, bishopMoves, kingMoves };