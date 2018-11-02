import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './AppointmentList.css'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class AppointmentList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          appointments:[
              {id:0, datetime:"Martes 6/11 9:00hs"},
              {id:1, datetime:"Miércoles 7/11 17:00hs"},
              {id:2, datetime:"Miércoles 7/11 18:00hs"}
          ]
      };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.state.appointments.map(app => (
            <ListItem key={app.id} role={undefined} dense button>
              <ListItemText
                primary={`Turno ${app.id + 1}`}
                secondary={`${app.datetime}`}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem>
            <Button variant="contained" color="primary"disableRipple
                className={classNames(classes.margin)}>
            Nuevo Turno
            </Button>
          </ListItem>
        </List>
      </div>
    );
  }
}

AppointmentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentList);
