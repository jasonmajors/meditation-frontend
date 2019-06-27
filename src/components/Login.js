import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { constants } from '../constants';
import { LoginStyles } from '../styles/LoginStyles';
import {
  IconButton,
} from '@material-ui/core';
import { FaInstagram, FaFacebook, FaGoogle } from 'react-icons/fa';

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
        this.setState({ loginErr: e.description })
      }
    } else {
      this.setState({ loginErr: 'Missing some fields.' })
    }
  }

  loginViaGoogle() {
    this.props.auth.loginViaGoogle()
  }

  loginViaFacebook() {
    this.props.auth.loginViaFacebook()
  }

  loginViaInstagram() {
    this.props.auth.loginViaInstagram()
  }

  async signup() {
    if (this.state.name && this.state.email && this.state.password) {
      try {
        await this.props.auth.signup(this.state.name, this.state.email, this.state.password)
      } catch (e) {
        this.setState({ loginErr: e.description })
      }
    } else {
      this.setState({ loginErr: 'Missing some fields.' })
    }
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
            </form>
          </div>
          <div className={ classes.subtitle }>
            {!login && (
              <p>Already have an account?
                <span
                  className={ classes.signinText }
                  onClick={ e => this.setState({ login: !login })}
                > Sign in
                </span>
              </p>
            )}
            {login && (
              <p>Need an account?
                <span
                  className={ classes.signinText }
                  onClick={e => this.setState({ login: !login })}
                > Sign up
                </span>
              </p>
            )}
          </div>
          <div className={ classes.formWrapper }>
            <div className={ classes.socialHr }></div>
            <div style={{ color: '#f2f2f2', opacity: 0.7, textAlign: 'center', width: '20%', marginBottom: '-0.5em' }}>Or With</div>
            <div className={ classes.socialHr }></div>
          </div>
          <div className={ classes.socialContainer }>
            <FaFacebook className={ classes.socialLogins } onClick={ () => this.loginViaFacebook() }></FaFacebook>
            <FaGoogle className={ classes.socialLogins } onClick={ () => this.loginViaGoogle() }></FaGoogle>
            <FaInstagram className={ classes.socialLogins } onClick={() => this.loginViaInstagram() }></FaInstagram>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(LoginStyles)(Login);
