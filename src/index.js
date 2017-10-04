import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import {API_KEY,API_MAX_RESULT} from './config';
import {YTApiSearchService as SearchService,YTApiVideoService as VideoService} from './api';
import SearchArea from './components/search-area';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';

import './style/app.scss';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      term: 'Vevo',
      selectedVideo: [],
      videos: [],
      pageTokens: {
        nextToken: null,
        prevToken: null
      },
      maxResults: API_MAX_RESULT
    };

    this.getVideoList = debounce(this.getVideoList, 400);
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
        this.getVideoDetail(videos[0].id.videoId);
      }
    });
  }

  getVideoDetail (id) {
    if(id !== this.state.videoId) {
      VideoService({key: API_KEY, id}, (response) => {
        const selectedVideo = response.items[0];
        this.setState({selectedVideo});
      });
    }
  }

  setSearchTerm (term) {
    this.setState({term}, () => {
      this.getVideoList();
    });
  }

  handleVideoId (videoId) {
    this.getVideoDetail(videoId);
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
          <VideoDetail video={this.state.selectedVideo} />
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