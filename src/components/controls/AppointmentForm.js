import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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
});

const specialities = [
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

const phisicians = [
  {
    value: 1123,
    label: 'Dr.Watson',
  },
  {
     value: 1822,
     label: 'Dr.Strange',
  },
  {
    value: 1984,
    label: 'Dr.Brown',
  },
];

class AppointmentForm extends React.Component {
  state = {
    patientId: 0,
    speciality: 'PDT',
    phisician: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-select-speciality"
            select
            label="Speciality"
            className={classes.textField}
            value={this.state.speciality}
            onChange={this.handleChange('speciality')}
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
            {specialities.map(option => (
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
          >
            {phisicians.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="date"
            label="Appointment Date"
            type="date"
            className={classes.dense}
            InputLabelProps={{
              shrink: true,
            }}
          />
      </form>
    );
  }
}

AppointmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentForm);
