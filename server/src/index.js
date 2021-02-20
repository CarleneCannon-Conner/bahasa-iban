const { PrismaClient } = require('@prisma/client')
const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const { getUserId } = require('./utils')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Abbreviation = require('./resolvers/Abbreviation')
const Description = require('./resolvers/Description')
const Language = require('./resolvers/Language')
const Origin = require('./resolvers/Origin')
const Pronunciation = require('./resolvers/Pronunciation')
const User = require('./resolvers/User')
const Word = require('./resolvers/Word')

const resolvers = {
  Query,
  Mutation,
  Abbreviation,
  Description,
  Language,
  Origin,
  Pronunciation,
  User,
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
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    }
  }
})

server.listen()
  .then(({ url }) =>
  console.log(`Server is running on ${url}`)
  )