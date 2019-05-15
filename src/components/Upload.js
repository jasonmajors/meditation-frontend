import React from 'react'
import Button from '@material-ui/core/Button';

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.imageRef = React.createRef()
    this.audioRef = React.createRef()

    this.state = {
      audioFile: null,
      imageFile: null,
      uploading: false,
    }
  }

  uploadFiles = () => {
    this.setState({uploading: true});

    let fileData = new FormData();

    fileData.append("image", this.imageRef.current.files[0])
    fileData.append("audio", this.audioRef.current.files[0])

    const uploadUrl = `${process.env.REACT_APP_FILE_UPLOAD_URL}?token=${process.env.REACT_APP_UPLOAD_TOKEN}`;
    fetch(uploadUrl, {
      method: 'POST',
      body: fileData
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.error(error);
    })
  }

  render() {
    return (
      <div>
        <span>Upload Files</span>
        <div>
          <p>Audio file</p>
          <Button>
            <input
              ref={this.audioRef}
              type="file"
              // onChange={e => this.setState({audioFile: e.target.value})}
            />
          </Button>
        </div>
        <div>
          <p>Image</p>
          <Button>
            <input
              ref={this.imageRef}
              type="file"
              // onChange={e => this.setState({imageFile: e.target.value})}
            />
          </Button>
        </div>
        <div>
          <Button
            onClick={this.uploadFiles}
          >
            Upload
          </Button>
        </div>
      </div>
    )
  }
}

export default Upload;
