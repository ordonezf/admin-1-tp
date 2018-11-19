import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  list: {
    width: 250,
  },
  drawer: {
    marginTop: 64, // margin of AppBar
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class MenuDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleSignOut = () => {
    console.log('Goodbye');
    this.props.setIsAuthenticated(false);
  };

  render() {
    const { classes } = this.props;

    const searchLink = props => <Link to="/search" {...props} />;
    const appointmentsLink = props => <Link to="/appointments" {...props} />;
    const newAppointmentLink = props => (
      <Link to="/newappointment" {...props} />
    );
    const signOutLink = props => <Link to="/" {...props} />;

    const sideList = (
      <div className={classes.list}>
        <IconButton onClick={this.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          <ListItem button key={'Buscar medicos'} component={searchLink}>
            <ListItemText primary={'Buscar medicos'} />
          </ListItem>
          <ListItem button key={'Mis Turnos'} component={appointmentsLink}>
            <ListItemText primary={'Mis Turnos'} />
          </ListItem>
          <ListItem button key={'Nuevo Turno'} component={newAppointmentLink}>
            <ListItemText primary={'Nuevo Turno'} />
          </ListItem>
        </List>
        <Divider />
        <Button component={signOutLink} onClick={this.handleSignOut}>
          <ExitToAppIcon
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          Desconexion
        </Button>
      </div>
    );

    return (
      <div>
        <IconButton
          onClick={this.handleDrawerOpen}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          className={classes.drawer}
          anchor="left"
          open={this.state.open}
          onClose={this.handleDrawerClose}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawerClose}
            onKeyDown={this.handleDrawerClose}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  setIsAuthenticated: PropTypes.func,
};

export default withStyles(styles)(MenuDrawer);
