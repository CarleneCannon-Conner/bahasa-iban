const { PrismaClient } = require('@prisma/client')
const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Description = require('./resolvers/Description')
const Pronunciation = require('./resolvers/Pronunciation')
const Word = require('./resolvers/Word')

const resolvers = {
  Query,
  Mutation,
  Description,
  Pronunciation,
  Word,
}

const prisma = new PrismaClient()

/* Serve bundled schema and resolvers */
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
    }
  }
})

server.listen()
  .then(({ url }) =>
  console.log(`Server is running on ${url}`)
  )