import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import BarChartIcon from '@material-ui/icons/BarChart';
import PlayListAddIcon from '@material-ui/icons/PlaylistAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class SwipeableMenu extends React.Component {
  state = {
    right: false,
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {[
            {text: 'Search', icon: <SearchIcon />},
            {text: 'Stats', icon: <BarChartIcon />},
          ].map((item, index) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{ item.icon }</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            {text: 'New Meditation', icon: <PlayListAddIcon />, link: '/submit'},
            {text: 'Settings', icon: <SettingsIcon />, link: '/'},
            {text: 'Logout', icon: <PowerSettingsNewIcon />, link: '/'},
          ].map((item, index) => (
            <Link to={item.link} style={{ textDecoration: 'none' }}>
              <ListItem button key={item.text}>
                <ListItemIcon>{ item.icon }</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <IconButton
          onClick={this.toggleDrawer('left', true)}
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableMenu);
