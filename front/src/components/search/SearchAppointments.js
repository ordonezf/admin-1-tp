import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    searchbarContainer : {
        margin: '1em auto',
        width: '50%',
    },
    tableContainer: {
        width: '95%',
        margin: 'auto',
    },
    table: {
        overflow: 'auto',
    }
});

class SearchAppointments extends React.Component {
    state = {
        value: '',
        results: null,
      };

    handleSearch = async (value) => {
        let results;
        // const url = 'http://localhost:5555/back/search_turns?search=';
        const url = 'https://jsonplaceholder.typicode.com/users/';
        try {
            results = await axios.get(url);
        } catch(err) {
            console.log(err);
        }

        this.setState({
            value,
            results,
        });
    }

    handleClick() {
        console.log('Click happened');
    };

    render() {

      const { results } = this.state;
      const { classes } = this.props;

      return (
        <div>
            <Paper className={classes.searchbarContainer}>
                <SearchBar
                    value={this.state.value}
                    placeholder="Buscar medico..."
                    onChange={(newValue) => this.setState({ value: newValue })}
                    onRequestSearch={() => this.handleSearch(this.state.value)}
                />
            </Paper>
  
            {results &&
                (<Paper className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Práctica</TableCell>
                                <TableCell>Médico</TableCell>
                                <TableCell>Horario</TableCell>
                                <TableCell>Anotarse</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {results.data.map(row => {
                            return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>{row.practice}</TableCell>
                                <TableCell>{row.doctor}</TableCell>
                                <TableCell>{row.time}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
                                        Anotarse
                                    </Button>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </div>
        )
    }
}

SearchAppointments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppointments);
