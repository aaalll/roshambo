import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import history from 'utils/history';
import { StoreContext } from 'store/reducers/reducer';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '550px',
      height: '75%',
      minHeight: '300px',
      margin: '50px auto'
    }
  })
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#20883A',
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })
)(TableRow);

const Calls: React.FC = () => {
  const { state } = useContext(StoreContext);
  const classes = useStyles();

  useEffect(() => {
    if (!state.user) history.push('/');
  });

  const handleGame = (id: string) => {
    history.push(`/calls/${id}`);
  };

  const renderResult = (row: any) => {
    let result: string = 'New game';

    if (row.winner !== 'none' && row.winner === row.challenger) {
      result = row.challenger;
    }
    if (
      row.winner !== 'none' &&
      row.winner !== row.challenger &&
      row.winner !== 'self'
    ) {
      result = row.winner;
    }
    if (row.winner === 'none' && row.pc_move && row.ph_move) {
      result = 'TIE';
    }
    return result;
  };

  return (
    <Grid container>
      <TableContainer component={Paper} className={classes.container}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Start</StyledTableCell>
              <StyledTableCell align="left">Challenger</StyledTableCell>
              <StyledTableCell align="left">Defender</StyledTableCell>
              <StyledTableCell align="left">Winner</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.calls.rows.map((row: any) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleGame(row.id);
                    }}
                  >
                    Open
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.challenger}
                </StyledTableCell>
                <StyledTableCell align="right">{row.host}</StyledTableCell>
                <StyledTableCell align="left">
                  {renderResult(row)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Calls;
