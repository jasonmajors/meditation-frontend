import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';
import Upload from './Upload';
import { gql, graphql } from 'graphql-tag';

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

// const MEDITATION_MUTATION = gql`
//   mutation MeditationMutation($title: String!, $description: String!, $img_url: String!, $audio_url: String!) {
//     meditation(title: $title, description: $description, img_url: $image_url, audio_url: $audio_url) {
//       id
//     }
//   }
// `

class MeditationSubmit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: null,
      description: null,
      imageUrl: null,
      audioUrl: null,
      uploading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(event) {
    // TODO: Need to setup permissions for this to work. Probably need to setup auth.
    this.saveMeditation(this.state.title, this.state.description);
    event.preventDefault();
  };

  storeMediaDownloadURLs = event => {
    console.log(event)
    this.setState({ imageUrl: event.image })
    this.setState({ audioUrl: event.audio })
    // Send it
    this.saveMeditation();
  }

  saveMeditation = () => {
    this.setState({ uploading: true })
    console.log("To the API!")
  }

  render() {
    const { classes } = this.props;
    const { title, description, imageUrl, audioUrl, uploading } = this.state;

    return (
      <div>
        <NavBar title="New Meditation" />
          <form className={classes.container} autoComplete="off">
            <TextField
              required
              name="title"
              label="Title"
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
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <Upload onUploaded={this.storeMediaDownloadURLs} />
          </form>
      </div>
    );
  }
}

MeditationSubmit.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const MeditationSubmitMutation = graphql(MEDITATION_MUTATION)(MeditationSubmit);

export default withStyles(styles)(MeditationSubmit);

