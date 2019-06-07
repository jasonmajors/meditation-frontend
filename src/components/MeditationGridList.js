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
    // backgroundColor: theme.palette.grey[900],
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

export const MEDITATIONS_QUERY = gql`
  query MeditationsQuery($orderBy: MeditationOrderByInput) {
    meditations(orderBy: $orderBy) {
      id
      title
      description
      img_url
    }
  }
`;

const getQueryVariables = () => {
  return {
    orderBy: `createdAt_DESC`,
  }
}

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div>
      <NavBar title="Knurling" />
      <Query query={MEDITATIONS_QUERY} variables={ getQueryVariables() }>
        {
          ({loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            const meditations = data.meditations

            return (
              <div className={classes.root}>
                <GridList cellHeight={115} spacing={5}>
                  {meditations.map((meditation, i) => (
                    <GridListTile
                      key={meditation.id}
                      // Make the first meditation 2 columns
                      cols={i === 0 ? 2 : 1}
                      rows={1.75}
                      component="a"
                      href={`/meditations/${meditation.id}`}
                    >
                    <img src={meditation.img_url} alt={meditation.title} />
                    <GridListTileBar
                      title={meditation.title}
                      subtitle={<span>{meditation.description}</span>}
                      actionIcon={
                        <IconButton className={classes.icon}>
                          <PlayArrowIcon />
                        </IconButton>}
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
