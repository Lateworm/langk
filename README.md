# LaNGK

A tool for viewing a game of LYNGK.

# Entering Data

## Entering the inital board state

Each colour of piece is represented by a single letter as follows:
- `r`ed
- `g`reen
- `b`lue
- `w`hite
- blac`k`
- wild`z`

Record the board state starting with a1. Each row is separated by a `/`, such that a complete starting board may look like:
`g/rrbr/wgzbwkg/kgkgkr/gwwbrww/bzrzkg/kwbwbbg/rkrk/b`

## Entering Moves

A typical move is simply a 4-character string, where the first two characters represent the location of the stack to be played, and the last two represent its destination.

For example, a valid move might look like `f3d4`.

To Record a player's colour pick, prefix it using a carat and the colour letters above like `^(colour)`. For example, to indicate the white was picked along with a move: `^w g6f6`.

Indicate a pass with `-`

Enter each move on a new line. A series of a few moves might look like:
```
d4g4
e6f6
^b e5d5
^w g6f6
-
h3f5
```
