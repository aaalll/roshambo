import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CallIcon from '@material-ui/icons/Call';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { StoreContext } from 'store/reducers/reducer';
import { loadWallet, logoutWallet } from 'store/sagas/sagas';
import { setMessage } from 'store/actions/actions';
import history from 'utils/history';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    colorPrimary: {
      background: 'none',
      boxShadow: 'none',
    }
  })
);

const Header: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [
  //   mobileMoreAnchorEl,
  //   setMobileMoreAnchorEl
  // ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleGameLisClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    history.push(`/games/`);
  };

  const handleTopLisClick = (elem: any) => {
    history.push(`/top/`);
  };

  const handleCallLisClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    history.push(`/calls/`);
  };

  // const handleGameLisClose = (elem: any) => {
  //   history.push(`/games/${elem.id}`);
  // };

  // const handleCallLisClose = (elem: any) => {
  //   history.push(`/calls/${elem.id}`);
  // };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const signOff = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
    logoutWallet({ state, dispatch })();
  };

  const reloadWaller = async () => {
    try {
      loadWallet({ state, dispatch })();
      dispatch(setMessage({ type: 'success', text: 'Connected!' }));
    } catch (error) {
      dispatch(setMessage({ type: 'error', text: error }));
    }
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={signOff}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Toolbar className={classes.colorPrimary}>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={() => {
          history.push('/');
        }}
      >
        <i className="fal fa-hand-scissors"></i>
      </IconButton>
      <Typography className={classes.title} variant="h6" noWrap>
        {state.environment.style.logoText}
      </Typography>
      <div className={classes.grow} />
      <div className={classes.sectionDesktop}>
        <IconButton color="inherit" aria-label="connect" onClick={reloadWaller}>
          <AutorenewIcon />
        </IconButton>
        {state.user && (
          <Button
            color="inherit"
            onClick={handleGameLisClick}
            className={classes.menuButton}
          >
            <Badge badgeContent={state.games.rows.length} color="secondary">
              Games&nbsp;
            </Badge>
          </Button>
        )}
        <Button
          color="inherit"
          onClick={handleTopLisClick}
          className={classes.menuButton}
        >
          Top 100&nbsp;
        </Button>
        {state.user && (
          <Button
            color="inherit"
            onClick={handleCallLisClick}
            className={classes.menuButton}
          >
            <Badge badgeContent={state.calls.rows.length} color="secondary">
              Calls&nbsp;
            </Badge>
          </Button>
        )}

        {state.user && (
          <Button color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle /> {state.user.name}
          </Button>
        )}
        {state.client && !state.user && (
          <Button color="inherit" aria-label="Login" onClick={reloadWaller}>
            Login
            <ExitToAppIcon />
          </Button>
        )}
      </div>
      <div className={classes.sectionMobile}>
        {state.user &&
          state.games &&
          state.games.rows &&
          state.games.rows.length > 0 && (
            <MenuItem>
              <IconButton
                aria-label={`show ${state.games.rows.length} notifications`}
                color="inherit"
                onClick={handleGameLisClick}
              >
                <Badge badgeContent={state.games.rows.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </MenuItem>
          )}
        {state.user &&
          state.calls &&
          state.calls.rows &&
          state.calls.rows.length > 0 && (
            <MenuItem>
              <IconButton
                aria-label={`show ${state.calls.rows.length} notifications`}
                color="inherit"
                onClick={handleCallLisClick}
              >
                <Badge badgeContent={state.calls.rows.length} color="secondary">
                  <CallIcon />
                </Badge>
              </IconButton>
            </MenuItem>
          )}

        <MenuItem>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </MenuItem>
      </div>
      {renderMenu}
    </Toolbar>
  );
};

export default Header;
