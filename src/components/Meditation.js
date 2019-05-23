import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import NavBar from './NavBar';
import { withStyles } from '@material-ui/core/styles';
import SwipeableMenu from './SwipeableMenu';
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';

const styles = {
  card: {
    margin: '10px 10px 10px 10px'
  },
  media: {
    height: '100%',
    maxHeight: '100vh',
  },
  navbar: {
    opacity: '0'
  }
};

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
      <div>
        <SwipeableMenu />
        <Card className={classes.card}>
          <Query query={MEDITATION_QUERY} variables={{ id: meditationId }}>
            {
              ({loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const meditation = data.meditation;

                return (
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      className={classes.media}
                      image={meditation.img_url}
                      title={meditation.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {meditation.title}
                      </Typography>
                      <Typography component="p">
                        {meditation.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  // <div>{meditation.img_url}</div>
                )
              }
            }
          </Query>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Meditation);
