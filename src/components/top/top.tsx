import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
import { loadTop } from 'store/sagas/sagas';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      [theme.breakpoints.down('md')]: {}
    },
    table: {
    },
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
      backgroundColor: 'none'
    }
  })
)(TableRow);

const Top: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  let { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    if (!state.user) history.push('/');
    if (!state.top) {
      loadTop({ dispatch, state })();
    }
  });
  

  const handleGame = (id: string) => {
    history.push(`/games/${id}`);
  };

  const renderResult = (row: any) => {
    let result: string = 'New game';

    {
      row.winner !== 'none' &&
        row.winner === row.challenger &&
        (result = row.challenger );
    }
    {
      row.winner !== 'none' &&
        row.winner !== row.challenger &&
        row.winner !== 'self' &&
        (result = row.winner );
    }
    {
      row.winner === 'none' &&
        row.pc_move &&
        row.ph_move &&
        (result = 'TIE');
    }
    return result;
  };

  return (
    <Grid container className={classes.media}>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Challenger</StyledTableCell>
              <StyledTableCell align="left">Defender</StyledTableCell>
              <StyledTableCell align="left">Winner</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.top.rows.map((row: any) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.challenger}</StyledTableCell>
                <StyledTableCell align="left">{row.host}</StyledTableCell>
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

export default Top;
