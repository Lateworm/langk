const deps = require('../js/deps')
const assert = require('assert')

describe('deps.pieceDisplayPosition()', function() {
  context('Single piece at A1', function() {
    it('Should return the x, y coordinates', function() {
      result = deps.pieceDisplayPosition('a1', 1)

      assert.equal( result.x, 400 )
      assert.equal( result.y, 86.6 )
    })
  })
})
