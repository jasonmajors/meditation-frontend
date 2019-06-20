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
        // TODO: Move to env
        const url = 'http://localhost:4000/authenticate'
        // TODO: Fetch cookie method - needs to force promise to end perhaps before the redirect to /meditations
        fetch(url, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authResult.accessToken}`
          },
        }).then(response => {
          if (response.ok) {
            console.log('cookie set?')
          }
        }).catch(error => {
          console.log(error)
        })

        console.log('setting session')
        history.replace('/meditations')
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

  logout() {
    this.accessToken = null
    this.idToken = null
    this.expiresAt = 0

    localStorage.removeItem('isLoggedIn')
    // TODO: Remove our auth cookie
    this.auth0.logout({
      returnTo: window.location.origin
    })
    history.replace('/')
  }

  isAuthenticated() {
    let expiresAt = this.expiresAt

    return new Date().getTime() < expiresAt
  }
}
