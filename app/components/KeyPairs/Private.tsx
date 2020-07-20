/* eslint-disable react/jsx-props-no-spreading */
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Save, Folder as FolderIcon } from '@material-ui/icons/';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function KeyPairs() {
  const [files, setFiles] = useState([]);
  const Files = files.map((file) => (
    <div key={file.name}>
      <ListItem style={{ color: 'white' }}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={file.name}
          secondary={file.path}
          secondaryTypographyProps={{ style: { color: '#eeeeee' } }}
        />
        <ListItemSecondaryAction>
          <IconButton
            style={{
              color: 'white',
              backgroundColor: '#bdbdbd',
              transition: '.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
            onClick={() => {
              localStorage.setItem('privateLocation', files[0].path);
            }}
          >
            <Save />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </div>
  ));
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pem',
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button
          color="secondary"
          style={{ backgroundColor: '#ffae00' }}
          variant="contained"
        >
          Drop your Private key here
        </Button>
      </div>
      <div>
        <Grid style={{ color: 'white' }}>
          <List>{Files}</List>
        </Grid>
      </div>
    </div>
  );
}

export default KeyPairs;
