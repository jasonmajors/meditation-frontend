import React from 'react';
import splash from '../images/splash-dark.jpg';
import { withStyles } from '@material-ui/core/styles';

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
    justifyContent: 'flex-end'
  },
  title: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '4.5em',
    fontWeight: 'bold',
  },
  form: {

  },
  signup: {

  },
  signin: {

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
              <h3>Always be jacked. Always be Tan.</h3>
            </div>
            <div className={classes.title}>Knurling</div>
          </div>
          <div className={classes.form}>
            <input type="text"></input>
          </div>
          <div>
            <input type="password"></input>
          </div>
          <div className={classes.signup}>Sign Up</div>
          <div className={classes.signin}>Already have an account? Sign in</div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Login);
