import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

import Footer from 'components/footer';
import Header from 'components/header';
import Loader from 'components/loader';

import { StoreContext } from 'store/reducers/reducer';
import { setMessage } from 'store/actions/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    App: {
      textAlign: 'center',
      height: '100%',
      justifyContent: 'flex-start',
    },
    container: {
      [theme.breakpoints.down('md')]: {
        // display: 'block',
        // backgroundColor: 'red',
      },
    }
  })
);

const AppRoot: React.FC = (props) => {
  const { state, dispatch } = useContext(StoreContext);
  const classes = useStyles();

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setMessage(null));
  };

  return (
    <Grid container className={classes.App}
    direction="column"
    justify="space-between"
    alignItems="center">
      <AppBar position="static">
        <Header />
      </AppBar>
      {state.status === 'loading' ? (
        <Loader />
      ) : (
        <Grid container spacing={0} className={classes.container}>
          {props.children}
        </Grid>
      )}
      <Snackbar open={!!state.message} autoHideDuration={6000}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={
            state.message && state.message.type ? state.message.type : 'success'
          }
        >
          {state.message && state.message.text
            ? state.message.text
            : 'Something wrong!'}
        </MuiAlert>
      </Snackbar>
      <Footer />
    </Grid>
  );
};

export default AppRoot;
