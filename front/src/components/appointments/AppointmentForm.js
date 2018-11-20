import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Card, CardContent, CardActions, CardHeader, option } from '@material-ui/core';
import axios from 'axios';

const url_specialties = 'http://localhost:5555/back/get_specialties';
const url_physicians = 'http://localhost:5555/back/get_physicians/';
const url_dates = 'http://localhost:5555/back/get_dates/';

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
      allSpecialities: [],
      allSpecialitiesLoaded: false,
      selectedSpeciality: '',
      allPhisicians: [],
      selectedPhisician: '',
      allPhisiciansLoaded: false,
      allDates: [],
      selectedDate: '',
      allDatesLoaded: false,
      selectedTurnId: '',
    };
  }

  selectSpeciality = event => {
    if (event.target.value === 'emptyOpt') {
      this.setState({
        disablePhisicianSelector: true,
        disableDateSelector: true,
      });
      return;
    }
    console.log('selected speciality');
    this.getPhisicians(event.target.value);
    this.setState({
      selectedSpeciality: event.target.value,
      disablePhisicianSelector: false,
      disableDateSelector: true,
    });
  };

  selectPhisician = event => {
    if (event.target.value === 'emptyOpt') {
      this.setState({
        disableDateSelector: true,
      });
      return;
    }
    console.log('selected phisician');
    this.getDates(event.target.value);
    this.setState({
      selectedPhisician: event.target.value,
      disableDateSelector: false,
    });
  };

  selectDate = event => {
    if (event.target.value === 'emptyOpt') {
      return;
    }
    console.log('selected date');
    this.setState({
      selectedDate: event.target.value,
      disableDateSelector: false,
    });
  };

  getSpecialities = () => {
    axios.get(url_specialties).then(res => {
      this.setState({
        allSpecialities: res,
        allSpecialitiesLoaded: true,
      });
    });
    console.log('Specialties:');
    console.log(this.state.allSpecialities);
    console.log(this.state.allSpecialitiesLoaded);
  };

  getPhisicians = specialty_id => {
    axios.get(url_physicians + specialty_id).then(res => {
      this.setState({
        allPhisicians: res,
        allPhisiciansLoaded: true,
      });
    });
    console.log('Medicos:');
    console.log(this.state.allPhisicians);
  };

  getDates = doctor_specialty_id => {
    axios.get(url_dates + doctor_specialty_id).then(res => {
      this.setState({
        allDates: res,
        allDatesLoaded: true,
      });
    });
    console.log('Fechas:');
    console.log(this.state.allDates);
  };

  setAppointment = () => {
    console.log('Appointment set');
    console.log(this.state.selectedDate);
  };

  render() {
    const { classes } = this.props;
    const emptyOption = <option key={'emptyOpt'} value={'emptyOpt'}>Seleccione una opcion</option>;
    if (!this.state.allSpecialitiesLoaded) {
      this.getSpecialities();
    }

    return (
      <Card className={classes.base}>
        <CardHeader title="Nuevo turno" />
        <CardContent>
          <TextField
            select
            label="Especialidad"
            defaultValue="Default Value"
            className={classes.textField}
            value={this.state.selectedSpeciality.value}
            onChange={this.selectSpeciality}
            SelectProps={{
              native: true,
            }}
            helperText="Por favor seleccione una especialidad"
            margin="normal"
          >
            {emptyOption}
            {this.state.allSpecialitiesLoaded
              ? this.state.allSpecialities.data.map(speciality => (
                  <option key={speciality.value} value={speciality.id}>
                    {speciality.value}
                  </option>
                ))
              : null}
          </TextField>
          <br />
          <TextField
            disabled={this.state.disablePhisicianSelector}
            select
            label="Profesional"
            defaultValue="Default Value"
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
            {emptyOption}
            {this.state.allPhisiciansLoaded
              ? this.state.allPhisicians.data.map(phisician => (
                  <option key={phisician.value} value={phisician.id}>
                    {phisician.value}
                  </option>
                ))
              : null}
          </TextField>
          <br />
          <TextField
            disabled={this.state.disableDateSelector}
            select
            label="Fecha"
            defaultValue="Default Value"
            className={classes.textField}
            onChange={this.selectDate}
            SelectProps={{
              native: true,
            }}
            helperText="Por favor seleccione una fecha para el turno"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          >
            {emptyOption}
            {this.state.allDatesLoaded
              ? this.state.allDates.data.map(date => (
                  <option key={date.value} value={date.id}>
                    {date.value}
                  </option>
                ))
              : null}
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
