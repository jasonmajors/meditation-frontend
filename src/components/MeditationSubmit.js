import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';
import Upload from './Upload';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { MEDITATIONS_QUERY } from './MeditationGridList';
import LoadingIndicator from './LoadingIndicator';
import { loadingPhrases } from '../utils/loading-phrases';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  flex: {
    flex: 1,
  },
});

const MEDITATION_MUTATION = gql`
  mutation MeditationMutation($title: String!, $description: String!, $img_url: String!, $audio_url: String!) {
    meditation(title: $title, description: $description, img_url: $img_url, audio_url: $audio_url) {
      id
    }
  }
`

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
      error: false,
    };

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

  startMediaUpload = () => {
    console.log('uploading')
    this.setState({ error: false })
    this.setState({ uploading: true })
  }

  finishMediaUpload = event => {
    console.log('uploaded')
    this.setState({ uploading: false })
    this.setState({ imageUrl: event.image })
    this.setState({ audioUrl: event.audio })
    // Send it
    this.saveMeditation();
  }

  mediaUploadError = error => {
    console.log('media upload error')
    console.log(error)
    this.setState({ uploading: false })
    this.setState({ error: true })
  }

  saveMeditation = () => {
    const variables = {
      title: this.state.title,
      description: this.state.description,
      img_url: this.state.imageUrl,
      audio_url: this.state.audioUrl
    }
    this.props.mutate({
      variables: variables,
      update: (store, { data: { meditation } }) => {
        const orderBy = 'createdAt_DESC'
        const data = store.readQuery({
          query: MEDITATIONS_QUERY,
          variables: { orderBy },
        })
        data.meditations.unshift(meditation)
        store.writeQuery({
          query: MEDITATIONS_QUERY,
          data,
          variables: { orderBy },
        })
      }
    }).then(response => {
      this.props.history.push('/meditations')
    }).catch(error => {
      this.setState({ error: true })
      console.log(error)
    })
  }

  render() {
    const { classes } = this.props;
    const { uploading, error } = this.state;

    let progress;

    if (uploading) {
      // Get a random loading phrase
      let phrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]
      progress = (
        <div style={{ textAlign: 'center' }}>
          <small>{ phrase }</small>
          <LoadingIndicator />
        </div>
      )
    }
    if (error) {
      progress = (
        <div style={{ textAlign: 'center' }}>
          <span>Error, bro</span>
        </div>
      )
    }

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
            <Upload
              onUploadStart={this.startMediaUpload}
              onUploadFinish={this.finishMediaUpload}
              onUploadError={this.mediaUploadError}
            />
          </form>
          { progress }
      </div>
    );
  }
}

MeditationSubmit.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MeditationSubmitMutation = graphql(MEDITATION_MUTATION)(MeditationSubmit);

export default withStyles(styles)(MeditationSubmitMutation);

