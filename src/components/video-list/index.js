import React,{Component} from 'react';
import Loading from '../loading';
import VideoItem from './item';

class VideoList extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      videos: []
    };
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.loading !== this.state.loading) {
      this.setState({loading: true});
    }
  }

  handleImageLoad (loading) {
    this.setState({loading});
  }

  render () {
    let result;

    const {videos, selectedVideoId, pageTokens, maxResults, handleVideoId, handleChannelId, handlePagerToken} = this.props;
    const {nextToken, prevToken} = pageTokens;

    if (videos.length) {
      result = (
        <div className="video-list">
          {this.state.loading === true && (
          <Loading/>
          )}
          <ul className={"list-group" + (this.state.loading ? ' hide' : '')}>
            {videos.map((item, i) => (
              <li key={i} className={"list-group-item" + (item.id.videoId === selectedVideoId ? ' active' : '')}
                  onClick={() => {
                    handleVideoId(item.id.videoId);
                    handleChannelId(item.snippet.channelId);
                  }}>
                <VideoItem video={item} handleImageLoad={(imageLoading) => this.handleImageLoad(imageLoading)}/>
              </li>
            ))}
          </ul>

          <div className={"pager" + (this.state.loading ? ' hide' : '')}>
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

    return (
      <div className="video-list-wrapper col-lg-4 col-md-12">
        {result}
      </div>
    );
  }
};

export default VideoList;