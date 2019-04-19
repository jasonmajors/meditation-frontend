import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { constants } from '../constants';
import { LoginStyles } from '../styles/LoginStyles';

class Login extends React.Component {
  signUp() {
    console.log('hello');
  }
  render() {
    const { classes } = this.props;
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
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                fullWidth={true}
                onClick={this.signUp}
              >
                Sign Up
              </Button>
              <div className={classes.subtitle}>
                <p>Already have an account? <span className={classes.signinText}>Sign in</span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(LoginStyles)(Login);
