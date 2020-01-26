const pieceDisplayPosition = (position, height) => {
  const [row, col] = [position[0], position[1]]
  const rows = {a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9}
  const rowXOffsets = [400, 250, 100, 150, 100, 150, 100, 250, 400]
  const heightOffset = 8

  return {
    x: rowXOffsets[rows[row] - 1] + ((col-1) * 100),
    y: Math.sin(1.0472) * rows[row] * 100 - (heightOffset * (height - 1)),
  }
}

new Vue({
  el: '#vue',

  data: {
    moveHistory: [],
    moveFuture: [],
    showInput: false,
    boardInput: 'g/rrbr/wgzbwkg/kgkgkr/gwwbrww/bzrzkg/kwbwbbg/rkrk/b',
    boardState: [],
    firstMover: 'Alf',
    secondMover: 'Betty',
    moveInput:
`e3d2
b1c2
e1d1
g7g6
g5h4
e6f6
^b e5d5
c6c7
-
h3f5`,
    moveHistory: [
    ],
    moveFuture: [
    ],
    rowEnum: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
    }
  },

  created() {
    // try to restore previous work from localStorage
    localBoardInput = localStorage.getItem('boardInput');
    localMoveInput = localStorage.getItem('moveInput');
    localFirstMover = localStorage.getItem('firstMover');
    localSecondMover = localStorage.getItem('secondMover');

    if (localBoardInput || localMoveInput) {
      this.boardInput = localStorage.getItem('boardInput');
      this.moveInput = localStorage.getItem('moveInput');
      this.firstMover = localStorage.getItem('firstMover');
      this.secondMover = localStorage.getItem('secondMover');
    }

    this.buildBoard();
    this.buildHistory();
    this.hydrateBoard();
  },

  methods: {
    buildBoard: function () {
      // Get an array represent the rows like ["r", "grbr", "rrwbkkb", "gbwwbz", "bbwkwbz", ...
      const rows = this.boardInput.match(/([^/]+)/g);
      let output = []

      rows.forEach((row, i) => {
        const rowLetter = 'abcdefghi'[i]
        let stack = []
        
        row.split('').forEach((pieceLetter, j) => {
          const position = `${rowLetter}${j+1}`
          
          // Get the x,y coords for the SVG,
          // Pass hardcoded 1 because at this point all stack are 1 piece tall
          const {x, y} = pieceDisplayPosition(position, 1)

          stack.push([{
            position: position,
            colour: pieceLetter,
            y: y,
            x: x,
          }])
        })

        output.push(stack)
      })

      this.boardState = output;
      // TODO: cache this so we don't have to redo it every time move history gets updated.
    },

    buildHistory: function () {
      // parse the input string into a usable structure
      this.moveHistory = this.moveInput.match(/([^\r\n]+)/g) || [];
      this.moveFuture = [];
    },

    buildFuture: function () {
      // parse the input string into a usable structure
      this.moveFuture = this.moveInput.match(/([^\r\n]+)/g) || [];
      this.moveHistory = [];
    },

    hydrateBoard: function () {
      // hydrate the board by playing through the resulting history
      this.moveHistory.forEach(move => {
        if (move.charAt(move.length-1) !== '-') {
          const fromRow = this.rowEnum[move.charAt(move.length-4)];
          const fromCol = parseInt(move.charAt(move.length-3));
          const toRowLetter = move.charAt(move.length-2)
          const toRowNumber = this.rowEnum[move.charAt(move.length-2)];
          const toCol = parseInt(move.charAt(move.length-1));
          const toPosition = `${toRowLetter}${toCol}`

          stackBeingMoved = this.boardState[fromRow-1][fromCol-1].slice(0)
          this.boardState[fromRow-1][fromCol-1] = []
          
          stackBeingMoved.forEach((piece) => {
            // Update the piece's position
            piece.position = toPosition

            this.boardState[toRowNumber-1][toCol-1].push(piece)
          })

          // remove stacks of 5 from the board
          if(this.boardState[toRowNumber-1][toCol-1].length === 5) {
            this.boardState[toRowNumber-1][toCol-1] = []
          }

          this.boardState[toRowNumber-1][toCol-1].forEach((piece, i) => {
            // Get the display coordinates
            const {x, y} = pieceDisplayPosition(piece.position, i+1)
            piece.x = x
            piece.y = y
          })
        }
      })
    },

    updateBoardInput: function () {
      // save work into localStorage
      localStorage.setItem('boardInput', this.boardInput);
      localStorage.setItem('firstMover', this.firstMover);
      localStorage.setItem('secondMover', this.secondMover);

      this.buildBoard();
      this.hydrateBoard();
    },

    updateMoveInput: function () {
      // save work into localStorage
      localStorage.setItem('moveInput', this.moveInput);
      localStorage.setItem('firstMover', this.firstMover);
      localStorage.setItem('secondMover', this.secondMover);

      this.buildBoard();
      this.buildHistory();
      this.hydrateBoard();
    },

    stepBack: function () {
      this.moveFuture.unshift(this.moveHistory.pop());
      this.buildBoard();
      this.hydrateBoard();
    },

    stepForward: function () {
      this.moveHistory.push(this.moveFuture.shift());
      this.buildBoard();
      this.hydrateBoard();
    },

    goToStart: function () {
      this.buildBoard();
      this.buildFuture()
      this.hydrateBoard();
    },

    goToEnd: function () {
      this.buildBoard();
      this.buildHistory();
      this.hydrateBoard();
    },
  },
})
