import React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import VideoPlayer from './player';
import VideoDescription from './description';

const VideoDetail = (props) => {
  const {video, channel} = props;
  let result;

  if(video.length === 0 || Object.keys(channel).length === 0){
    result = null;
  } else {
    result = (
      <div className="video-detail">
        <VideoPlayer id={video.id} />

        <h4 className="head">{video.snippet.title}</h4>

        <div className="video-info">

          <span className="channel-info media mr-4">
            <span className="mr-2"><img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} /></span>
            <span className="media-body">{channel.snippet.title}</span>
          </span>

          <span className="view-info mr-4">
            <i className="fa fa-user-o fa-lg mr-2" aria-hidden="true" />
            <NumberFormat value={video.statistics.viewCount}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={' views'} />
          </span>

          <span className="date-info">
            <i class="fa fa-calendar-o fa-lg mr-2" aria-hidden="true" />
            {moment(video.snippet.publishedAt).format("dddd, MMMM Do YYYY, HH:mm")}
          </span>

        </div>
        <VideoDescription value={video.snippet.description} />
      </div>
    );
  }

  return (
    <div className="video-detail-wrapper col-lg-8 col-md-12">
      {result}
    </div>
  );
};

export default VideoDetail;