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
import { lighten } from '@material-ui/core/styles/colorManipulator';
import 'react-datepicker/dist/react-datepicker.css';

let counter = 0;
function createData(date, time, phisician, patient) {
  counter += 1;
  return { id: counter, date, time, phisician, patient };
}

class AppointmentListHead extends React.Component {
  state = {
    rows: [
      { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
      { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
      {
        id: 'phisician',
        numeric: true,
        disablePadding: false,
        label: 'Phisician',
      },
      { id: 'patient', numeric: true, disablePadding: false, label: 'Patient' },
    ],
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

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

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let AppointmentListToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Appointments
        </Typography>
      </div>
    </Toolbar>
  );
};

AppointmentListToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

AppointmentListToolbar = withStyles(toolbarStyles)(AppointmentListToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class AppointmentList extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    data: [
      createData('15/01/2018', '10:00AM', 'Dr.Brown', 'Patient A'),
      createData('04/11/2018', '10:00AM', 'Dr.Brown', 'Patient B'),
      createData('12/01/2018', '10:00AM', 'Dr.Brown', 'Patient C'),
      createData('15/03/2018', '10:00AM', 'Dr.Strange', 'Patient D'),
      createData('17/05/2018', '10:00AM', 'Dr.Brown', 'Patient E'),
      createData('18/05/2018', '10:00AM', 'Dr.Brown', 'Patient F'),
      createData('19/01/2019', '10:00AM', 'Dr.Strange', 'Patient G'),
      createData('11/02/2019', '10:00AM', 'Dr.Strange', 'Patient H'),
      createData('13/02/2019', '10:00AM', 'Dr.Brown', 'Patient I'),
      createData('05/03/2018', '10:00AM', 'Dr.Strange', 'Patient J'),
      createData('17/06/2018', '10:00AM', 'Dr.Brown', 'Patient K'),
    ],
    page: 0,
    rowsPerPage: 5,
    search: '',
    sartDate: '', //moment().startOf('month').format('DD/MM/YYYY'),
    endDate: null,
  };

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

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  updateStartDate(date) {
    this.setState({ startDate: date });
  }

  updateEndDate(date) {
    this.setState({ endDate: date });
  }

  render() {
    let filteredItems = this.state.data.filter(listitem => {
      return (
        listitem.phisician
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1 ||
        listitem.patient
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
      // && moment(listitem.date).isSameOrAfter(this.startDate,'year')
      // && (!this.endDate || moment(listitem.date).isSameOrBefore(this.endDate,'year'));
    });

    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
              Appointments
            </Typography>
          </div>
          <br />
          {/* <div>
                  <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
              </div>
              <div>
                  <DatePicker
                      selected={this.state.startDate}
                      onChange={this.updateStartDate.bind(this)}
                      showTimeSelect
                      dateFormat="LLL"
                  />
              </div>
              <div>
                  <DatePicker
                      selected={this.state.endDate}
                      onChange={this.updateEndDate.bind(this)}
                      showTimeSelect
                      dateFormat="LLL"
                  />
              </div> */}
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <AppointmentListHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />

            <TableBody>
              {this.stableSort(filteredItems, this.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow hover key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.date}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {n.time}
                      </TableCell>
                      <TableCell numeric>{n.phisician}</TableCell>
                      <TableCell numeric>{n.patient}</TableCell>
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
