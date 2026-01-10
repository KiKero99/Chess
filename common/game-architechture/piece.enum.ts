export const enum Piece{
    Pawn   = 1,
    Knight = 2,
    Bishop = 3,
    Rook   = 4,
    Queen  = 5,
    King   = 6,

    White  = 0 << 3,
    Black  = 1 << 3,

    Empty = 0,
}