import React, { createRef, RefObject } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';
import { execSync } from 'child_process';
import { shell } from 'electron';

export const myRef: RefObject<HTMLButtonElement> = createRef();

export default function DialogBox() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openURL = () => {
    switch (process.platform) {
      case 'linux':
        execSync('xdg-open https://git-scm.com/downloads');
        break;
      case 'win32':
        execSync('start https://git-scm.com/downloads');
        break;

      default:
        shell.openExternal('https://git-scm.com/downloads');
        break;
    }
  };

  return (
    <div>
      <button hidden ref={myRef} type="button" onClick={handleClickOpen}>
        {' '}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        transitionDuration={{ enter: 1000, exit: 1000 }}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            variant="body1"
            component="span"
            id="alert-dialog-description"
          >
            <ul>
              <li>
                <span style={{ color: '#ff6666' }}>1. </span>
                openssl genrsa -des3 -out
                {' <your file name>'}
                .pem 2048
              </li>
              <Divider />
              <li>
                <span style={{ color: '#ff6666' }}>2. </span>
                openssl rsa -in
                {' <your file name>'}
                .pem -outform PEM -pubout -out
                {' <your file name>'}
                .pem.pub
              </li>
              <Divider />
              <li>
                <span style={{ color: '#ff6666' }}>3. </span>
                openssl rsa -in
                {' <your file name>'}
                .pem -out
                {' <your file name>'}
                .pem -outform PEM
              </li>
            </ul>
            <Divider />
            <i style={{ color: '#ff6b00' }}>
              Start a new terminal and generate your key pairs by executing the
              codes above in the order numbered above. If you&apos;re on Windows
              start a Git Bash and repeat the same steps. Install Git from{' '}
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
                here
              </i>{' '}
              and make sure to check the &quot;Use the OpenSSL library&quot;
              option.
            </i>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: 'white', backgroundColor: '#ffae00' }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
