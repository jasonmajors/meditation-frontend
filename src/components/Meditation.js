import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import SwipeableMenu from './SwipeableMenu';
import AudioPlayer from './AudioPlayer';
import LoadingPage from './LoadingPage';

const styles = theme =>  ({
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
  render() {
    const meditationId = this.props.match.params.meditation
    const { classes } = this.props

    return (
      <div className={classes.fullScreen}>
          <Query query={MEDITATION_QUERY} variables={{ id: meditationId }}>
            {
              ({loading, error, data }) => {
                if (loading) return <LoadingPage />
                if (error) return <div>Error</div>

                const meditation = data.meditation;

                return (
                  <div className={classes.background} style={{ backgroundImage: `url(${meditation.img_url})` }}>
                    <SwipeableMenu anchorColor="white" />
                    <AudioPlayer
                      title={ meditation.title }
                      description={ meditation.description }
                      src={ meditation.audio_url }
                    />
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
