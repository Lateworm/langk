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
  let boardPlayState = JSON.parse(JSON.stringify(boardState))
  let p1Picks = []
  let p2Picks = []
  let p1Stacks = []
  let p2Stacks = []

  moves.forEach((move, i) => {
    if (move !== '-') {
      const origin = move.substring(move.length-4, move.length-2)
      const destination = move.substring(move.length-2, move.length)
      const pick = move.substring(move.length-6, move.length-5)

      if (pick.length && i % 2 === 0) {
        p1Picks.push(pick)
      } else if (pick.length && i % 2 === 1) {
        p2Picks.push(pick)
      }

      // push the pieces onto the destination stack
      boardPlayState[origin].forEach(piece => {
        boardPlayState[destination].push(piece)
      })

      // clear the source stack
      boardPlayState[origin] = []
      
      // Remove stacks of 5 from the board
      if (boardPlayState[destination].length > 4) {
        
        if (i % 2 === 0) {
          p1Stacks.push(boardPlayState[destination].reduce((acc, cur) => {
            return acc + cur.colour
          }, ''))
        } else if (i % 2 === 1) {
          p2Stacks.push(boardPlayState[destination].reduce((acc, cur) => {
            return acc + cur.colour
          }, ''))
        }
        
        boardPlayState[destination] = []
      }

      // update display coordinates
      boardPlayState[destination].forEach((piece, i) => {
        const {x, y} = pieceDisplayPosition(destination, i+1)
        piece.x = x
        piece.y = y
      })
    }
  })

  return {
    boardPlayState: boardPlayState,
    p1Picks: p1Picks,
    p2Picks: p2Picks,
    p1Stacks: p1Stacks,
    p2Stacks: p2Stacks,
  }
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
    p1: 'Alf',
    p2: 'Betty',
    p1Picks: [],
    p2Picks: [],
    p1Stacks: [],
    p2Stacks: [],
    moveInput:
`e3d2
b1c2
e1d1
g7g6
g5h4
^g e6f6
^b e5d5
c6c7
-
h3f5`,
    moveHistory: [
    ],
    moveFuture: [
    ],

    // experimental color schemeing
    colorScheme: 'rioGrande'

  },

  created() {
    // Restore previous work from localStorage, if any 
    this.boardInput = localStorage.getItem('boardInput') || this.boardInput;
    this.moveInput = localStorage.getItem('moveInput') || this.moveInput;
    this.p1 = localStorage.getItem('p1') || this.p1;
    this.p2 = localStorage.getItem('p2') || this.p2;
    this.colorScheme = localStorage.getItem('colorScheme') || this.colorScheme;

    this.boardStartState = buildStartState(this.boardInput)
    this.buildHistory();

    const gameState = hydrateBoard(this.boardStartState, this.moveHistory);
    this.boardPlayState = gameState.boardPlayState
    this.p1Picks = gameState.p1Picks
    this.p2Picks = gameState.p2Picks
    this.p1Stacks = gameState.p1Stacks
    this.p2Stacks = gameState.p2Stacks
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

    updateInputs: function () {
      // save work into localStorage
      localStorage.setItem('boardInput', this.boardInput);
      localStorage.setItem('moveInput', this.moveInput);
      localStorage.setItem('p1', this.p1);
      localStorage.setItem('p2', this.p2);
      localStorage.setItem('colorScheme', this.colorScheme);

      this.boardStartState = buildStartState(this.boardInput)
      this.buildHistory();

      const gameState = hydrateBoard(this.boardStartState, this.moveHistory);
      this.boardPlayState = gameState.boardPlayState
      this.p1Picks = gameState.p1Picks
      this.p2Picks = gameState.p2Picks
      this.p1Stacks = gameState.p1Stacks
      this.p2Stacks = gameState.p2Stacks
    },

    stepBack: function () {
      this.moveFuture.unshift(this.moveHistory.pop());

      const gameState = hydrateBoard(this.boardStartState, this.moveHistory);
      this.boardPlayState = gameState.boardPlayState
      this.p1Picks = gameState.p1Picks
      this.p2Picks = gameState.p2Picks
      this.p1Stacks = gameState.p1Stacks
      this.p2Stacks = gameState.p2Stacks
    },

    stepForward: function () {
      this.moveHistory.push(this.moveFuture.shift());

      const gameState = hydrateBoard(this.boardStartState, this.moveHistory);
      this.boardPlayState = gameState.boardPlayState
      this.p1Picks = gameState.p1Picks
      this.p2Picks = gameState.p2Picks
      this.p1Stacks = gameState.p1Stacks
      this.p2Stacks = gameState.p2Stacks
    },

    goToStart: function () {
      this.buildFuture()

      const gameState = hydrateBoard(this.boardStartState, this.moveHistory);
      this.boardPlayState = gameState.boardPlayState
      this.p1Picks = gameState.p1Picks
      this.p2Picks = gameState.p2Picks
      this.p1Stacks = gameState.p1Stacks
      this.p2Stacks = gameState.p2Stacks   
    },

    goToEnd: function () {
      this.buildHistory();
      
      const gameState = hydrateBoard(this.boardStartState, this.moveHistory);
      this.boardPlayState = gameState.boardPlayState
      this.p1Picks = gameState.p1Picks
      this.p2Picks = gameState.p2Picks
      this.p1Stacks = gameState.p1Stacks
      this.p2Stacks = gameState.p2Stacks
    },
  },
})
