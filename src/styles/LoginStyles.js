import splash from '../images/splash-darkest.jpg';

export const LoginStyles = () => ({
  fullscreen: {
    backgroundImage: `url(${splash})`,
    minHeight: `100vh`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  container: {
    paddingTop: '32%',
    paddingLeft: '30px',
    paddingRight: '30px',
    "@media screen and (orientation:landscape)": {
      paddingTop: '0px',
    },
  },
  titleWrapper: {
    display: 'inline-block',
    textAlign: 'center',
    width: '100%'
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
    fontSize: '4.35em',
    fontWeight: 'bold',
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
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
  },
  signinText: {
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  loadingText: {
    fontWeight: '400',
    color: 'white'
  },
  errorText: {
    fontWeight: 'bold',
    color: 'red'
  }
});
