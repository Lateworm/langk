const pieceDisplayPosition = (position, height) => {
  const [row, col] = [position[0], position[1]]
  const rows = {a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9}
  const rowXOffsets = [400, 250, 100, 150, 100, 150, 100, 250, 400]
  const heightOffset = 8

  const x = rowXOffsets[rows[row] - 1] + ((col-1) * 100)
  // 0,0 is top left, so to move a piece up we reduce its y value
  const y = Math.sin(1.0472) * rows[row] * 100 - (heightOffset * (height - 1))

  return {
    x: x,
    y: Math.round(y * 10) / 10,
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

const validateMove = (moveContext) => {
  const { boardState, picks, pick, origin, destination } = moveContext

  const boardPlayState = JSON.parse(JSON.stringify(boardState))
  const originStack = boardPlayState[origin]
  const originHeight = boardPlayState[origin].length
  const originTopColour = boardPlayState[origin][originHeight - 1].colour
  const destinationStack = boardPlayState[destination]
  // const destinationHeight = boardPlayState[destination].length
  const resultStack = [...destinationStack, ...originStack]
  
  const resultStackColours = []

  // simplest checks first so we can return as early as possible
  if (originTopColour === 'z') {
    return `Invalid move ${origin}${destination}: the player may not move a wild`
  }

  if (resultStack.length > 5) {
    return `Invalid move ${origin}${destination}: The resulting stack would be ${resultStack.length} pieces tall`
  }

  // attribute picks
  if (pick) {
    if (picks.includes(pick)) {
      return `Invalid colour pick ${pick}: the player has already picked this colour`
    } else if (picks.length >= 2) {
      return `Invalid colour pick ${pick}: the player may not pick more than 2 colours`  
    }
  }

  for (let i = 0; i < resultStack.length; i++) {
    if (resultStackColours.includes(resultStack[i].colour)) {
      return `Invalid move ${origin}${destination}: The resulting stack would contain duplicate colours`
    } else {
      resultStackColours.push(resultStack[i].colour)
    }
  }

  // the top colour of the origin must not be owned by the opponent
  // the destination must be accessible from the origin
    // so straight line,
    // or else linkable though picked colour
  // The stack must be equal or greater height than the destination
    // Or else the top colour from the origin stack must be owned by the mover

  return null

  // TODO: duplicate alerts are caused by the input being updated twice:
  // first when the user presses enter, and again when they leave the field.
  // instead of using alerts, we shoudl render an error on the page
}

const hydrateBoard = (boardState, moves) => {
  let boardPlayState = JSON.parse(JSON.stringify(boardState))
  let p1Picks = []
  let p2Picks = []
  let p1Stacks = []
  let p2Stacks = []
  
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]

    if (move !== '-') {
      const player = i % 2 === 0 ? 1 : 2
      const origin = move.substring(move.length-4, move.length-2)
      const destination = move.substring(move.length-2, move.length)
      const pick = move.substring(move.length-6, move.length-5)
      let error = null

      if (player === 1) {
        error = validateMove({
          boardState: boardPlayState,
          picks: p1Picks, 
          pick,
          origin,
          destination,
        })
      } else if (player === 2) {
        error = validateMove({
          boardState: boardPlayState,
          picks: p2Picks, 
          pick,
          origin,
          destination,
        })
      }

      if (error) {
        alert(error)
        break
      }

      if (pick && player === 1) {
        p1Picks.push(pick)
      } else if (pick && player === 2) {
        p2Picks.push(pick)
      }

      // push the pieces onto the destination stack
      boardPlayState[origin].forEach(piece => {
        boardPlayState[destination].push(piece)
      })

      // clear the source stack
      boardPlayState[origin] = []

      // Remove newly-formed stacks of 5 from the board
      if (boardPlayState[destination].length > 4) {
        const stackColour = boardPlayState[destination][boardPlayState[destination].length-1].colour 

        if (i % 2 === 0 && p1Picks.includes(stackColour)) {
          p1Stacks.push(boardPlayState[destination].reduce((acc, cur) => {
            return acc + cur.colour
          }, ''))

          boardPlayState[destination] = []
        } else if (i % 2 === 1 && p2Picks.includes(stackColour)) {
          p2Stacks.push(boardPlayState[destination].reduce((acc, cur) => {
            return acc + cur.colour
          }, ''))

          boardPlayState[destination] = []
        }
      }

      // update display coordinates
      boardPlayState[destination].forEach((piece, i) => {
        const {x, y} = pieceDisplayPosition(destination, i+1)
        piece.x = x
        piece.y = y
      })
    }
  }

  return {
    boardPlayState: boardPlayState,
    p1Picks: p1Picks,
    p2Picks: p2Picks,
    p1Stacks: p1Stacks,
    p2Stacks: p2Stacks,
  }
}

module.exports = {
  pieceDisplayPosition: pieceDisplayPosition,
  buildStartState: buildStartState,
  validateMove: validateMove,
  hydrateBoard: hydrateBoard,
}