import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import NavBar from './NavBar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const MEDITATION_QUERY = gql`
  {
    meditations {
      id
      title
      description
      img_url
      audio_url
    }
  }
`;

const getMeditations = (data) => {
  return data.meditations;
}

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div>
      <NavBar title="Knurling" />
      <Query query={MEDITATION_QUERY}>
        {
          ({loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            const meditations = getMeditations(data);

            return (
              <div className={classes.root}>
                <GridList cellHeight={115} spacing={3}>
                  {meditations.map(tile => (
                    <GridListTile key={tile.id} cols={2} rows={1}>
                      <img src={tile.img_url} alt={tile.title} />
                      <GridListTileBar
                        title={tile.title}
                        subtitle={<span>{tile.description}</span>}
                        actionIcon={
                          <IconButton className={classes.icon}>
                            <PlayArrowIcon />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            )
          }
        }
      </Query>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
