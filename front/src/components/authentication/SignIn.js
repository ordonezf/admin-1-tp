import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { CardContent, CardActions, CardHeader } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const base_url = 'http://localhost:5555/back';
const success = 200;

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  textField: {
    flexBasis: 200,
    width: '100%',
  },
});

class SignIn extends React.Component {
  state = {
    id: -1,
    name: '',
    password: '',
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSignIn = () => {
    let url = base_url + '/signin';
    try {
      const user = { dni: this.state.name, password: this.state.password };

      axios.post(url, { user }).then(res => {
        console.log(res);
        if (res.status === success) {
          this.setState({ id: res.data.user_id });
          console.log(res);
          console.log('Signing in...');
          this.props.setIsAuthenticated(true);
          this.props.history.push('/appointments');
        } else {
          console.log('Error at signin: ' + res.status + res.statusText);
          alert('Error at signin: ' + res.status + '-' + res.statusText);
          this.setState({
            id: -1,
            name: '',
            password: '',
            showPassword: false,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;

    const signUpLink = props => <Link to="/signup" {...props} />;

    return (
      <Card className={classNames(classes.base)}>
        <CardHeader title="Sign In" />
        <CardContent>
          <TextField
            id="outlined-name"
            label="Usuario (DNI)"
            className={classNames(classes.margin, classes.textField)}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <br />
          <TextField
            id="outlined-adornment-password"
            className={classNames(classes.margin, classes.textField)}
            type={this.state.showPassword ? 'text' : 'password'}
            label="Contraseña"
            value={this.state.password}
            onChange={this.handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={this.handleSignIn}
          >
            Ingresar
          </Button>
          <Button className={classes.margin} component={signUpLink}>
            ¿No es un miembro? Registrese
          </Button>
        </CardActions>
      </Card>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SignIn));
