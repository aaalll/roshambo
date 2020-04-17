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
import MoreIcon from '@material-ui/icons/MoreVert';
import { StoreContext } from 'store/reducers/reducer';
import { loadWallet, logoutWallet } from 'store/sagas/sagas';
import { setMessage } from 'store/actions/actions';
import history from 'utils/history';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    }
  })
);

const Header: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    anchorGameListEl,
    setAnchorGameListEl
  ] = React.useState<null | HTMLElement>(null);

  const [
    anchorCallListEl,
    setAnchorCallListEl
  ] = React.useState<null | HTMLElement>(null);

  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleGameLisClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorGameListEl(event.currentTarget);
  };

  const handleCallLisClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorCallListEl(event.currentTarget);
  };

  const handleGameLisClose = (elem: any) => {
    history.push(`/game/${elem.id}`);
    setAnchorGameListEl(null);
  };

  const handleCallLisClose = (elem: any) => {
    history.push(`/call/${elem.id}`);
    setAnchorCallListEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const signOff = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
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
      <MenuItem onClick={handleMenuClose}>
        Profile {state && state.user ? state.user.name : ''}
      </MenuItem>
      <MenuItem onClick={signOff}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
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
            <p>Games</p>
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
            <p>Calls</p>
          </MenuItem>
        )}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Toolbar>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={()=>{
          history.push('/')
        }}
      >
        <i className="fal fa-hand-scissors"></i>
      </IconButton>
      <Typography className={classes.title} variant="h6" noWrap>
        {state.environment.style.logoText}
      </Typography>
      <div className={classes.grow} />
      <div className={classes.sectionDesktop}>
        <IconButton
          color="inherit"
          aria-label="connect"
          onClick={reloadWaller}
        >
          <AutorenewIcon />
        </IconButton>
        {state.client && !state.user && (
          <Button color="inherit" aria-label="Login" onClick={reloadWaller}>
            Login
            <ExitToAppIcon />
          </Button>
        )}
        {state.user && state.games.rows && state.games.rows.length > 0 && (
          <IconButton
            aria-label={`show ${state.games.rows.length} notifications`}
            color="inherit"
            onClick={handleGameLisClick}
          >
            <Badge badgeContent={state.games.rows.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        )}
        {state.user && state.calls.rows && state.calls.rows.length > 0 && (
          <IconButton
            aria-label={`show ${state.calls.rows.length} notifications`}
            color="inherit"
            onClick={handleCallLisClick}
          >
            <Badge badgeContent={state.calls.rows.length} color="secondary">
              <CallIcon />
            </Badge>
          </IconButton>
        )}
        {state.user && state.games.rows && state.games.rows.length > 0 && (
          <Menu
            id="game-list-menu"
            anchorEl={anchorGameListEl}
            keepMounted
            open={Boolean(anchorGameListEl)}
            onClose={handleGameLisClose}
          >
            {state.games.rows.map((elem: any, index) => (
              <MenuItem key={index} onClick={() => handleGameLisClose(elem)}>
                {elem.challenger}
              </MenuItem>
            ))}
          </Menu>
        )}
        {state.user && state.calls.rows && state.calls.rows.length > 0 && (
          <Menu
            id="game-list-menu"
            anchorEl={anchorCallListEl}
            keepMounted
            open={Boolean(anchorCallListEl)}
            onClose={handleCallLisClose}
          >
            {state.calls.rows.map((elem: any, index) => (
              <MenuItem key={index} onClick={() => handleCallLisClose(elem)}>
                {elem.host}
              </MenuItem>
            ))}
          </Menu>
        )}
        {state.user && (
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        )}
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
      {renderMobileMenu}
      {renderMenu}
    </Toolbar>
  );
};

export default Header;
