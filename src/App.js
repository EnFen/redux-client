import React, { Component, Fragment } from 'react';
import './App.css';
import store from './config/store'
import { setBookmarksAction, setTokenAction, setLoginErrorAction } from './config/actions'
import { api, setJwt } from './api/init'
import decodeJWT from 'jwt-decode'
import Bookmark from './components/Bookmark'
import Signin from './components/Signin'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

class App extends Component {

  fetchBookmarks() {
    api.get('/bookmarks').then((res) => {
      store.dispatch(setBookmarksAction(res.data))
    }).catch((err) => {
      console.error('Could not fetch bookmarks', err)
    })
  }

  componentDidMount() {
    this.fetchBookmarks()
  }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      let token = response.data.token
      setJwt(response.data.token)
      store.dispatch(setTokenAction(token))
      this.fetchBookmarks()
    } catch (error) {
      store.dispatch(setLoginErrorAction(error.message))
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch(setTokenAction(null))
      store.dispatch(setBookmarksAction([]))
    })
  }

  remove = (id) => {
    api.delete(`/bookmarks/${id}`)
    const index = store.getState().bookmarks.findIndex(bookmark => bookmark._id === id)
    if (index >= 0) {
      const newBookmarks = [...store.getState().bookmarks]
      newBookmarks.splice(index, 1)
      store.dispatch(setBookmarksAction(newBookmarks))
    }

  }


  render() {
    const bookmarks = store.getState().bookmarks
    const token = store.getState().token
    const tokenDetails = token && decodeJWT(token)
    console.log(tokenDetails)
    return (
      <div className="App">
        {
          <Router>
            <Fragment>
              <Route exact path='/' render={() => <Redirect to='/bookmarks' />} />
              <Route exact path='/login' render={() => {
                if (token) {
                  return (<Redirect to="/bookmarks" />)
                } else {
                  return (<Signin loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />)
                }
              }} />
              <Route exact path="/bookmarks" render={() => (
                <Fragment>
                  {tokenDetails && (
                    <div>
                      <h4>Welcome {tokenDetails.email}</h4>
                      <p>You logged in at: {new Date(tokenDetails.iat * 1000).toLocaleString()}</p>
                      <p>Your token expires at: {new Date(tokenDetails.exp * 1000).toLocaleString()}</p>
                    </div>
                  )}
                  <h1> Bookmarks</h1>
                  <ul>
                    {bookmarks.map(bookmark => <li key={bookmark._id}><Bookmark {...bookmark} remove={this.remove} /></li>)}
                  </ul>
                </Fragment>
              )
              } />
            </Fragment>
          </Router>
        }

      </div>
    );
  }
}

export default App;