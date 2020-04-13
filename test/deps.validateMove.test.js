const validateMove = require('../js/deps').validateMove
const assert = require('assert')

describe('deps.validateMove()', function() {
  it('Valid move', function() {
    const boardState = {
      b1: [{ colour: 'r' }],
      b2: [{ colour: 'g' }],
    }
    picks = []
    pick = null
    origin = 'b1'
    destination = 'b2'

    result = validateMove({
      boardState,
      picks,
      pick,
      origin,
      destination,
    })

    assert.equal( result, null )
  })

  context('Invalid move', function() {
    it("Moving a wild", function() {
      const boardState = {
        b1: [{ colour: 'z' }],
        b2: [{ colour: 'g' }],
      }
      picks = []
      pick = null
      origin = 'b1'
      destination = 'b2'

      result = validateMove({
        boardState,
        picks,
        pick,
        origin,
        destination,
      })

      assert.equal( result, 'Invalid move b1b2: the player may not move a wild' )
    })
    
    it("Making an overheight stack", function() {
      const boardState = {
        b1: [{ colour: 'r' }, { colour: 'g' }, { colour: 'b' }],
        b2: [{ colour: 'w' }, { colour: 'k' }, { colour: 'z' }],
      }
      picks = []
      pick = null
      origin = 'b1'
      destination = 'b2'

      result = validateMove({
        boardState,
        picks,
        pick,
        origin,
        destination,
      })

      assert.equal( result, 'Invalid move b1b2: The resulting stack would be 6 pieces tall' )
    })
  })
})
