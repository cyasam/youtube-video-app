import React, {Component} from 'react';
import VideoItem from './video-item';

class VideoList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      prevToken: '',
      nextToken: '',
      maxResults: this.props.maxResults
    };
  }

  componentWillReceiveProps (nextProps) {
    const prevToken = nextProps.pageTokens.prevToken || '';
    const nextToken = nextProps.pageTokens.nextToken || '';
    const maxResults = Number(nextProps.maxResults);

    this.setState({
      prevToken, nextToken, maxResults
    })
  }

  handleVideoId (id) {
    this.props.handleVideoId(id);
  }

  handlePagerToken (token) {
    this.props.handlePagerToken(token);
  }

  render () {
    let result;

    if(this.props.videos.length > 0) {
      result = (
        <div className="video-list">
          <ul className="list-group">
            {this.props.videos.map((item, i) => (
              <li key={i} className="list-group-item"
                  onClick={() => this.handleVideoId(item.id.videoId)}>
                <VideoItem video={item.snippet}/>
              </li>
            ))}
          </ul>
          <div className="pager">
            <button type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => this.handlePagerToken(this.state.prevToken)}
                    disabled={this.state.prevToken.length === 0}>Prev</button>
            <button type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => this.handlePagerToken(this.state.nextToken)}
                    disabled={this.state.nextToken.length === 0 || this.props.videos.length < this.state.maxResults}>Next</button>
          </div>
        </div>
      )
    } else {
      result = <div>No videos found...</div>;
    }

    return (
      <div className="col-md-4">
        {result}
      </div>
    );
  }
}

export default VideoList;