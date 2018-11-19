import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
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
      allDates: [],
      selectedDate: '',
      selectedTurnId: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  selectSpeciality = event => {
    console.log('seleccione especialidad')
    this.setState({
      selectedSpeciality: event.target.value,
      disablePhisicianSelector: false,
      disableDateSelector: true,
      allPhisicians: this.getPhisicians(
        event.target.id
      ),
    });
  };

  selectPhisician = event => {
    this.setState({
      selectedPhisician: event.target.value,
      disableDateSelector: false,
      allDates: this.getDates(
        event.target.id
      ),
    });
  };

  getSpecialities = () => {
    /*let res = this.props.serverConnector.getSpecialities();
    console.log('sarasa');
    this.setState({
      allSpecialities: res,
      specialtiesLoaded: true
    });*/

   axios.get(url_specialties).then(res => {
    this.setState({
      allSpecialities: res,
      allSpecialitiesLoaded: true,
    });
   });
   console.log('Specialties:')
   console.log(this.state.allSpecialities);
   console.log(this.state.allSpecialitiesLoaded);
  };

  getPhisicians = (specialty_id) => {
    /*
    this.setState({
      allPhisicians: this.props.serverConnector.getPhisicians(
        this.state.selectedSpeciality
      ),
    });
    */
    axios.get(url_physicians + specialty_id).then(res => {
    this.setState({
      allPhisicians: res,
    });
   });
   console.log('Medicos:')
   console.log(this.state.allPhisicians);
  };

  getDates = (doctor_specialty_id) => {
    /*
    this.setState({
      allDates: this.props.serverConnector.getDates(
        this.state.selectedPhisician
      ),
    });
    */
    axios.get(url_dates + doctor_specialty_id).then(res => {
    this.setState({
      allDates: res,
    });
   });
   console.log('Fechas:')
   console.log(this.state.allDates);
  };

  setAppointment = () => {
    console.log('Appointment set');
  };

  render() {
    const { classes } = this.props;
    const { allSpecialitiesLoaded } = this.state;
    //const { allPhisicians } = this.state;
    //const { allDates } = this.state;

    this.getSpecialities();

    return (
      <div>
      {allSpecialitiesLoaded && (
      <Card className={classes.base}>
        <CardHeader title="Nuevo turno" />
        <CardContent>
          <TextField
            select
            label="Especialidad"
            className={classes.textField}
            value={this.state.selectedSpeciality.value}
            onChange={this.selectSpeciality}
            SelectProps={{
              native: true,
            }}
            helperText="Por favor seleccione una especialidad"
            margin="normal"
          >
            {this.state.allSpecialities.data.map(speciality => (
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
            {this.state.allPhisicians.data.map(phisician => (
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
            {this.state.allDates.data.map(date => (
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
      )}
      </div>
    );
  }
}

AppointmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  serverConnector: PropTypes.object,
};

export default withStyles(styles)(AppointmentForm);
