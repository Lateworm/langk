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

    // WIP - experimenting with clickable board
    lastClickedPosition: '',
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

    clickPiece: function (position) {
      this.lastClickedPosition = position
    }
  },
})
