import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: 'knurling.auth0.com',
    clientID: 'steq6wxAOZ2cZl1ii1M3sW5wUqYNsjj5',
    redirectUri: 'http://knurling.local:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }
  // TODO: This works but feels kind of sloppy? Does it need to be a promise in order to get the response from
  // the callback?
  login(email, password) {
    return new Promise((_, reject) => this.auth0.login({
      realm: process.env.REACT_APP_AUTH0_REALM,
      email: email,
      password: password,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    }, err => {
      reject(err)
    }))
  }
  // TODO: This works but feels kind of sloppy? Does it need to be a promise in order to get the response from
  // the callback?
  signup(name, email, password) {
    return new Promise((_, reject) => this.auth0.signup({
      email: email,
      password: password,
      connection: process.env.REACT_APP_AUTH0_REALM,
      user_metadata: {
        name: name
      }
    }, (err, _) => {
      if (err === null) {
        this.login(email, password)
      } else {
        reject(err)
      }
    }))
  }

  handleAuthentication() {
    this.auth0.parseHash((err , authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        console.log('setting session')
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  getAccessToken() {
    return this.accessToken
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    localStorage.setItem('isLoggedIn', 'true')
    // Set the time that the Access Token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime()
    this.accessToken = authResult.accessToken
    console.log(authResult)
    this.idToken = authResult.idToken
    this.expiresAt = expiresAt;
    // navigate to home... will need to change this
    history.replace('/meditations')
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        this.logout()
        console.log(err)
      }
    })
  }

  logout() {
    this.accessToken = null
    this.idToken = null
    this.expiresAt = 0

    localStorage.removeItem('isLoggedIn')

    this.auth0.logout({
      returnTo: window.location.origin
    })
    // TODO: Would like to figure out how to get this to bring the user back to the universal login
    history.replace('/')
  }

  isAuthenticated() {
    let expiresAt = this.expiresAt

    return new Date().getTime() < expiresAt
  }
}
