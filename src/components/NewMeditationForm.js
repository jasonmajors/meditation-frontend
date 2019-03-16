import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MusicNote from '@material-ui/icons/MusicNote';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { withFirebase } from './Firebase';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing.unit * 2,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NewMeditationForm extends React.Component {
  constructor(props) {
    super(props);

    //this.db = this.props.firebase.db;
    this.state = {
      open: false,
      name: '',
      description: '',
      image: '',
      audio: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.frequencyUpdated = this.frequencyUpdated.bind(this);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  // TODO: This will receive the "periods", we'll remove frequencySelect... all of that can be handled
  // inside the FrequencyForm component
  frequencyUpdated(periods) {
    console.log(periods);
    this.setState({
      periods: periods,
    });
  };

  handleSubmit(event) {
    // TODO: Need to setup permissions for this to work. Probably need to setup auth.
    this.saveMeditation(this.state.name, this.state.description, this.state.periods);
    event.preventDefault();
  };

  validate = periods => {
    periods.forEach(period => {
      console.log(period);
    });
  };

  saveMeditation = (name, description, periods) => {
    this.validate(periods);

    this.db.collection('chores').add({
      name: name,
      description: description,
      periods: periods,
    })
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(error => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          className={classes.button}
          variant="contained"
          color="inherit"
          onClick={this.handleClickOpen}
          >
            <MusicNote />
            New Shit
            <MusicNote />
        </IconButton>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                New Meditation
              </Typography>
              <Button color="inherit" onClick={this.handleSubmit}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <form className={classes.container} autoComplete="off">
            <TextField
              required
              name="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <TextField
              name="description"
              label="Description"
              multiline
              rows="4"
              placeholder="Brief description of the chore"
              value={this.state.description}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <div>
              <p>Audio file</p>
              <Button>
                <input type="file" />
              </Button>
            </div>
            <div>
            <p>Image</p>
              <Button>
                <input type="file" />
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

NewMeditationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(NewMeditationForm));

