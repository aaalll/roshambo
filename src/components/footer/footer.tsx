import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      textAlign: 'center',
      boxShadow: 'none',
      bottom: 0,
      width: '100%',
      height: '50px',
      background: 'none',
      borderTop: '0px',
      [theme.breakpoints.up('md')]: {
        position: 'absolute'
      },
      [theme.breakpoints.down('md')]: {
        position: 'relative',
        display: 'flex',
        height: 'auto',
        paddingBottom: '0px'
      }
    },
    ul: {
      display: 'flex',
      color: '#fff',
      listStyle: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'block',
        textAlign: 'left'
      }
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      '&:hover': {
        color: '#afa',
        textDecoration: 'none'
      }
    }
  })
);

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <ul className={classes.ul}>
        <li>
          <Link
            href="https://github.com/CryptoLions/roshambo-EOS-frontend"
            target="_blank"
            className={classes.link}
          >
            <i className="fal fa-code-merge" />
            &nbsp;version 1.1.0
          </Link>
          &nbsp;|&nbsp;
        </li>
        <li>
          <Link
            href="https://twitter.com/EOS_CryptoLions"
            target="_blank"
            className={classes.link}
          >
            <i className="fab fa-twitter" />
            &nbsp;@cryptolions
          </Link>
          &nbsp;|&nbsp;
        </li>
        <li>
          <Link
            href="https://cryptolions.io"
            target="_blank"
            className={classes.link}
          >
            <i className="fab fa-gitter" />
            &nbsp;cryptolions.io
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
