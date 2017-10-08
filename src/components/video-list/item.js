import React from 'react';
import NumberFormat from 'react-number-format';

const VideoItem = ({video}) => {
  if(!video.snippet || !video.statistics) {
    return null;
  }
  return (
    <div className="video-item media">
      <img className="d-flex mr-3"
           src={video.snippet.thumbnails.default.url}
           width={video.snippet.thumbnails.default.width}
           height={video.snippet.thumbnails.default.height}
           alt={video.snippet.title} />
      <div className="media-body">
        <div className="video-title media-heading">{video.snippet.title}</div>
        <div className="channel-name">{video.snippet.channelTitle}</div>
        <NumberFormat className="video-view-number"
                      value={video.statistics.viewCount}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' views'} />
      </div>
    </div>
  );
};

export default VideoItem;