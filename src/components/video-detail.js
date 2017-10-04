import React,{Component} from 'react';
import {convertToHTML} from '../utils';
import {API_KEY,DESCRIPTION_HEIGHT} from '../config';
import {youtubeApiVideoService as VideoService} from '../api';
import NumberFormat from 'react-number-format';
import AnimateHeight from 'react-animate-height';

class VideoDetail extends Component {
  constructor (props) {
    super(props);

    this.state = {
      videoId: '',
      videoDetail: {},
      descOpen: false,
      descHeight: DESCRIPTION_HEIGHT
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      descOpen: false,
      descHeight: DESCRIPTION_HEIGHT,
      videoId: nextProps.videoId
    });
    this.getVideoDetail(nextProps.videoId);
  }

  componentDidUpdate () {
    let player = document.getElementById('player');
    if(player) {
      this.handleVideoResize(player);
    }
  }

  handleVideoResize (player) {
    let width = player.parentNode.clientWidth;

    player.setAttribute('width', width);
    player.setAttribute('height', width * 0.56);
  }

  getVideoDetail (id) {
    if(id !== this.state.videoId) {
      VideoService({key: API_KEY, id}, (response) => {
        const videoDetail = response.items[0];
        this.setState({videoDetail});
      });
    }
  }

  render () {
    const {videoDetail} = this.state;
    return (
      <div className="col-md-8">
        { Object.keys(videoDetail).length > 0 && (
          <div className="video-detail">
            <iframe id="player" src={"https://www.youtube.com/embed/" + this.state.videoId} />
            <h3 className="head">{videoDetail.snippet.title}</h3>
            <NumberFormat value={videoDetail.statistics.viewCount} displayType={'text'} thousandSeparator={true} suffix={' views'} />
            <AnimateHeight
              className="description"
              duration={ 500 }
              height={ this.state.descHeight }
            >
              <p dangerouslySetInnerHTML={{ __html: convertToHTML(videoDetail.snippet.description)}} />
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
        )}
      </div>
    );
  }
}

export default VideoDetail;