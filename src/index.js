import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import {API_KEY,API_MAX_RESULT} from './config';
import {YTApiSearchService,YTApiVideoService,YTApiChannelService} from './api';
import {AnimateScroll} from './utils';
import Loading from './components/loading';
import SearchArea from './components/search-area';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';

import './style/app.scss';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      loadingVideoList: true,
      term: 'Vevo',
      selectedVideo: [],
      videos: [],
      pageTokens: {
        nextToken: null,
        prevToken: null
      },
      selectedChannel:{},
      maxResults: API_MAX_RESULT
    };

    this.handleSearch = debounce(this.handleSearch, 400);
  }

  componentWillMount () {
    this.getVideoList(true);
  }

  handleLoading (loading) {
    this.setState({loading});
  }

  handleSearch (token = null) {
    this.setState({loadingVideoList: true});

    let data = {};
    data.key = API_KEY;
    data.maxResults = this.state.maxResults;
    data.term = this.state.term;
    data.pageToken = token;

    YTApiSearchService(data, (response) => {
      this.makeSearch(response);
    });
  }

  makeSearch (response, firstLoad) {
    const videos = response.items;

    if(videos.length) {
      // Statistics data will add to videos array;
      this.addStatisticsDataToVideoList(videos);

      if (firstLoad) {
        let video = videos[0];

        this.getVideoDetail(video.id.videoId);
        this.handleChannelId(video.snippet.channelId);
      }

      // Page tokens will set to state
      this.createPageToken(response);
    } else {
      this.setState({videos});
    }

    this.setState({loadingVideoList: false});
  }

  getVideoList (firstLoad = false) {
    YTApiSearchService({key: API_KEY, term: this.state.term, maxResults: this.state.maxResults}, (response) => {
      this.setState({videos: response.items});
      this.makeSearch(response, firstLoad);
    });
  }

  addStatisticsDataToVideoList (videos) {
    videos.map((video) => {
      let id = video.id.videoId;
      YTApiVideoService({key: API_KEY, id}, (response) => {
        let {statistics} = response.items[0];
        video.statistics = statistics;

        this.setState({videos});
      });
    });
  }

  getVideoDetail (id) {
    YTApiVideoService({key: API_KEY, id}, (response) => {
      const selectedVideo = response.items[0];
      this.setState({selectedVideo});

      this.handleLoading(false);
    });
  }

  initVideoDetail (video) {
    const videoId = video.id.videoId;
    this.setState({videoId});
  }

  setSearchTerm (term) {
    this.setState({loadingVideoList: true});

    this.setState({term}, () => {
      this.handleSearch();
    });
  }

  handleVideoId (videoId) {
    if(videoId !== this.state.selectedVideo.id) {
      this.getVideoDetail(videoId);
    }

    // Window will scroll to top
    const animateScroll = new AnimateScroll();
    animateScroll.scrollToY(0);
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
    this.handleSearch(token);

    const videoListEl = document.querySelectorAll('.video-list-wrapper');

    // Window will scroll to top
    const animateScroll = new AnimateScroll();
    animateScroll.scrollToY(videoListEl[0].offsetTop);
  }

  handleChannelId (channelId) {
    YTApiChannelService({key: API_KEY, channelId: channelId}, (response) => {
      const selectedChannel = response.items[0];
      this.setState({selectedChannel});
    });
  }

  render () {
    let container;

    container = (
      <div className="video-container-inner row">
        <VideoDetail video={this.state.selectedVideo}
                     channel={this.state.selectedChannel} />
        <VideoList videos={this.state.videos}
                   maxResults={this.state.maxResults}
                   pageTokens={this.state.pageTokens}
                   selectedVideoId = {this.state.selectedVideo.id}
                   handlePagerToken={(pager) => this.handlePagerToken(pager)}
                   handleChannelId={(channelId) => this.handleChannelId(channelId)}
                   handleVideoId={(id) => this.handleVideoId(id)}
                   loading={this.state.loadingVideoList}/>
      </div>
    );

    return (
      <div className="video-app container">
        { this.state.loading === true && (
          <Loading />
        )}
        <div className={(this.state.loading ? ' hide' : '')}>
          <SearchArea value={this.state.term}
                      handleInputChange={(term) => this.setSearchTerm(term)} />
          <div className="video-container">
            {container}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));