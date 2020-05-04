import React, { useContext, useEffect, useState } from 'react';
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
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { StoreContext } from 'store/reducers/reducer';
import Paper from '@material-ui/core/Paper';
import { loadTop, loadWallet } from 'store/sagas/sagas';
import { StyledTableCell, StyledTableRow } from '../../common/table';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      maxWidth: '550px',
      minHeight: '350px',
      margin: '10px auto',
      color: '#fff',
      [theme.breakpoints.down('md')]: {}
    },
    table: {},
    container: {
      minHeight: '300px',
      margin: 'auto',
      background: '#fff',
      opacity: '0.9',
      boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.15)',
    },
    pagination: {
      // 
    },
  })
);


const Top: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  let { id } = useParams();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const rowsPerPage: number = 10;
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (state.top === null) {
      if (state.status === 'loaded') {
        loadTop({ dispatch, state })();
      } else {
        setTimeout(() => {
          loadTop({ dispatch, state })();
        }, 5000);
      }
    }
  });

  return (
    <Grid container className={classes.media}>
      <h2>Score Table</h2>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Player</StyledTableCell>
              <StyledTableCell align="left">Games</StyledTableCell>
              <StyledTableCell align="left">Wins</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.top &&
              state.top
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="left">{row.player}</StyledTableCell>
                    <StyledTableCell align="left">{row.games_played}</StyledTableCell>
                    <StyledTableCell align="left">{row.games_win}</StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        className={classes.pagination}
        count={state.top?state.top.length:0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[]}
      />
    </Grid>
  );
};

export default Top;
