import React, { useContext } from 'react';
import { setModal } from 'store/actions/actions';
import { StoreContext } from 'store/reducers/reducer';

import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      textAlign: 'center',
      
      bottom: 0,
      width: '100%',
      height: '50px',
      background: '#6cf',
      borderTop: '1px solid #dde2ee',
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
      },
      [theme.breakpoints.down('md')]: {
        position: 'relative',
        display: 'flex',
        height: 'auto',
        paddingBottom: '0px',
      },
    },
    ul: {
      display: 'flex',
      listStyle: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'block',
        textAlign: 'left'
      }
    },
    link: {
      color: '#4122af',
      cursor: 'pointer'
    }
  })
);

const Footer: React.FC = () => {
  const classes = useStyles();
  const { dispatch } = useContext(StoreContext);

  const openModal = (type: string = '') => {
    dispatch(setModal(type));
  };

  return (
    <div className={classes.footer}>
      <ul className={classes.ul}>
        <li>
          <span>© CryptoLions 2020&nbsp;|&nbsp;</span>
        </li>
        <li>
          <span>Market&nbsp;|&nbsp;</span>
        </li>
        <li>
          <span
            className={classes.link}
            onClick={() => openModal('privacy-policy')}
          >
            Privacy policy&nbsp;|&nbsp;
          </span>
        </li>
        <li>
          <span className={classes.link} onClick={() => openModal('terms')}>
            Terms & conditions
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
