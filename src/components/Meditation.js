import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import SwipeableMenu from './SwipeableMenu';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import moment from 'moment'
import indigo from '@material-ui/core/colors/indigo'

import {
  Typography,
  IconButton,
} from '@material-ui/core';

const styles = theme =>  ({
  mediaPlayer: {
    bottom: '0',
    left: '0',
    right: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
    width: '90%',
    marginBottom: '15px',
    textAlign: 'center',
  },
  light: {
    color: 'white',
  },
  fullScreen: {
    height: '100%',
  },
  background: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
    maxHeight: '100vh',
    position: 'relative',
    zIndex: 1,
    '&::after': {
      content: '" "',
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.4)',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      zIndex: -1,
    }
  },
  seekbar: {
    width: '100%',
    height: '0.2em',
    '-webkit-appearance': 'none',
    '&::-webkit-progress-bar': {
      backgroundColor: 'white',
    },
    '&::-webkit-progress-value': {
      backgroundColor: indigo[500]
    }
  },
  controls: {
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
  },
  playIcon: {
    height: 90,
    width: 90,
    color: 'white',
  },
  skipIcon: {
    height: 45,
    width: 45,
    color: 'white',
    opacity: '0.9',
  },
  secondaryIcon: {
    height: 20,
    width: 20,
    color: 'white',
    opacity: '0.9',
  },
  audioMetaContainer: {
    paddingTop: '0.5em',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
  }
});

const MEDITATION_QUERY = gql`
  query MeditationQuery($id: ID!) {
    meditation(id: $id) {
      id
      title
      description
      img_url
      audio_url
    }
  }
`;

class Meditation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: 'paused',
      currentTime: this.formatTimestamp(0),
      duration: null,
    };
  }

  // TODO: The audio player should be its own component
  toggleAudio = () => {
    if (this.state.player === 'playing') {
      this.player.pause()
      this.setState({ player: 'paused' })
    } else if (this.state.player === 'paused') {
      this.player.play()
      this.setState({ player: 'playing' })
    }
    console.log(this.state)
  }

  formatTimestamp = (secs) => {
    return moment.utc(secs*1000).format('mm:ss');
  }

  updateProgress = () => {
    this.setState({ currentTime: this.formatTimestamp(this.player.currentTime) })
    this.progress.value = this.player.currentTime / this.player.duration
  }

  seek = (event) => {
    const percent = event.nativeEvent.offsetX / this.progress.clientWidth

    this.player.currentTime = percent * this.player.duration
    this.progress.value = percent / 100
  }

  render() {
    const meditationId = this.props.match.params.meditation
    const { classes } = this.props
    // TODO: When we abstract the player component out, we'll want currentTimeSeconds and durationSeconds
    // or currentTimeTs and durationTs
    const { player, currentTime, duration } = this.state

    return (
      <div className={classes.fullScreen}>
          <Query query={MEDITATION_QUERY} variables={{ id: meditationId }}>
            {
              ({loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const meditation = data.meditation;

                return (
                  <div className={classes.background} style={{ backgroundImage: `url(${meditation.img_url})` }}>
                    <SwipeableMenu anchorColor="white" />
                      <div className={classes.mediaPlayer}>
                        <div>
                          <Typography className={classes.light} component="h4" variant="h4">
                            {meditation.title}
                          </Typography>
                          <Typography className={classes.light} variant="subtitle1">
                            {meditation.description}
                          </Typography>
                        </div>
                        {/* TODO: Can abstract the audio part into its own component */}
                        <audio
                          ref={ref => this.player = ref }
                          src={meditation.audio_url}
                          onTimeUpdate={this.updateProgress}
                          onLoadedMetadata={() => this.setState({ duration: this.formatTimestamp(this.player.duration) })}
                        >
                        </audio>
                        <progress
                          ref={ref => this.progress = ref }
                          className={classes.seekbar}
                          onClick={e => { this.seek(e) }}
                          value="0"
                          max="1">
                        </progress>
                        <div className={classes.audioMetaContainer}>
                          <div>
                            { currentTime }
                          </div>
                          <div>
                            { duration }
                          </div>
                        </div>
                        <div className={classes.controls}>
                          <IconButton aria-label="Repeat">
                            <ShuffleIcon className={classes.secondaryIcon} />
                          </IconButton>
                          <IconButton aria-label="Previous">
                            <SkipPreviousIcon className={classes.skipIcon} />
                          </IconButton>
                          <IconButton aria-label="Play/pause" onClick={ this.toggleAudio }>
                            {
                              player === 'paused' ?
                                <PlayArrowIcon className={classes.playIcon} /> :
                                <PauseIcon className={classes.playIcon} />
                            }
                          </IconButton>
                          <IconButton aria-label="Next">
                            <SkipNextIcon className={classes.skipIcon} />
                          </IconButton>
                          <IconButton aria-label="Repeat">
                            <RepeatIcon className={classes.secondaryIcon} />
                          </IconButton>
                        </div>
                      </div>
                  </div>
                )
              }
            }
          </Query>
      </div>
    )
  }
}

export default withStyles(styles)(Meditation);
