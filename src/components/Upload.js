import React from 'react'
import Button from '@material-ui/core/Button';

class Upload extends React.Component {
  constructor(props) {
    super(props)
    // TODO: If we want the inputs to be dynamic from a parent component,
    // we'd have to create these dynamically from a Collection prop or something
    this.imageRef = React.createRef()
    this.audioRef = React.createRef()
  }

  uploadFiles = () => {
    this.props.onUploadStart()

    const fileData = new FormData();

    const imageFile = this.imageRef.current.files[0];
    const audioFile = this.audioRef.current.files[0];
    // TODO: Could make this component more dynamic and take these keys from a parent componet via a prop
    fileData.append("image", imageFile)
    fileData.append("audio", audioFile)

    this.makeUploadRequest(fileData)
      .then(data => {
        if (!data.error) {
          console.log('success')
          const urls = this.parseResponse(data, imageFile, audioFile)
          this.props.onUploadFinish(urls)
        } else {
          this.props.onUploadError(data.error)
        }
      })
      .catch(error => this.props.onUploadError(error));
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
    // Will send it to the API and have the API send it to the upload service
    const uploadUrl = `${process.env.REACT_APP_API_URL}/media`
    const response = await fetch(uploadUrl, {method: 'POST', credentials: 'include', body: fileData});

    return response.json();
  }

  // TODO: Could dynamically render the inputs based off of a prop
  // that way we could reuse this component for uploading various files
  // however, this is overkill for now.
  render() {
    return (
      <div>
        <div>
          <h2>Upload Files</h2>
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
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.uploadFiles}>
            Upload
          </Button>
        </div>
      </div>
    )
  }
}

export default Upload;
