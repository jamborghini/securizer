import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import Private from './Private';
import Public from './Public';
import Initial from '../DialogBox/Initial';
import GenRSA, { myRef } from '../DialogBox/GenRSA';
import { execSync } from 'child_process';
import { shell } from 'electron';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: 'gray',
    },
  })
);

export default function FullWidthGrid() {
  const classes = useStyles();
  const openURL = () => {
    switch (process.platform) {
      case 'linux':
        execSync(
          'xdg-open https://www.openssl.org/docs/man1.0.2/man1/openssl-genrsa.html'
        );
        break;
      case 'win32':
        execSync(
          'start https://www.openssl.org/docs/man1.0.2/man1/openssl-genrsa.html'
        );
        break;

      default:
        shell.openExternal(
          'https://www.openssl.org/docs/man1.0.2/man1/openssl-genrsa.html'
        );
        break;
    }
  };

  return (
    <>
      <Initial />
      <GenRSA />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Public />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Private />
            </Paper>
          </Grid>
          <Grid container justify="center" style={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={5}>
              <Paper
                style={{
                  borderColor: 'red',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                className={classes.paper}
              >
                Current Public key:{' '}
                <i style={{ color: '#dddddd' }}>
                  {localStorage.getItem('publicLocation') != null
                    ? localStorage
                        .getItem('publicLocation')
                        .substr(
                          localStorage
                            .getItem('publicLocation')
                            .lastIndexOf('/') + 1
                        )
                    : ' No public key found'}
                </i>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                className={classes.paper}
              >
                Current Public key:{' '}
                <i style={{ color: '#dddddd' }}>
                  {localStorage.getItem('privateLocation') != null
                    ? localStorage
                        .getItem('privateLocation')
                        .substr(
                          localStorage
                            .getItem('privateLocation')
                            .lastIndexOf('/') + 1
                        )
                    : ' No private key found'}
                </i>
              </Paper>
            </Grid>
            <Typography
              variant="body1"
              style={{
                color: '#ffc235',
                fontStyle: 'italic',
              }}
            >
              Top Priority: For security reasons and this tool to work properly,
              you must generate your SSH Public Keys using{' '}
              <i
                style={{
                  color: '#2682c5',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  openURL();
                }}
              >
                OpenSSL
              </i>{' '}
              with the options{' '}
              <i style={{ color: 'white' }}>-passout arg = des3</i> and{' '}
              <i style={{ color: 'white' }}>numbits = 2048</i>. If you
              don&apos;t know how to do or what to do{' '}
              <i
                style={{
                  color: '#ff6666',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  myRef.current.click();
                }}
              >
                click here
              </i>
              .
            </Typography>
          </Grid>
          <Typography
            variant="body1"
            style={{
              color: '#3ca776',
              fontStyle: 'italic',
              textDecoration: 'underline',
              marginTop: '40%',
            }}
          >
            Pro Tip: If you want to choose different keys than previous ones,
            all you have to do is press the buttons above, select new keys and
            save the files.
          </Typography>
        </Grid>
      </div>
    </>
  );
}
