const validateMove = require('../src/scripts/deps').validateMove
const { describe, it } = require('mocha')
const assert = require('assert')

describe('validateMove()', function() {
  it('Valid move', function() {
    const boardState = {
      b1: [{ colour: 'r' }],
      b2: [{ colour: 'g' }],
    }
    const picks = []
    const pick = null
    const origin = 'b1'
    const destination = 'b2'

    const result = validateMove({
      boardState,
      picks,
      pick,
      origin,
      destination,
    })

    assert.equal( result, null )
  })

  describe('Invalid move', function() {
    it("Moving a wild", function() {
      const boardState = {
        b1: [{ colour: 'z' }],
        b2: [{ colour: 'g' }],
      }
      const picks = []
      const pick = null
      const origin = 'b1'
      const destination = 'b2'

      const result = validateMove({
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
      const picks = []
      const pick = null
      const origin = 'b1'
      const destination = 'b2'

      const result = validateMove({
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
