import React,{Component} from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import Loading from '../loading';
import VideoPlayer from './player';
import VideoDescription from './description';

class VideoDetail extends Component {
  constructor () {
    super();

    this.state = {
      loading: true
    };
  }

  componentWillReceiveProps ({video, channel, loading}) {
    if(Object.keys(video).length && Object.keys(channel).length) {
      this.setState({loading: false});
    } else if(loading !== this.state.loading){
      this.setState({loading: true});
    }
  }

  render () {
    const {video, channel} = this.props;
    let result;

      if (Object.keys(video).length === 0 || Object.keys(channel).length === 0) {
        result = null;
      } else {
        result = (
          <div className="video-detail">
            <VideoPlayer id={video.id}/>

            <h4 className="head">{video.snippet.title}</h4>

            <div className="video-info row">

              <div className="channel-info col-12 col-md-3 col-lg-3">
                <div className="media">
                  <span className="mr-2"><img src={channel.snippet.thumbnails.default.url}
                                              alt={channel.snippet.title}/></span>
                  <span className="media-body">{channel.snippet.title}</span>
                </div>
              </div>

              <div className="view-info col-12 col-md-3 col-lg-3">
                <i className="fa fa-user-o fa-lg mr-2" aria-hidden="true" />
                <NumberFormat value={video.statistics.viewCount}
                              displayType={'text'}
                              thousandSeparator={true} />
              </div>

              <div className="date-info col-12 col-md-3 col-lg-4">
                <i className="fa fa-calendar-o fa-lg mr-2" aria-hidden="true"/>
                    {moment(video.snippet.publishedAt).format("DD.MM.YYYY, HH:mm")}
              </div>

            </div>
            <VideoDescription value={video.snippet.description}/>
          </div>
        );
      }

    return (
      <div className="video-detail-wrapper col-lg-8 col-md-12">
        {this.state.loading &&
        <Loading/>
        }
        {result}
      </div>
    );
  }
}

export default VideoDetail;