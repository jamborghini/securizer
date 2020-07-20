import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { Component, RefObject } from 'react';
import { encryption } from '../../Functions/EncDecFunc';

class Encrypt extends Component<unknown, { files: File[] }> {
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
        <DropzoneArea
          acceptedFiles={['.zip']}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={this.handleChange.bind(this)}
          clearOnUnmount={false}
          showPreviewsInDropzone
          dropzoneProps={{ multiple: false }}
          showFileNames
          maxFileSize={1000000000}
          alertSnackbarProps={{
            color: 'secondary',
            anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          }}
          dropzoneText="Drag &amp; drop the zip files to be encrypted here or click here to browse it..."
          showAlerts
          filesLimit={20}
        />
        <Button
          fullWidth
          onClick={() => {
            files.forEach((file) => {
              encryption(file.path, file.name);
            });
          }}
          variant="contained"
          style={{ backgroundColor: '#ffae00' }}
          color="secondary"
        >
          ENCRYPT FILES
        </Button>
      </>
    );
  }
}

export class ElementToCreate extends Component<
  unknown,
  { fileNameRef: RefObject<HTMLParagraphElement> }
> {
  constructor(props) {
    super(props);
    this.state = { fileNameRef: React.createRef() };
  }

  componentDidMount() {
    const { fileNameRef } = this.state;
    if (fileNameRef.current) {
      fileNameRef.current.innerText = '';
      fileNameRef.current.innerText =
        fileNameRef.current?.parentElement?.parentElement?.parentElement?.textContent;
    }
  }

  render() {
    const { fileNameRef } = this.state;
    return (
      <Card
        elevation={9}
        raised
        style={{ maxWidth: 325, backgroundColor: '#242424' }}
      >
        <CardActionArea>
          <CardMedia
            style={{ margin: 'auto' }}
            className="media"
            component="img"
            image="assets/zip.png"
            title="test"
          />
          <hr style={{ margin: 0 }} />
        </CardActionArea>
        <CardActions
          style={{
            display: 'block',
            backgroundColor: '#808080',
            color: 'white',
          }}
        >
          <Typography ref={fileNameRef} component="p">
            card header
          </Typography>
        </CardActions>
      </Card>
    );
  }
}

export default Encrypt;
