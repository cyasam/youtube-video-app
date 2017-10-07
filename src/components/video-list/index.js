import React from 'react';
import VideoItem from './item';

const VideoList = (props) => {
  let result;

  const {videos,pageTokens,maxResults,handleVideoId,handleChannelId,handlePagerToken} = props;
  const {nextToken, prevToken} = pageTokens;

  if (videos.length) {
    result = (
      <div className="video-list">
        <ul className="list-group">
          {videos.map((item, i) => (
            <li key={i} className="list-group-item"
                onClick={() => {
                  handleVideoId(item.id.videoId);
                  handleChannelId(item.snippet.channelId);
                }}>
              <VideoItem video={item}/>
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

  return (
    <div className="video-list-wrapper col-lg-4 col-md-12">
      {result}
    </div>
  );
};

export default VideoList;