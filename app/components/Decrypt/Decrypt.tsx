import { Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { Component } from 'react';
import { decryption } from '../../Functions/EncDecFunc';
import DialogBox from '../DialogBox/DialogBox';

class Decrypt extends Component<unknown, { files: File[] }> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      files: [],
    };
  }

  handleChange(files: File[]) {
    this.setState({ files });
  }

  render() {
    const { files } = this.state;
    return (
      <>
        <DialogBox />
        <DropzoneArea
          acceptedFiles={['.zip']}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={this.handleChange.bind(this)}
          clearOnUnmount={false}
          showPreviewsInDropzone
          showFileNames
          maxFileSize={1000000000}
          alertSnackbarProps={{
            color: 'secondary',
            anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          }}
          dropzoneText="Drag &amp; drop the encrypted zip files here or click here to browse it..."
          showAlerts
          filesLimit={20}
        />
        <Button
          fullWidth
          onClick={() => {
            files.forEach((file) => {
              decryption(file.path);
            });
          }}
          variant="contained"
          style={{ backgroundColor: '#ffae00' }}
          color="secondary"
        >
          DECRYPT FILES
        </Button>
      </>
    );
  }
}

export default Decrypt;
