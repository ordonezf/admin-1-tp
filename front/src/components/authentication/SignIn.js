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
import { Link } from 'react-router-dom'

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
    base : {
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

class SignIn extends React.Component {
    state = {
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
        console.log('Signing in...');
        this.props.setIsAuthenticated(true);
    };

    render() {
        const { classes } = this.props;

        const signUpLink = props => <Link to="/signup" {...props} />

        return (
            <Card className={classNames(classes.base)}>
                <CardHeader title="Sign In" />
                <CardContent>
                    <TextField
                        id="outlined-name"
                        label="Name"
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
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" className={classes.margin} onClick={this.handleSignIn}>
                        Login
                    </Button>
                    <Button className={classes.margin} component={signUpLink}>
                        Not a member? Sign up
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);