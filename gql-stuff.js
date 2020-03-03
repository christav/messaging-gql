// use strict
const R = require('ramda')
const { books, byAuthor, byTitle } = require('./bookData')

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
      books: () => books,
      booksByAuthor: (parent, args, context, info) => {
        return byAuthor(args.author)
      },
      bookByTitle: (parent, args, context, info) => {
        const matchingTitles = byTitle(args.title)
        if (matchingTitles.length === 0) {
          return null
        }
        return matchingTitles[0]
      },
      authors: () => R.uniq(R.map(R.path(['author']), books))
    }
  }

  return {
    typeDefs,
    resolvers
  }

}

module.exports = gqlStuff
