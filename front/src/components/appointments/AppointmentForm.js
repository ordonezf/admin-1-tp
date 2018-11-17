import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, CardContent, CardActions, CardHeader } from '@material-ui/core';

const styles = theme => ({
  base: {
    width: '50%',
    margin: '1em auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
    width: '100%',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  datepicker: {
    marginTop: 2 * theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
});

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: 0,
      allspecialities: [],
      selectedSpeciality: '',
      phisicians: [],
    };

    this.updateSearchDate = this.updateSearchDate.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getAppointment() {}

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.base}>
        <CardHeader title="Nuevo turno" />
        <CardContent>
          <TextField
            select
            label="Especialidad"
            className={classes.textField}
            value={this.state.selectedSpeciality.label}
            onChange={this.handleChange('selectedSpeciality')}
            SelectProps={{
              native: true,
            }}
            helperText="Por favor seleccione una especialidad"
            margin="normal"
          >
            {this.state.allspecialities.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <br />
          <TextField
            select
            label="Profesional"
            className={classes.textField}
            onChange={this.handleChange('phisician')}
            SelectProps={{
              native: true,
            }}
            helperText="Por favor seleccione un profesional"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          >
            {this.state.phisicians.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.getAppointment}
          >
            Sacar turno
          </Button>
        </CardActions>
      </Card>
    );
  }
}

AppointmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  serverConnector: PropTypes.any,
};

export default withStyles(styles)(AppointmentForm);
