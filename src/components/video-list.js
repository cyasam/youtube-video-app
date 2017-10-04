import React, {Component} from 'react';
import VideoItem from './video-item';

class VideoList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentWillReceiveProps (){
    this.setState({loading: false});
  }

  render () {
    let result;

    const {videos,pageTokens,maxResults,handleVideoId,handlePagerToken} = this.props;
    const {nextToken, prevToken} = pageTokens;
    const {loading} = this.state;

    if (loading) {
      result = <div>Loading...</div>;
    } else {
      if (videos.length) {
        result = (
          <div className="video-list">
            <ul className="list-group">
              {videos.map((item, i) => (
                <li key={i} className="list-group-item"
                    onClick={() => handleVideoId(item.id.videoId)}>
                  <VideoItem video={item.snippet}/>
                </li>
              ))}
            </ul>
            <div className="pager">
              <button type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handlePagerToken(prevToken)}
                      disabled={!prevToken}>Prev
              </button>
              <button type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handlePagerToken(nextToken)}
                      disabled={nextToken && nextToken.length === 0 ||
                      videos.length < Number(maxResults)}>Next
              </button>
            </div>
          </div>
        );
      } else {
        result = <div>No videos found...</div>;
      }
    }

    return (
      <div className="col-md-4">
        {result}
      </div>
    );
  }
};

export default VideoList;