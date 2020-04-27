const pieceDisplayPosition = require('../src/scripts/deps').pieceDisplayPosition
const { describe, it } = require('mocha')
const assert = require('assert')

describe('pieceDisplayPosition()', function() {
  it('Single piece at A1', function() {
    const result = pieceDisplayPosition('a1', 1)

    assert.equal( result.x, 400 )
    assert.equal( result.y, 86.6 )
  })

  it('Two stack at A1', function() {
    const result = pieceDisplayPosition('a1', 2)

    assert.equal( result.x, 400 )
    assert.equal( result.y, 78.6 )
  })
})
