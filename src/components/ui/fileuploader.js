import React, { Component } from 'react';

import { firebase } from '../../firebase';
import FileUplodaer from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileuploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isUploading: false,
      fileURL: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.defaultImg) {
      return (prevState = {
        name: nextProps.defaultImgName,
        fileURL: nextProps.defaultImg
      });
    }

    return null;
  }

  render() {
    return (
      <div>
        {!this.state.fileURL ? (
          <div>
            <div className="label_inputs">{this.props.tag}</div>
            <FileUplodaer
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              inUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
