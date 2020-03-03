// use strict

const R = require('ramda')
const seneca = require('seneca')
const bookData = require('./bookData')

const init = () => {
  const mesh = seneca()

  mesh.add('cmd:resolve,type:Query.books', (msg, reply) => {
    reply(null, bookData.books)
  })

  mesh.add('cmd:resolve,type:Query.booksByAuthor', (msg, reply) => {
    reply(null, bookData.byAuthor(msg.args.author))
  })

  mesh.add('cmd:resolve,type:Query.bookByTitle', (msg, reply) => {
    const titles = bookData.byTitle(msg.args.title)
    if (titles.length === 0) {
      reply(null, null)
    } else {
      reply(null, titles[0])
    }
  })

  mesh.add('cmd:resolve,type:Query.authors', (msg, reply) => {
    const results = R.pipe(
      R.map(R.prop('author')),
      R.uniq
    )(bookData.books)
    reply(null, results)
  })
  return mesh
}

module.exports = init
