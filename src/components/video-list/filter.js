import React from 'react';

const VideoFilter = (props) => {
  return (
    <div className="video-filter">
      <button className="btn btn-outline-secondary btn-sm"
              onClick={() => props.handleFilter('viewCount')}>Most Watched</button>
      <button className="btn btn-outline-secondary btn-sm"
              onClick={() => props.handleFilter('date')}>Newest</button>
    </div>
  );
};

export default VideoFilter;