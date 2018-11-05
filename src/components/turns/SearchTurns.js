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
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
    },
});

class SearchTurns extends React.Component {
    state = {
        value: '',
        results: null,
      };

    handleSearch = async (value) => {
        let results;
        
        try {
            results = await axios.get('https://jsonplaceholder.typicode.com/users');
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
                                <TableCell>Phone</TableCell>
                                <TableCell>Anotarse</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {results.data.map(row => {
                            return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
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

SearchTurns.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchTurns);
