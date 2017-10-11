import React from 'react';

const VideoOrder = (props) => {
  return (
    <div className="video-order">
      <button className="btn btn-outline-secondary btn-sm"
              onClick={() => props.handleOrder('viewCount')}>Most Watched</button>
      <button className="btn btn-outline-secondary btn-sm"
              onClick={() => props.handleOrder('date')}>Newest</button>
    </div>
  );
};

export default VideoOrder;