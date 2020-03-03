// use strict
const R = require('ramda')
const { books, byAuthor, byTitle } = require('./bookData')

// Helper function to send resolve message based on the type to
// resolve
const typeResolver = fieldToResolve => (parent, args, context, info) => new Promise((resolve, reject) => {
  context.mesh.act({
    cmd: 'resolve',
    type: fieldToResolve,
    args
  },
  (err, result) => {
    if (err) { return reject(err) }
    resolve(result)
  })
})

const gqlStuff = gql => {
  const typeDefs = gql`
    type Book {
      title: String
      author: String
    }

    type Query {
      books: [Book]
      booksByAuthor(author: String!): [Book!]!
      bookByTitle(title: String!): Book
      authors: [String!]!
    }
  `

  const resolvers = {
    Query: {
      books: typeResolver('Query.books'),
      booksByAuthor: typeResolver('Query.booksByAuthor'),
      bookByTitle: typeResolver('Query.bookByTitle'),
      authors: typeResolver('Query.authors')
    }
  }

  return {
    typeDefs,
    resolvers
  }

}

module.exports = gqlStuff
