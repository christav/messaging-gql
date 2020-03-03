// use strict

const { ApolloServer, gql } = require('apollo-server-fastify')
const mesh = require('./mesh')()
const { typeDefs, resolvers } = require('./gql-stuff')(gql)
const fastify = require('fastify')({ logger: true })

fastify.get('/', async (req, res) => {
  return { hello: 'world' }  
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: () => ({
    mesh
  })
})

const start = async () => {
  try {
    fastify.register(server.createHandler())
    await fastify.listen(3000)
    fastify.log.info('server listening on ${fastify.server.address().port}')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

