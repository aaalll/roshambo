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

import Footer from 'components/footer';
import Header from 'components/header';

import { StoreContext } from 'store/reducers/reducer';
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
        <Footer />
      </Grid>
    </MuiThemeProvider>
  );
};

export default AppRoot;
