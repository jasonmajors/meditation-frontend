import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const MEDITATION_QUERY = gql`
  query MeditationQuery($id: ID!) {
    meditation(id: $id) {
      id
      title
      description
      img_url
      audio_url
    }
  }
`;

class Meditation extends React.Component {
  render() {
    const meditationId = this.props.match.params.meditation
    console.log(meditationId)

    return (
      <div>
        <Query query={MEDITATION_QUERY} variables={{ id: meditationId }}>
          {
            ({loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const meditation = data.meditation;
              console.log(meditation)
              return (
                <div>Hello</div>
              )
            }
          }
        </Query>
      </div>
    )
  }
}

export default Meditation
