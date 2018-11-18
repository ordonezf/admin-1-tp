import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
});

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disablePhisicianSelector: true,
      disableDateSelector: true,
      allSpecialities: this.getSpecialities(),
      selectedSpeciality: '',
      allPhisicians: [],
      selectedPhisician: '',
      allDates: [],
      selectedDate: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  selectSpeciality = event => {
    this.setState({
      selectedSpeciality: event.target.value,
      disablePhisicianSelector: false,
      disableDateSelector: true,
      allPhisicians: this.props.serverConnector.getPhisicians(
        event.target.value
      ),
    });
  };

  selectPhisician = event => {
    this.setState({
      selectedPhisician: event.target.value,
      disableDateSelector: false,
      allDates: this.props.serverConnector.getDates(
        this.state.selectedSpeciality,
        event.target.value
      ),
    });
  };

  getSpecialities = () => {
    return this.props.serverConnector.getSpecialities();
  };

  getPhisicians = () => {
    this.setState({
      allPhisicians: this.props.serverConnector.getPhisicians(
        this.state.selectedSpeciality
      ),
    });
  };

  getDates = () => {
    this.setState({
      allDates: this.props.serverConnector.getDates(
        this.state.selectedPhisician
      ),
    });
  };

  setAppointment = () => {
    console.log('Appointment set');
  };

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
            onChange={this.selectSpeciality}
            SelectProps={{
              native: true,
            }}
            helperText="Por favor seleccione una especialidad"
            margin="normal"
          >
            {this.state.allSpecialities.map(speciality => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            ))}
          </TextField>
          <br />
          <TextField
            disabled={this.state.disablePhisicianSelector}
            select
            label="Profesional"
            className={classes.textField}
            onChange={this.selectPhisician}
            SelectProps={{
              native: true,
            }}
            helperText="Por favor seleccione un profesional"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          >
            {this.state.allPhisicians.map(phisician => (
              <option key={phisician} value={phisician}>
                {phisician}
              </option>
            ))}
          </TextField>
          <br />
          <TextField
            disabled={this.state.disableDateSelector}
            select
            label="Fecha"
            className={classes.textField}
            onChange={this.handleChange('selectedDate')}
            SelectProps={{
              native: true,
            }}
            helperText="Por favor seleccione una fecha para el turno"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          >
            {this.state.allDates.map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </TextField>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.setAppointment}
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
  serverConnector: PropTypes.object,
};

export default withStyles(styles)(AppointmentForm);
