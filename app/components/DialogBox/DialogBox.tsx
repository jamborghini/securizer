import React, { createRef, RefObject } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';

export const myRef: RefObject<HTMLButtonElement> = createRef();

export default function DialogBox() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button hidden ref={myRef} type="button" onClick={handleClickOpen}>
        Open alert dialog
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        transitionDuration={{ enter: 3, exit: 3 }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Error!</DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="body1"
            component="span"
            id="alert-dialog-description"
          >
            Probably tried to decrypt/encrypt a file which is already
            decrypted/encrypted or tried to write/read to a directory which
            needs admin privileges.
            <Divider />
            <i style={{ color: '#ff6363' }}>
              Important: The name of the encrypted or decrypted files must start
              with &quot;encrypted&quot; or &quot;decrypted&quot; in order this
              tool to recognize them.
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
