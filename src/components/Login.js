import React from 'react';
import splash from '../images/splash-darkest.jpg';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// TODO: Make an import
const styles = () => ({
  fullscreen: {
    backgroundImage: `url(${splash})`,
    height: `100vh`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  container: {
    paddingTop: '35%',
  },
  titleWrapper: {
    display: 'inline-block'
  },
  subtitle: {
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  subtitleText: {
    fontSize: '1.1em',
    fontWeight: '500',
    marginBottom: '0px',
  },
  title: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '4.5em',
    fontWeight: 'bold',
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '90%',
  },
  border: {
    borderColor: 'white !important',
  },
  input: {
    color: 'white !important',
    fontWeight: '500',
  },
  label: {
    "&$focusedLabel": {
      color: "white"
    },
    "&$erroredLabel": {
      color: "red"
    },
    color: "white"
  },
  focusedLabel: {},
  erroredLabel: {},
  button: {
    marginTop: '10px',
    height: '3.5em',
    fontWeight: '500',
  },
  signin: {
    color: 'white',
  }
});

class Login extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.fullscreen}>
        <div className={classes.container}>
          <div className={classes.titleWrapper}>
            <div className={classes.subtitle}>
              <p className={classes.subtitleText}>Always be jacked. Always be tan.</p>
            </div>
            <div className={classes.title}>Knurling</div>
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
              >
                Sign Up
              </Button>
              <div className={classes.subtitle}>
                <p>Already have an account? Sign in</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Login);
