import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import SwipeableMenu from './SwipeableMenu';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Container,
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
      backgroundColor: 'rgba(0,0,0,0.6)',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      zIndex: -1,
    }
  },
  controls: {
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 90,
    width: 90,
    color: 'white',
  },
  skipIcons: {
    height: 45,
    width: 45,
    color: 'white',
    opacity: '0.8',
  },
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
  render() {
    const meditationId = this.props.match.params.meditation
    const { classes } = this.props

    return (
      <div className={classes.fullScreen}>
          <Query query={MEDITATION_QUERY} variables={{ id: meditationId }}>
            {
              ({loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const meditation = data.meditation;

                return (
                  <div className={classes.background} style={{ backgroundImage: `url(${meditation.img_url})`}}>
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
                        <div className={classes.controls}>
                          <IconButton aria-label="Previous">
                            <SkipPreviousIcon className={classes.skipIcons} />
                          </IconButton>
                          <IconButton aria-label="Play/pause">
                            <PlayArrowIcon className={classes.playIcon} />
                          </IconButton>
                          <IconButton aria-label="Next">
                            <SkipNextIcon className={classes.skipIcons} />
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
