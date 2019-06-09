import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { constants } from '../constants';
import { LoginStyles } from '../styles/LoginStyles';

class Login extends React.Component {
  state = {
    login: false,
    name: null,
    email: null,
    password: null,
    loginErr: null,
  }

  async login() {
    if (this.state.email && this.state.password) {
      try {
        await this.props.auth.login(this.state.email, this.state.password)
      } catch (e) {
        this.setState({ loginErr : e.description })
      }
    } else {
      // TODO: validation err
    }
  }

  signup() {
    console.log(this.state.name)
    this.props.auth.signup(this.state.email, this.state.password)
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { classes } = this.props;
    const { login, loginErr } = this.state;
    const { TAGLINE, TITLE } = constants;

    return (
      <div className={ classes.fullscreen }>
        <div className={ classes.container }>
          <div className={ classes.titleWrapper }>
            <div className={ classes.subtitle }>
              <p className={ classes.subtitleText }>{ TAGLINE }</p>
            </div>
            <div className={ classes.title }>{TITLE}</div>
          </div>
          <div className={ classes.formWrapper }>
            <form className={ classes.form }>
            {loginErr && (
              <div className={ classes.errorText }>{ loginErr }</div>
            )}
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
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                fullWidth={true}
                onClick={() => this.state.login ? this.login() : this.signup() }
              >
                {login && <span>Login</span>}
                {!login && <span>Sign Up</span>}
              </Button>
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
        <p onClick={() => this.logout()}>Auth LOGOUT OOOHHH</p>
      </div>
    )
  }
}

export default withStyles(LoginStyles)(Login);
