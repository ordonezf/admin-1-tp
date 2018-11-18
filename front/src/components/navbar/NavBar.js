import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuDrawer from './Menu'
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
    const { classes } = props;
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <MenuDrawer />
                <Typography variant="h6" color="inherit" className={classes.grow}>
                Mis Turnos Medicos
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(NavBar);