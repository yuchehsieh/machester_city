import React, { Component } from 'react';

import { firebase } from '../../firebase';
import FileUplodaer from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';
import { throws } from 'assert';

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

  handleUploadStart() {
    this.setState({ isUploading: true });
  }

  handleUploadError() {
    this.setState({
      isUploading: false
    });
  }

  handleUploadSuccess(filename) {
    this.setState({
      name: filename,
      isUploading: false
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          fileURL: url
        });
      })
      .catch(error => console.log(error));

    this.props.filename(filename);
  }

  uploadAgain() {
    this.setState({
      name: '',
      isUploading: false,
      fileURL: ''
    });
    this.props.resetImage();
  }

  render() {
    return (
      <div>
        {!this.state.fileURL ? (
          <div>
            <div className="label_inputs">{this.props.tag}</div>
            <FileUplodaer
              accept="image/*" // accept all kind of image
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart.bind(this)}
              onUploadError={this.handleUploadError.bind(this)}
              onUploadSuccess={this.handleUploadSuccess.bind(this)}
            />
          </div>
        ) : null}
        {this.state.isUploading ? (
          <div
            className="progress"
            style={{ textAlign: 'center', margin: '30px 0px' }}
          >
            <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
          </div>
        ) : null}
        {this.state.fileURL ? (
          <div className="image_upload_container">
            <img
              style={{
                width: '100%'
              }}
              src={this.state.fileURL}
              alt={this.state.filename}
            />
            <div className="remove" onClick={() => this.uploadAgain()}>
              Remove
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
