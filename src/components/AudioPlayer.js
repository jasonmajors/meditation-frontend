import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      currentTime: this.formatTimestamp(0),
      duration: null,
      playerLooping: false,
    };
  }

  toggleAudio = () => {
    if (this.state.playing) {
      this.player.pause()
      this.setState({ playing: false })
    } else if (this.state.playing === false) {
      this.player.play()
      this.setState({ playing: true })
    }
  }

  formatTimestamp = (secs) => {
    return moment.utc(secs * 1000).format('mm:ss');
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
    const { playing, currentTime, duration, playerLooping } = this.state
    const { classes, title, description, src } = this.props

    return (
      <div className={classes.mediaPlayer}>
        <div>
          <Typography className={classes.light} component="h4" variant="h4">
            { title }
          </Typography>
          <Typography className={classes.light} variant="subtitle1">
            { description }
          </Typography>
        </div>
        <audio
          ref={ ref => this.player = ref }
          src={ src }
          loop={ playerLooping }
          onTimeUpdate={ this.updateProgress }
          onLoadedMetadata={ () => this.setState({ duration: this.formatTimestamp(this.player.duration) })}
        >
        </audio>
        <progress
          ref={ ref => this.progress = ref }
          className={ classes.seekbar }
          onClick={ e => { this.seek(e) }}
          value="0"
          max="1">
        </progress>
        <div className={ classes.audioMetaContainer }>
          <div>
            { currentTime }
          </div>
          <div>
            { duration }
          </div>
        </div>
        <div className={ classes.controls }>
          <IconButton aria-label="Repeat">
            <ShuffleIcon className={ classes.secondaryIcon } />
          </IconButton>
          <IconButton aria-label="Previous">
            <SkipPreviousIcon className={ classes.skipIcon } />
          </IconButton>
          <IconButton aria-label="Play/pause" onClick={ this.toggleAudio }>
            {
              playing === false ?
                <PlayArrowIcon className={ classes.playIcon } /> :
                <PauseIcon className={ classes.playIcon } />
            }
          </IconButton>
          <IconButton aria-label="Next">
            <SkipNextIcon className={ classes.skipIcon } />
          </IconButton>
          <IconButton
            aria-label="Repeat"
            onClick={ () => this.setState({ playerLooping: !this.state.playerLooping })}
          >
            <RepeatIcon className={ classes.secondaryIcon } />
          </IconButton>
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(AudioPlayer);
