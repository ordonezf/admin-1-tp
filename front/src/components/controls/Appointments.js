import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
      marginTop: theme.spacing.unit,
  },
  datepicker:{
      marginTop:2*theme.spacing.unit,
      marginRight:theme.spacing.unit,
      marginLeft:theme.spacing.unit
  },
});

const allspecialities = [
  {
    value: 'CRD',
    label: 'Cardiology',
  },
  {
     value: 'TRM',
     label: 'Traumatology',
  },
  {
    value: 'PSGY',
    label: 'Plastic Surgery',
  },
  {
    value: 'PDT',
    label: 'Pediatrics',
  },
];

const allphisicians = [
  {
    value: 1123,
    label: 'Dr.Watson',
    speciality: 'PDT'
  },
  {
     value: 1822,
     label: 'Dr.Strange',
     speciality: 'TRM'

  },
  {
    value: 1984,
    label: 'Dr.Brown',
    speciality: 'PSGY'
  },
];

const someTakenAppExample = [
    {date: "2018-11-12",hour:"10", minutes:"00"},
    {date: "2018-11-12",hour:"13", minutes:"30"},
    {date: "2018-11-12",time:"16", minutes:"30"}
];

class AppointmentForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            patientId: 0,
            selectedSpeciality: allspecialities[0],
            phisicians: allphisicians,
            data: [],
            excludedTimes:[],
            dateTime: moment().hours(5)
        };

        this.updateSearchDate = this.updateSearchDate.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    updateSearchDate(date) {
        let taken = someTakenAppExample.map(
            (datetime)=>{
                return moment(datetime.date,'YYYY-MM-DD').hours(Number.parseInt(datetime.hour)).minutes(Number.parseInt(datetime.minutes))
            }
        )
        this.setState({
            dateTime:date,
            excludedTimes: taken
        });
    };

    searchAppointments(event){
        event.preventDefault();
        alert("searching...")
    };

    render() {
        let filteredPhisicians = this.state.phisicians.filter(
        (phisician) => {
            return (
                phisician.speciality == this.state.selectedSpeciality
            )
        }
    );
    const { classes } = this.props;

    return (
        <form onSubmit={this.searchAppointments.bind(this)}>
          <TextField
            id="outlined-select-speciality"
            select
            label="Speciality"
            className={classes.textField}
            value={this.state.selectedSpeciality}
            onChange={this.handleChange('selectedSpeciality')}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select a speciality"
            margin="normal"
            variant="outlined"
          >
            {allspecialities.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="outlined-select-phisician"
            select
            label="Phisician"
            className={classes.textField}
            onChange={this.handleChange('phisician')}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select a phisician"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          >
            {filteredPhisicians.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <DatePicker
              minDate={moment()}
              maxDate={moment().add(6, "months")}
              showWeekNumbers
              className={classes.datepicker}
              selected={this.state.dateTime}
              onChange={this.updateSearchDate}
              showTimeSelect
              minTime={moment().hours(9).minutes(0)}
              maxTime={moment().hours(18).minutes(30)}
              dateFormat="LLL"
              excludeTimes={this.state.excludedTimes}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit">
              Take Appointment
          </Button>
      </form>

    );
  }
}


AppointmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentForm);
