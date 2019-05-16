import React from 'react'
import Button from '@material-ui/core/Button';

class Upload extends React.Component {
  constructor(props) {
    super(props)
    // TODO: If we want the inputs to be dynamic from a parent component,
    // we'd have to create these dynamically from a Collection prop or something
    this.imageRef = React.createRef()
    this.audioRef = React.createRef()

    this.state = {
      uploading: false,
    }
  }

  uploadFiles = () => {
    this.setState({uploading: true});

    const fileData = new FormData();

    const imageFile = this.imageRef.current.files[0];
    const audioFile = this.audioRef.current.files[0];
    // TODO: Could make this component more dynamic and take these keys from a parent componet via a prop
    fileData.append("image", imageFile)
    fileData.append("audio", audioFile)

    this.makeUploadRequest(fileData)
      .then(data => {
        const urls = this.parseResponse(data, imageFile, audioFile)
        this.props.onUploaded(urls)
      })
      .catch(error => console.error(error.message));
  }

  parseResponse = (json, imageFile, audioFile) => {
    const imageDownloadURL = json[imageFile.name]
    const audioDownloadURL = json[audioFile.name]

    return {
      "image": imageDownloadURL,
      "audio": audioDownloadURL,
    }
  }

  makeUploadRequest = async (fileData) => {
    const uploadUrl = `${process.env.REACT_APP_FILE_UPLOAD_URL}?token=${process.env.REACT_APP_UPLOAD_TOKEN}`;
    const response = await fetch(uploadUrl, {method: 'POST', body: fileData});

    return await response.json();
  }

  // TODO: Could dynamically render the inputs based off of a prop
  // that way we could reuse this component for uploading various files
  // however, this is overkill for now.
  render() {
    return (
      <div>
        <span>Upload Files</span>
        <div>
          <p>Audio file</p>
          <Button>
            <input ref={this.audioRef} type="file"
            />
          </Button>
        </div>
        <div>
          <p>Image</p>
          <Button>
            <input ref={this.imageRef} type="file" />
          </Button>
        </div>
        <div>
          <Button onClick={this.uploadFiles}>
            Upload
          </Button>
        </div>
      </div>
    )
  }
}

export default Upload;
