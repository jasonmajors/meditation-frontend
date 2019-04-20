import React from 'react'
import Button from '@material-ui/core/Button';

class Upload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
      uploading: false,
    }
  }

  addFile = (e) => {
    const files = this.state.files.concat(e.target.value);
    this.setState({files: files});
  }

  uploadFiles = () => {
    this.setState({uploading: true});

    const files = this.state.files;
    const fileData = new FormData();

    files.forEach((file, i) => {
      fileData.append(i, file);
    });
    const uploadUrl = process.env.REACT_APP_FILE_UPLOAD_URL;
    // Make the request
    fetch(uploadUrl, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: fileData
    }).then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <div>
        <span>Upload Files</span>
        <div>
          <p>Audio file</p>
          <Button>
            <input type="file" />
          </Button>
        </div>
        <div>
          <p>Image</p>
          <Button>
            <input
              type="file"
              onChange={this.addFile}
            />
          </Button>
        </div>
      </div>
    )
  }
}

export default Upload;
