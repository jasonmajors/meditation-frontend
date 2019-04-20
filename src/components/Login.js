import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { constants } from '../constants';
import { LoginStyles } from '../styles/LoginStyles';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends React.Component {
  state = {
    login: false,
    name: null,
    email: null,
    password: null
  }

  confirm = async (data) => {
    const { token } = this.state.login ? data.login : data.signup;
    this.saveUserData(token);
    this.props.history.push(`/`);
  }

  saveUserData = (token) => {
    console.log(token);
    localStorage.setItem(constants.AUTH_TOKEN, token);
  }

  getErrorMessage = (message) => {
    if (message.includes('unique constraint')) {
      return "We're sorry, that email is taken.";
    }
  }

  render() {
    const { classes } = this.props;
    const { name, email, password, login } = this.state;
    const { TAGLINE, TITLE } = constants;

    return (
      <div className={classes.fullscreen}>
        <div className={classes.container}>
          <div className={classes.titleWrapper}>
            <div className={classes.subtitle}>
              <p className={classes.subtitleText}>{TAGLINE}</p>
            </div>
            <div className={classes.title}>{TITLE}</div>
          </div>
          <div className={classes.formWrapper}>
            <form className={classes.form}>
            {!login && (
              <TextField
                type="text"
                name="Name"
                label="Name"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    focused: classes.focusedLabel,
                    error: classes.errorLabel,
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.border,
                    input: classes.input,
                  }
                }}
                fullWidth={true}
                onChange={e => this.setState({name: e.target.value})}
              />
            )}
              <TextField
                type="email"
                name="Email"
                label="Email"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    focused: classes.focusedLabel,
                    error: classes.errorLabel,
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.border,
                    input: classes.input,
                  }
                }}
                fullWidth={true}
                onChange={e => this.setState({email: e.target.value})}
              />
              <TextField
                type="password"
                name="Password"
                label="Password"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    focused: classes.focusedLabel,
                    error: classes.errorLabel,
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.border,
                    input: classes.input,
                  }
                }}
                fullWidth={true}
                onChange={e => this.setState({password: e.target.value})}
              />
              <Mutation
                mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                variables={{name, email, password}}
                onCompleted={data => this.confirm(data)}
                errorPolicy="all"
              >
                {(signUp, {loading, error}) => (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      fullWidth={true}
                      onClick={signUp}
                    >
                      {login && <span>Login</span>}
                      {!login && <span>Sign Up</span>}
                    </Button>
                    {loading && <p className={classes.loadingText}>Loading...</p>}
                    {error && error.graphQLErrors.map(({message}, i) => (
                      <p className={classes.errorText} key={i}>{this.getErrorMessage(message)}</p>
                    ))}
                  </div>
                )}
              </Mutation>
              <div className={classes.subtitle}>
                {!login && (
                  <p>Already have an account?
                    <span
                      className={classes.signinText}
                      onClick={e => this.setState({login: !login})}
                    > Sign in
                    </span>
                  </p>
                )}
                {login && (
                  <p>Need an account?
                    <span
                      className={classes.signinText}
                      onClick={e => this.setState({login: !login})}
                    > Sign up
                    </span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(LoginStyles)(Login);
