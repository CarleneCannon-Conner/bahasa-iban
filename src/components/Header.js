import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(process.env.AUTH_TOKEN)
    return (
      <div>
        <div>
          <div>Bahasa Iban</div>
          <Link to="/">
            new
          </Link>
          <div>|</div>
          <Link to="/top">
            top
          </Link>
          <div>|</div>
          <Link to="/search">
            search
          </Link>
          {authToken && (
            <div>
              <div>|</div>
              <Link to="/create">
                submit
              </Link>
            </div>
          )}
        </div>
        <div>
          {authToken ? (
            <div
              onClick={() => {
                localStorage.removeItem(process.env.AUTH_TOKEN)
                this.props.history.push(`/`)
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/login">
              login
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)