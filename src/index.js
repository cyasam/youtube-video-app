import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import {API_KEY} from './config';
import {youtubeApiSearchService as SearchService} from './api';
import SearchArea from './components/search-area';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';

import './style/app.scss';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      term: 'Ahmet Kaya',
      videoId: '',
      videos: []
    };

    this.getVideoList = debounce(this.getVideoList, 500);
  }

  componentWillMount () {
    this.getVideoList();
  }

  getVideoList () {
    SearchService({key: API_KEY, term: this.state.term}, (response) => {
      const videos = response.items;
      this.setState({videos});

      if(Object.keys(videos).length > 0) {
        this.initVideoDetail(videos[0]);
      }
    });
  }

  initVideoDetail (video) {
    const videoId = video.id.videoId;
    this.setState({videoId});
  }

  setSearchTerm (term) {
    this.setState({term}, () => {
      this.getVideoList();
    });
  }

  handleVideoId (videoId) {
    this.setState({videoId});
  }

  render () {
    return (
      <div className="video-app container">
        <SearchArea value={this.state.term}
                    handleInputChange={(term) => this.setSearchTerm(term)} />
        <div className="video-container row">
          <VideoDetail videoId={this.state.videoId} />
          <VideoList videos={this.state.videos} handleVideoId={(id) => this.handleVideoId(id)} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));