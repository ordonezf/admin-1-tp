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

import './SignIn.css'

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
    textField: {
      flexBasis: 200,
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

    render() {
        const { classes } = this.props;
        return (
            <Card className="base">
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
                    <Button variant="contained" color="primary" className={classes.margin}>
                        Login
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