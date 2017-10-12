import React from 'react';

const VideoOrder = (props) => {
  return (
    <div className="video-order">
      <button className={"btn btn-outline-secondary btn-sm" + (props.order === 'viewCount' ? ' active' : '')}
              onClick={() => props.handleOrder('viewCount')}>Most Watched</button>
      <button className={"btn btn-outline-secondary btn-sm" + (props.order === 'date' ? ' active' : '')}
              onClick={() => props.handleOrder('date')}>Newest</button>
    </div>
  );
};

export default VideoOrder;