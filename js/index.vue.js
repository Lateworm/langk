//  -----------------------------
//  -- RANDOM BOARD GENERATION --
//  -----------------------------
// Random generation is courtesy of https://github.com/tanglebones

function randomCtor(seed) {
  let current;

  function* generator(n) {
    current = current * 16807 % 2147483647;

    const additionalSteps = (current & 0xF);
    for(let i = 0; i <= additionalSteps; ++i) {
      current = current * 16807 % 2147483647;
    }

    const r = (current - 1) / 2147483646;
    yield Math.floor(r * n); // 0 to n-1
  }

  function init(seed) {
    current = seed % 2147483647;
    if (current <= 0) {
      current += 2147483646;
    }
    const g = generator(1);
    for (let i = 0; i < 128; ++i) { g.next(); }
  }

  init(seed);


  generator.reseed = function (seed) {
    init(seed);
  };

  return generator;
}

function shuffleCtor(random) {
  return function shuffle(arr) {
    for (let i = arr.length; i > 0; --i) {
      const p = i - 1;
      const j = random(i).next().value; // 0 to i-1
      if (j === p) {
        continue;
      }
      const t = arr[j];
      arr[j] = arr[p];
      arr[p] = t;
    }
    return arr;
  }
}

function randomBoardCtor(shuffle) {
  return function randomBoard() {
    const s = shuffle("bbbbbbbbggggggggkkkkkkkkrrrrrrrrwwwwwwwwzzz".split(''));
    for (const i of [42, 38, 31, 25, 18, 12, 5, 1]) {
      s.splice(i, 0, '/');
    }
    return s.join('');
  }
}

function stringToSeed(s) {
  return s.split('').map(x => x.charCodeAt(0)).reduce((a, b) => (a * 16807 + b) % 2147483647, 1234567890);
}

function determineSeed(seedString) {
  let seed = Math.trunc(Math.random() * 2147483647);

  if (seedString) {
    if ("" + +seedString === seedString) {
      seed = +seedString;
      console.log(`Using numeric seed: ${seed}`);
    } else {
      seed = stringToSeed(seedString);
      console.log(`Using seed: ${seed} (from: "${seedString}")`);
    }
  } else {
    console.log(`Using random seed: ${seed}`);
  }
  return seed;
}

// hard-coded seed for inital implementation
// TODO: get a seed from Vue
let seed = determineSeed('langk');

const random = randomCtor(seed);
const shuffle = shuffleCtor(random);
const boardGenerator = randomBoardCtor(shuffle);


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
    // User inputs backed by localStorage
    input: {
      boardInput: '', // will be populated from random generator
      moveInput:
`e3d3
^k c4d3
^g f2d3
^w g2d3`,
      p1: 'Alf',
      p2: 'Betty',
      colorScheme: 'rioGrande',
    },
    
    // Game state created by hydrateBoard()
    gameState: {
      boardPlayState: {},
      p1Picks: [],
      p2Picks: [],
      p1Stacks: [],
      p2Stacks: [],
    },

    // stragglers
    showInput: false,
    boardStartState: {},
    moveHistory: [],
    moveFuture: [],
  },

  created() {
    // Restore previous work from localStorage, if any 
    const localInput = JSON.parse(localStorage.getItem('input'))
    if (localInput) { this.input = localInput }

    this.input.boardInput = boardGenerator();

    this.boardStartState = buildStartState(this.input.boardInput)
    this.buildHistory();

    this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
  },

  methods: {
    buildHistory: function () {
      // parse the input string into a usable structure
      this.moveHistory = this.input.moveInput.match(/([^\r\n]+)/g) || [];
      this.moveFuture = [];
    },

    buildFuture: function () {
      // parse the input string into a usable structure
      this.moveFuture = this.input.moveInput.match(/([^\r\n]+)/g) || [];
      this.moveHistory = [];
    },

    updateInputs: function () {
      // save work into localStorage and update state to reflect the new input
      localStorage.setItem('input', JSON.stringify(this.input));

      this.boardStartState = buildStartState(this.input.boardInput)
      this.buildHistory();
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
    },

    stepBack: function () {
      this.moveFuture.unshift(this.moveHistory.pop());
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory); 
    },

    stepForward: function () {
      this.moveHistory.push(this.moveFuture.shift());
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
    },

    goToStart: function () {
      this.buildFuture()
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
    },

    goToEnd: function () {
      this.buildHistory();     
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
    },

    generateRandomBoard: function () {
      seed = determineSeed(undefined);
      this.input.boardInput = boardGenerator();
      this.input.moveInput = '';
      this.updateInputs();
    },
  },
})
