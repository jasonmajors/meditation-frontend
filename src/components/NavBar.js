import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { strings } from '../config/strings';
import SwipeableMenu from './SwipeableMenu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const NavBar = (props) => {
  const { classes, title } = props;
 // TODO: The AccountCircle icon button needs a menu. See example in docs.
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SwipeableMenu />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            { title }
          </Typography>
          <div>
            <IconButton
              color="inherit"
             >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}


NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);

