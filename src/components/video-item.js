import React from 'react';

const VideoItem = ({video}) => {
  return (
    <div className="video-item row">
      <div className="col-md-4">
        <img src={video.thumbnails.default.url}
             width={video.thumbnails.default.width}
             height={video.thumbnails.default.height}
             alt={video.title} />
      </div>
      <div className="col-md-8">
        <h6>{video.title}</h6>
      </div>
    </div>
  );
};

export default VideoItem;