import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import { ApolloLink } from 'apollo-client-preset'

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('authToken')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

ReactDOM.render(
  <BrowserRouter>
      <ApolloProvider client={client}>
          <App/>
      </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)
