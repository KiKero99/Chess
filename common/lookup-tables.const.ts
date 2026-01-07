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
    for (let i = moves.length; i < arr.length; i++) arr[i] = 255;
}

export { knightMoves };