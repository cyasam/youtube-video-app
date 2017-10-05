import React,{Component} from 'react';
import {convertToHTML} from '../utils';
import {DESCRIPTION_HEIGHT} from '../config';
import NumberFormat from 'react-number-format';
import AnimateHeight from 'react-animate-height';

class VideoDetail extends Component {
  constructor (props) {
    super(props);

    this.state = {
      descOpen: false,
      descHeight: DESCRIPTION_HEIGHT
    };
  }

  componentWillMount () {
    this.setState({
      descOpen: false,
      descHeight: DESCRIPTION_HEIGHT
    });
  }

  render () {
    const {video, channel} = this.props;
    let result;

    if(video.length === 0 || Object.keys(channel).length === 0){
      result = null;
    } else {
      result = (
        <div className="video-detail">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={"https://www.youtube.com/embed/" + video.id} allowFullScreen />
          </div>

          <h4 className="head">{video.snippet.title}</h4>
          <div className="video-info">
            <span className="channel-info media mr-4">
              <span className="mr-2"><img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} /></span>
              <span className="media-body">{channel.snippet.title}</span>
            </span>
            <span className="view-info">
              <i className="fa fa-user-o fa-lg mr-2" aria-hidden="true" />
              <NumberFormat value={video.statistics.viewCount}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' views'} />
            </span>
          </div>
          <AnimateHeight
            className="description"
            duration={ 500 }
            height={ this.state.descHeight }
          >
            <p dangerouslySetInnerHTML={{ __html: convertToHTML(video.snippet.description)}} />
          </AnimateHeight>

          {this.state.descOpen !== true &&
          <button className="showmore-btn btn btn-outline-secondary"
                  onClick={() => {
                    if(!this.state.descOpen){
                      this.setState({descHeight: 'auto'});
                    }

                    this.setState({
                      descOpen: !this.state.descOpen
                    });
                  }}
          >Show More...</button>
          }
        </div>
      );
    }

    return (
      <div className="video-detail-wrapper col-md-8">
        {result}
      </div>
    );
  }
}

export default VideoDetail;