new Vue({
  el: '#vue',

  data: {
    moveHistory: [],
    moveFuture: [],
    boardInputString: 'r/grbr/rrwbkkb/gbbwwbz/bbwkwbz/bgggkr/wbrzrgw/kkwg/w', // invalid state!
    boardState: [],
    moveHistory: [
    ],
    moveFuture: [
      'e1d4',
      'e3d2',
      '^g d2d4', // the stack is not green and is linking through white, creating a stack with 2 blues. Probably should be green, since it links through green again later
      'b1c2',
      'e1d1', // we already moved e1 on the first move
      'f2d3',
      'g7g6',
      'f4e5',
      'g5h4',
      'd4g4', // when a 5-stack is created, need to stop rendering it on the board
      'e6f6',
      '^b e5d5',
      '^w g6f6',
      'c6c7',
      'h3f5',
      'c7b4',
      'c4c5',
      'd3c5',
      'a1b3',
      'c5d6',
      'f6e7',
      'b2c3',
      '^r c3h2',
      'f1g1',
      'g1g2',
      'h1f3',
      'c1d1',
      '-',
      'i1f3',
      '-',
      'h2e2',
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


  // record with A1 at the top
  // use / to break each row
  // (r)ed
  // (g)reen
  // (w)hite
  // (b)lue
  // blac(k)
  // wild(z)

  // moves are start and end
  // so e1d4 is move the piece at e1 to stack onto d4

  // picks at ^(color) and record before the move, so ^r is player picked red.

  created() {
    this.buildBoard();
    this.hydrateBoard();
  },

  methods: {
    buildBoard: function () {
      const matchedState = this.boardInputString.match(/([^/]+)/g); // ["r", "grbr", "rrwbkkb", "gbwwbz", "bbwkwbz", "bgggkr", "wbrzrgw", "kkwg", "w"]
      let output = []

      matchedState.forEach((stackString, i) => {
        let stack = []
        const y = Math.sin(1.0472) * 100 * (i+1) // 60 deg === 1.0472 rad
        
        stackString.split('').forEach((pieceLetter, j) => {
          offsets = [400, 250, 100, 150, 100, 150, 100, 250, 400]
          const x = 100 * (j) + offsets[i]

          stack.push([{
            y: y,
            x: x,
            colour: pieceLetter,
          }])
        })

        output.push(stack)
      })

      this.boardState = output;
      // TODO: cache this so we never have to do it again.
    },

    hydrateBoard: function () {
      this.moveHistory.forEach(move => {
        if (move.charAt(move.length-1) !== '-') {
          const fromRow = this.rowEnum[move.charAt(move.length-4)];
          const fromCol = parseInt(move.charAt(move.length-3));
          const toRow = this.rowEnum[move.charAt(move.length-2)];
          const toCol = parseInt(move.charAt(move.length-1));

          stack = this.boardState[fromRow-1][fromCol-1].slice(0)
          this.boardState[fromRow-1][fromCol-1] = []
          
          stack.forEach((piece) => {
            this.boardState[toRow-1][toCol-1].push(piece)
          })

          offsets = [400, 250, 100, 150, 100, 150, 100, 250, 400]
          this.boardState[toRow-1][toCol-1].forEach((piece, i) => {
            piece.x = 100 * (toCol-1) + offsets[toRow-1]
            piece.y = Math.sin(1.0472) * 100 * (toRow) - (7*i) // 60 deg === 1.0472 rad
          })
        }
      })
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
  },
})
