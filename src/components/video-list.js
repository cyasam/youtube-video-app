import React from 'react';
import VideoItem from './video-item';

const VideoList = ({videos}) => {
  return (
    <ul className="col-md-4 list-group">
      {videos.map((item, i) => (
        <li key={i} className="list-group-item"><VideoItem video={item.snippet} /></li>
      ))}
    </ul>
  );
};

export default VideoList;