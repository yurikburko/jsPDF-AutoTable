const assert = require('assert')
const { ellipsize } = require('../src/common')
const { DocHandler } = require('../src/documentHandler')

describe('common', () => {
  let doc, jsPDF
  before(() => {
    jsPDF = require('./common').loadJspdf()
    doc = new DocHandler(new jsPDF())
  })

  it('ellipsize string', () => {
    const text = ['lorem ipsum']
    let str = ellipsize(text, 0, {}, doc,'...')[0]
    assert(str.length < 5, `Should be reduced in length`)
    assert(str.endsWith('...'), `Should end with ...`)

    str = ellipsize(text, 100, {}, doc, '...')[0]
    assert.equal(str.length, 11, `Should not be reduced`)
  })

  it('ellipsize string array', () => {
    const text = ['lorem ipsum', 'lorem ipsum ipsum']
    let str = ellipsize(text, 0, {}, doc, '...')
    assert(str[0].length < 5, `Should be reduced in length`)
    assert(str[1].length < 5, `Should be reduced in length`)
    assert(str[0].endsWith('...'), `Should end with ...`)
    assert(str[1].endsWith('...'), `Should end with ...`)

    str = ellipsize(text, 100, {}, doc, '...')
    assert.equal(str[0].length, 11, `Should not be reduced`)
    assert.equal(str[1].length, 17, `Should not be reduced`)
  })
})
