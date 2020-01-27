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

const emptyBoard = {
  // each spot on the board is assigned an empty array of pieces
  a1: [],
  b1: [], b2: [], b3: [], b4: [],
  c1: [], c2: [], c3: [], c4: [], c5: [], c6: [], c7: [],
  d1: [], d2: [], d3: [], d4: [], d5: [], d6: [],
  e1: [], e2: [], e3: [], e4: [], e5: [], e6: [], e7: [],
  f1: [], f2: [], f3: [], f4: [], f5: [], f6: [],
  g1: [], g2: [], g3: [], g4: [], g5: [], g6: [], g7: [],
  h1: [], h2: [], h3: [], h4: [],
  i1: [],
}

const buildStartState = (boardInput) => {
  // Create an array of the rows like ["r", "grbr", "rrwbkkb", "gbwwbz", "bbwkwbz", ...
  const rowStrings = boardInput.match(/([^/]+)/g);
  let state = JSON.parse(JSON.stringify(emptyBoard))

  rowStrings.forEach((rowString, i) => {
    const row = 'abcdefghi'[i]
    
    rowString.split('').forEach((colour, columnIndex) => {
      const position = `${row}${columnIndex + 1}`
      const {x, y} = pieceDisplayPosition(position, 1)
      state[position].push({ colour: colour, x: x, y: y })
    })
  })

  return state
}

const hydrateBoard = (boardState, moves) => {
  moves.forEach(move => {
    if (move !== '-') {
      const origin = move.substring(move.length-4, move.length-2)
      const destination = move.substring(move.length-2, move.length)

      // push the pieces onto the destination stack
      boardState[origin].forEach(piece => {
        boardState[destination].push(piece)
      })

      // clear the source stack
      boardState[origin] = []
      
      // Remove stacks of 5 from the board
      if (boardState[destination].length > 4) {
        boardState[destination] = []
      }

      // update display coordinates
      boardState[destination].forEach((piece, i) => {
        const {x, y} = pieceDisplayPosition(destination, i+1)
        piece.x = x
        piece.y = y
      })
    }
  })

  return boardState
}

//  ---------
//  -- VUE --
//  ---------

const langk = new Vue({
  el: '#vue',

  data: {
    moveHistory: [],
    moveFuture: [],
    showInput: false,
    boardInput: 'g/rrbr/wgzbwkg/kgkgkr/gwwbrww/bzrzkg/kwbwbbg/rkrk/b',
    boardStartState: {},
    boardPlayState: {},
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

    this.boardStartState = buildStartState(this.boardInput)
    this.buildHistory();

    this.boardPlayState = hydrateBoard(
      JSON.parse(JSON.stringify(this.boardStartState)),
      this.moveHistory
    );
  },

  methods: {
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

    updateBoardInput: function () {
      // save work into localStorage
      localStorage.setItem('boardInput', this.boardInput);
      localStorage.setItem('firstMover', this.firstMover);
      localStorage.setItem('secondMover', this.secondMover);

      this.boardPlayState = hydrateBoard(
        JSON.parse(JSON.stringify(this.boardStartState)),
        this.moveHistory
      );
    },

    updateMoveInput: function () {
      // save work into localStorage
      localStorage.setItem('moveInput', this.moveInput);
      localStorage.setItem('firstMover', this.firstMover);
      localStorage.setItem('secondMover', this.secondMover);

      this.buildHistory();
      this.boardPlayState = hydrateBoard(
        JSON.parse(JSON.stringify(this.boardStartState)),
        this.moveHistory
      );
    },

    stepBack: function () {
      this.moveFuture.unshift(this.moveHistory.pop());
      this.boardPlayState = hydrateBoard(
        JSON.parse(JSON.stringify(this.boardStartState)),
        this.moveHistory
      );
    },

    stepForward: function () {
      this.moveHistory.push(this.moveFuture.shift());
      this.boardPlayState = hydrateBoard(
        JSON.parse(JSON.stringify(this.boardStartState)),
        this.moveHistory
      );
    },

    goToStart: function () {
      this.buildFuture()
      this.boardPlayState = JSON.parse(JSON.stringify(this.boardStartState))
    },

    goToEnd: function () {
      this.buildHistory();
      this.boardPlayState = hydrateBoard(
        JSON.parse(JSON.stringify(this.boardStartState)),
        this.moveHistory
      );
    },
  },
})
