import React, { useContext, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';

import Footer from 'components/footer';
import Header from 'components/header';
// import Loader from 'components/loader';

import { StoreContext } from 'store/reducers/reducer';
// import { setMessage } from 'store/actions/actions';
import { getGameChallenges } from 'store/sagas/sagas';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    App: {
      textAlign: 'center',
      height: '100%',
      justifyContent: 'flex-start'
    },
    container: {
      [theme.breakpoints.down('md')]: {

      }
    }
  })
);

const AppRoot: React.FC = (props) => {
  const { state, dispatch } = useContext(StoreContext);
  const classes = useStyles();

  // const handleSnackbarClose = (
  //   event?: React.SyntheticEvent,
  //   reason?: string
  // ) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   dispatch(setMessage(null));
  // };


  useEffect(() => {
    console.log('AppRoot useEffect', state);
    if (state.client && state.refresh === 'loaded') {
      const timer = setTimeout(() => {
        console.log('=====>', new Date(), timer, state)
        getGameChallenges({ dispatch, state })();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state, dispatch]); //?

  return (
    <Grid
      container
      className={classes.App}
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      <AppBar position="static">
        <Header />
      </AppBar>

      <Grid container spacing={0} className={classes.container}>
        {props.children}
      </Grid>
      {/* <Snackbar open={!!state.message} autoHideDuration={6000} onClose={handleSnackbarClose}>
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
      </Snackbar> */}
      <Footer />
    </Grid>
  );
};

export default AppRoot;
