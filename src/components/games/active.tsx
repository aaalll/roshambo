import React, { useContext, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { StyledTableCell, StyledTableRow } from '../../common/table';
import { StoreContext } from 'store/reducers/reducer';

const rowsPerPage: number = 3;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '550px',
      height: (rowsPerPage * 69 + 110) + 'px',
      margin: '20px auto 0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    table: {
      margin: '0 auto',
      maxWidth: '550px',
      height: (rowsPerPage * 69 + 57) + 'px',
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


interface ActiveProps {
  games: object[];
  openGame: Function;
}

const Active: React.FC<ActiveProps> = (props) => {
  const { state } = useContext(StoreContext);
  const [page, setPage] = useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const classes = useStyles();

  const handleGame = (id: number, host: string) => {
    props.openGame(id, host);
  };

  return (
    <span className={classes.container}>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Start&nbsp;</StyledTableCell>
              <StyledTableCell align="left">Challenger</StyledTableCell>
              <StyledTableCell align="left">Defender</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.games
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        handleGame(row.id, row.host);
                      }}
                    >
                      Open
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.challenger}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.host}</StyledTableCell>
                  <StyledTableCell align="left" className={classes.date}>{new Date(parseInt(String(row.cdate) + '000')).toUTCString()}</StyledTableCell>
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

Active.defaultProps = {
  games: []
};

export default Active;
