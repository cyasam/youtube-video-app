import React from 'react';

const VideoPlayer = (props) => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="embed-responsive-item" src={"https://www.youtube.com/embed/" + props.id} allowFullScreen />
    </div>
  );
};

export default VideoPlayer;