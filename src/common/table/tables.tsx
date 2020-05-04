import React from 'react';
import {
  createStyles,
  Theme,
  withStyles
} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#20883A',
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14,
      height: '36px',
    }
  })
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'none'
    }
  })
)(TableRow);

