import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { StyledTableCell, StyledTableRow } from '../../common/table';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '550px',
      height: (rowsPerPage * 69 + 110 )+'px',
      margin: '20px auto 0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    table: {
      margin: '0 auto',
      maxWidth: '550px',
      height: (rowsPerPage * 69 + 57 )+'px',
    },
    pagination: {
      // maxWidth: '250px'
    },
    date: {
      padding: '14px 16px',
      width: '150px',
    }
  })
);

const rowsPerPage: number = 3;

interface ResultsProps {
  games: object[];
  user: string;
}

const Results: React.FC<ResultsProps> = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };  
  const renderResult = (row: any) => {
    let result: string = 'New';

    if (row.winner !== 'none' && row.winner === row.challenger) {
      result = props.user === row.challenger ? 'WIN': 'LOSE'
      // result = row.challenger;
    }
    if (
      row.winner !== 'none' &&
      row.winner !== row.challenger &&
      row.winner !== 'self'
    ) {
      // result = row.winner;
      result = props.user === row.winner ? 'WIN': 'LOSE'
    }
    if (row.winner === 'none' && row.pc_move && row.ph_move) {
      result = 'TIE';
    }
    return result;
  };

  console.log('props.games', props);
  return (
    <span className={classes.container}>
      <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Challenger</StyledTableCell>
            <StyledTableCell align="left">Defender</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell align="left">Winner</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.games
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="left">{row.challenger}</StyledTableCell>
              <StyledTableCell align="left">{row.host}</StyledTableCell>
              <StyledTableCell align="left" className={classes.date}>{new Date(parseInt(String(row.cdate) + '000')).toUTCString()}</StyledTableCell>
              <StyledTableCell align="left">
                {renderResult(row)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        component="div"
        className={classes.pagination}
        count={props.games.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[]}
      />
    </span>
  );
};

Results.defaultProps = {
  games: [],
  user: ''
};

export default Results;
