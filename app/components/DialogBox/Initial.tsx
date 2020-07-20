import {
  Divider,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { createRef, RefObject } from 'react';
import { BackgroundColor } from 'chalk';

export const myRef: RefObject<HTMLButtonElement> = createRef();

export default function Initial() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        PaperProps={{ style: { backgroundColor: '#2b2b2b', color: 'white' } }}
        open={
          localStorage.getItem('initialLoad') === JSON.stringify(true)
            ? false
            : open
        }
        onClose={handleClose}
        fullScreen
        transitionDuration={{ enter: 1000, exit: 1000 }}
      >
        <DialogTitle
          style={{ backgroundColor: '#444444' }}
          id="alert-dialog-title"
        >
          Welcome to Securizer!
        </DialogTitle>
        <DialogContent>
          <h4>
            Securizer is a tool that encrypts ZIP files with your SSH Public Key
            which helps you to share your files with your friends in a more
            secure way. And it supports multiple file input which means you can
            encrypt or decrypt your files all at once and not one by one like
            you usually do in CLI.
          </h4>
          <hr />
          <h5>
            How this works? It first encrypts your files with AES-256 algorithm
            in CTR mode, sets password as randomly generated alphanumeric
            characters then encryptes the randomly generated password with your
            SSH Public Key so even you won&apos;t be able to decrypt it. (Unless
            you have the SSH Private Key of the person to whom you want to
            send).
          </h5>
          <hr />
          <DialogContentText
            variant="body1"
            component="span"
            id="alert-dialog-description"
          >
            <span
              style={{
                height: '25px',
                width: '150px',
                backgroundColor: '#77ff77',
                borderRadius: '25px',
                padding: '5px',
                display: 'table',
                marginBottom: '10px',
              }}
            >
              Do.
            </span>
            <span
              style={{
                height: '25px',
                width: '150px',
                backgroundColor: '#fbdf0a',
                borderRadius: '25px',
                padding: '5px',
                display: 'table',
                marginBottom: '10px',
              }}
            >
              Do with precautions!
            </span>
            <span
              style={{
                height: '25px',
                width: '150px',
                backgroundColor: '#ff6363',
                borderRadius: '25px',
                padding: '5px',
                display: 'table',
                marginBottom: '10px',
              }}
            >
              Don&apos;t do!
            </span>
            <List component="ul">
              <i style={{ color: 'white', textDecoration: 'underline' }}>
                Do&apos;s and Don&apos;ts:
              </i>
              <ListItem style={{ color: '#77ff77' }}>
                Drop encrypted files to Decryption section.
              </ListItem>
              <ListItem style={{ color: '#77ff77' }}>
                Drop files to be encrypted to Encryption section.
              </ListItem>
              <ListItem style={{ color: '#77ff77' }}>
                Drop files to be decrypted to Decryption section.
              </ListItem>
              <ListItem style={{ color: '#77ff77' }}>
                Generate your key pairs with OpenSSL
              </ListItem>
              <ListItem style={{ color: '#fbdf0a' }}>
                Drop the decrypted files to Encryption section (Do this if you
                want to encrypt your decrypted files again, but this is not
                recommended as may encounter such a filename
                &quot;encrypted-encrypted-encrypted-filename.zip&quot;).
              </ListItem>
              <ListItem style={{ color: '#ff6363' }}>
                Drop unencrypted files to Decryption section.
              </ListItem>
              <ListItem style={{ color: '#ff6363' }}>
                Drop undecrypted files to Encryption section.
              </ListItem>
              <ListItem style={{ color: '#ff6363' }}>
                Drop decrypted files to Decryption section.
              </ListItem>
              <ListItem style={{ color: '#ff6363' }}>
                Drop raw zip files either to Encryption or Decryption section.
              </ListItem>
            </List>
            <hr />
            <List component="ul">
              <i style={{ color: 'white', textDecoration: 'underline' }}>
                Known issues and shortcomings:
              </i>
              <ListItem style={{ color: '#b1b1b1' }}>
                Files that you drop into Encryption or Decryption section are
                not preserved, they will disappear when you change the sections.
                So you have to add them again if such a thing happens.
              </ListItem>
            </List>
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    localStorage.setItem('initialLoad', JSON.stringify(true));
                  } else {
                    localStorage.setItem('initialLoad', JSON.stringify(false));
                  }
                }}
                style={{ color: 'white' }}
              />
            }
            label="Don't show this again."
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: 'white', backgroundColor: '#ffae00' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
