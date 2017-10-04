import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import {API_KEY,API_MAX_RESULT} from './config';
import {youtubeApiSearchService as SearchService} from './api';
import SearchArea from './components/search-area';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';

import './style/app.scss';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      term: 'Vevo',
      videoId: '',
      videos: [],
      pageTokens: {
        nextToken: '',
        prevToken: ''
      },
      maxResults: API_MAX_RESULT
    };

    this.getVideoList = debounce(this.getVideoList, 500);
  }

  componentWillMount () {
    this.getVideoList();
  }

  getVideoList () {
    SearchService({key: API_KEY, term: this.state.term, maxResults: this.state.maxResults}, (response) => {
      const videos = response.items;
      this.setState({videos});

      this.createPageToken(response);

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

  createPageToken (response) {
    this.setState({
      pageTokens: {
        nextToken: response.nextPageToken,
        prevToken: response.prevPageToken
      }
    })
  }

  handlePagerToken (token) {
    SearchService({key: API_KEY, term: this.state.term, pageToken: token, maxResults: this.state.maxResults}, (response) => {
      const videos = response.items;
      this.setState({videos});

      this.createPageToken(response);

      if(Object.keys(videos).length > 0) {
        this.initVideoDetail(videos[0]);
      }
    });
  }

  render () {
    return (
      <div className="video-app container">
        <SearchArea value={this.state.term}
                    handleInputChange={(term) => this.setSearchTerm(term)} />
        <div className="video-container row">
          <VideoDetail videoId={this.state.videoId} />
          <VideoList videos={this.state.videos}
                     maxResults={this.state.maxResults}
                     pageTokens={this.state.pageTokens}
                     handlePagerToken={(pager) => this.handlePagerToken(pager)}
                     handleVideoId={(id) => this.handleVideoId(id)} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));