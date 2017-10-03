import React,{Component} from 'react';
import {API_KEY} from '../config';
import {youtubeApiVideoService as VideoService} from '../api';

class VideoDetail extends Component {
  constructor (props) {
    super(props);

    this.state = {
      videoId: '',
      videoDetail: {}
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({videoId: nextProps.videoId});
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
    console.log(videoDetail);
    return (
      <div className="col-md-8">
        { Object.keys(videoDetail).length > 0 && (
          <div className="video-detail">
            <iframe id="player" src={"https://www.youtube.com/embed/" + this.state.videoId}></iframe>
            <h3>{videoDetail.snippet.title}</h3>
          </div>
        )}
      </div>
    );
  }
}

export default VideoDetail;