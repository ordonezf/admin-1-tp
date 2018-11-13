import React from 'react';
import Button from '@material-ui/core/Button'
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
import { Link } from 'react-router-dom';
import axios from 'axios';
const qs = require('querystring');

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
    base : {
        marginTop: '1em',
        position: 'fixed',
        top: '50%',
        left: '50%',
        'transform': 'translate(-50%, -50%)',
    },
    textField: {
      flexBasis: 200,
      width: '100%',
    },
});

class SignUp extends React.Component {
    state = {
        dni: '',
        firstName: '',
        lastName: '',
        birthday: '',
        mail: '',
        username: '',
        password: '',
        showPassword: false,
      };
    
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleRegister = async () => {
        console.log('Click happened');
        console.log(this.state)
        let results;
        let url = 'http://localhost:5555/back/signup'
        try {
            results = await axios.post(url, qs.stringify(this.state))
        } catch(err) {
            console.log(err)
        }
        console.log(results)
    };

    render() {
        const { classes } = this.props;

        const signInLink = props => <Link to="/" {...props} />

        return (
            <Card className={classNames(classes.base)}>
                <CardHeader title="Sign Up" />
                <CardContent>
                    <TextField
                        id="username"
                        label="Username"
                        className={classNames(classes.margin, classes.textField)}
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="adornment-password"
                        className={classNames(classes.margin, classes.textField)}
                        type={this.state.showPassword ? 'text' : 'password'}
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                >
                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="dni"
                        label="DNI"
                        type="number"
                        className={classNames(classes.margin, classes.textField)}
                        value={this.state.dni}
                        onChange={this.handleChange('dni')}
                        margin="normal"
                    />
                    <TextField
                        id="first-name"
                        label="First name"
                        className={classNames(classes.margin, classes.textField)}
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="last-name"
                        label="Last name"
                        className={classNames(classes.margin, classes.textField)}
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="birthday"
                        label="Birthday"
                        type="date"
                        className={classNames(classes.margin, classes.textField)}
                        value={this.state.birthday}
                        onChange={this.handleChange('birthday')}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />
                    <TextField
                        id="mail"
                        label="Mail"
                        type="email"
                        className={classNames(classes.margin, classes.textField)}
                        value={this.state.mail}
                        onChange={this.handleChange('mail')}
                        margin="normal"
                    />
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" className={classes.margin} onClick={this.handleRegister}>
                        Register
                    </Button>
                    <Button className={classes.margin} component={signInLink}>
                        Already a member? Sign in
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);