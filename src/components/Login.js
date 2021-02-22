import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: '',
  }

  render() {
    return (
      <div>
        <h4>{this.state.login ? 'Login' : 'Sign Up'}</h4>
        <div>
          {!this.state.login && (
            <input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type='text'
              placeholder='Your name'
            />
          )}
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            placeholder='Your email address'
          />
          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div>
          <div onClick={() => this.confirm()}>
            {this.state.login ? 'login' : 'create account'}
          </div>
          <div
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  confirm = async () => {
    const { name, email, password } = this.state
    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })
      console.log('logged in user', result.data.login.user.name)
      const { token } = result.data.login
      this.saveUserData(token)
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          name,
          email,
          password,
        },
      })
      console.log('created user', result.data.createUser.user.name)
      const { token } = result.data.createUser
      this.saveUserData(token)
    }
    this.props.history.push(`/`)
  }

  saveUserData = token => {
    localStorage.setItem('authToken', token)
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name) {
      token,
      user {
        name
      }
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user {
        name 
      }
    }
  }
`
export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(Login)