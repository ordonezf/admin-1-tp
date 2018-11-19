import React from 'react';
import axios from 'axios';
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

const base_url = 'http://localhost:5555/back'
const success = 200

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
        id:-1,
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
    
    handleSignin = () => {
        let url = base_url + '/signin'
        try {
            const user = { username:this.state.name, password:this.state.password};

            axios.post(url, {user}).then(res => {
                console.log(res)
                if (res.status == success){
                    console.log(res)
                    this.setState({id:res.data.userid})
                    alert("Success!")
                } else {
                    console.log("Error at signin: " + res.status + res.statusText)
                    alert("Error at signin: " + res.status + "-" + res.statusText)
                    this.setState({dni: '',firstName: '', lastName: '', birthday: '', mail: '', username: '', password: '', showPassword: false})
                }
            });
        } catch(err) {
            console.log(err);
        }
    };
    
 
    render() {
        const { classes } = this.props;
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
                    <Button variant="contained" color="primary" className={classes.margin} onClick={this.handleSignin}>
                        Login
                    </Button>
                    <Button className={classes.margin}>
                        <Link to="/signup">Not a member? Sign up</Link>
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