import React from 'react';

const VideoItem = ({video}) => {
  return (
    <div className="video-item media">
      <div className="media-left">
        <img className="d-flex mr-3"
             src={video.thumbnails.default.url}
             width={video.thumbnails.default.width}
             height={video.thumbnails.default.height}
             alt={video.title} />
      </div>
      <div className="media-body">
        <div className="media-heading">{video.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;