import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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

function meditations() {
  // TODO: Fetch from API
  return [
    {
      id: 0,
      img: 'https://material-ui.com/static/images/grid-list/burgers.jpg',
      title: 'Get big, Get dank',
      description: 'Let us guide you through being dope',
    },
    {
      id: 1,
      img: 'https://material-ui.com/static/images/grid-list/honey.jpg',
      title: 'Mother. Fucking. Honey.',
      description: 'Get the Honey',
    },
    {
      id: 2,
      img: 'https://material-ui.com//static/images/grid-list/hats.jpg',
      title: 'Hats. What are they and why?',
      description: "Just don't wear hats",
    },
    {
      id: 3,
      img: 'https://material-ui.com/static/images/grid-list/vegetables.jpg',
      title: 'Veggies... should you eat them?',
      description: 'Yeah you should probably eat them',
    },
    {
      id: 7,
      img: 'https://material-ui.com/static/images/grid-list/star.jpg',
      title: 'Starfish',
      description: 'No',
    },
  ]
}

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={115} spacing={3}>
        {meditations().map(tile => (
          <GridListTile key={tile.id} cols={2} rows={1}>
            <img src={tile.img} alt={tile.title} />
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
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
