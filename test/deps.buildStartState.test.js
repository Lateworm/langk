const buildStartState = require('../src/scripts/deps').buildStartState
const { describe, it } = require('mocha')
const assert = require('assert')

describe('buildStartState()', function() {
  it('Valid string', function() {
    const result = buildStartState('g/wgbg/rwrkgbb/wbrkbk/zwbrgwz/kgzwbw/bwkrrkr/gkrk/g')

    // For now I'll just assert against things that don't rely on dependencies
    // Can't test much more than this until i add a mock/substitute package
    assert.equal(Object.keys(result).length, 43)
  })
})