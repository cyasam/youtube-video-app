import React, {Component} from 'react';
import VideoItem from './video-item';

class VideoList extends Component {
  constructor (props) {
    super(props);
  }

  handleVideoId (id) {
    this.props.handleVideoId(id);
  }

  render () {

    let result;

    if(this.props.videos.length > 0) {
      result = (
        <ul className="list-group">
          {this.props.videos.map((item, i) => (
            <li key={i} className="list-group-item"
                onClick={() => this.handleVideoId(item.id.videoId)}>
              <VideoItem video={item.snippet}/>
            </li>
          ))}
        </ul>
      )
    } else {
      result = <div>No videos found...</div>;
    }

    return (
      <div className="video-list col-md-4">
        {result}
      </div>
    );
  }
}

export default VideoList;