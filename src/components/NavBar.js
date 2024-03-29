import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import { strings } from '../config/strings';
import SwipeableMenu from './SwipeableMenu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textAlign: 'center'
  },
};

const NavBar = (props) => {
  const { classes, title } = props;
 // TODO: The AccountCircle icon button needs a menu. See example in docs.
  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="primary">
        <Toolbar disableGutters={true}>
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

