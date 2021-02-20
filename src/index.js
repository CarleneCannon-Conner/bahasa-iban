import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import { ApolloLink } from 'apollo-client-preset'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })
/*
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(process.env.AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})
*/

// const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const client = new ApolloClient({
  // link: httpLinkWithAuthToken,
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter>
      <ApolloProvider client={client}>
          <App/>
      </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)
