import React, { useContext, useEffect } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
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

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#006700'
    },
    primary: {
      main: '#218838'
    }
  }
});

// colorPrimary: {
//   backgroundColor: '#218838',
// },
// colorSecondary: {
//   backgroundColor: '#006700',
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    App: {
      textAlign: 'center',
      height: '100%',
      justifyContent: 'flex-start',
      flexGrow: 1
    },
    container: {
      flexGrow: 1,
      [theme.breakpoints.down('md')]: {}
    },
    header: {
      background: 'none',
      boxShadow: 'none',
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
    if (state.client && state.refresh === 'loaded') {
      const timer = setTimeout(() => {
        getGameChallenges({ dispatch, state })();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state, dispatch]); //?

  return (
    <MuiThemeProvider theme={theme}>
      <Grid
        container
        className={classes.App}
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <AppBar position="static" className={classes.header}>
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
    </MuiThemeProvider>
  );
};

export default AppRoot;
