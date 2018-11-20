import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@material-ui/core';

let counter = 0;
function createData(date, time, phisician) {
  counter += 1;
  return { id: counter, date, time, phisician };
}

class AppointmentListHead extends React.Component {
  state = {
    rows: [
      { id: 'date', numeric: false, label: 'Fecha' },
      { id: 'time', numeric: false, label: 'Hora' },
      { id: 'phisician', numeric: false, label: 'Profesional' },
    ],
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { classes, order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {this.state.rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
          <TableCell
            className={classes.headCell}
            key="cancelAppointment"
            padding="dense"
          >
            Cancelar turno
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

AppointmentListHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    width: '95%',
    margin: '1em auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  headCell: {
    textAlign: 'center',
  },
});

class AppointmentList extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    data: [
      createData('15/01/2018', '10:00AM', 'Dr.Brown'),
      createData('04/11/2018', '10:00AM', 'Dr.Brown'),
      createData('12/01/2018', '10:00AM', 'Dr.Brown'),
      createData('15/03/2018', '10:00AM', 'Dr.Strange'),
      createData('17/05/2018', '10:00AM', 'Dr.Brown'),
      createData('18/05/2018', '10:00AM', 'Dr.Brown'),
      createData('19/01/2019', '10:00AM', 'Dr.Strange'),
      createData('11/02/2019', '10:00AM', 'Dr.Strange'),
      createData('13/02/2019', '10:00AM', 'Dr.Brown'),
      createData('05/03/2018', '10:00AM', 'Dr.Strange'),
      createData('17/06/2018', '10:00AM', 'Dr.Brown'),
    ],
    page: 0,
    rowsPerPage: 5,
  };

  getAppointments = () => {};

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  getSorting = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  cancelAppointment = appointment => event => {
    console.log('Cancelled turn:');
    console.log(appointment);
    const newData = this.state.data.filter(n => n.id !== appointment.id);
    console.log(newData);
    this.setState({ data: newData });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <Toolbar>
          <Typography variant="h6" id="tableTitle">
            Appointments
          </Typography>
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle">
            <AppointmentListHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />

            <TableBody>
              {this.stableSort(this.state.data, this.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow hover key={n.id}>
                      <TableCell>{n.date}</TableCell>
                      <TableCell>{n.time}</TableCell>
                      <TableCell>{n.phisician}</TableCell>
                      <TableCell className={classes.headCell}>
                        <Button
                          onClick={this.cancelAppointment(n)}
                          color="secondary"
                        >
                          Cancelar turno
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

AppointmentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentList);
