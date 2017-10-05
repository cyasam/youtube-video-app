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

    this.getVideoList = debounce(this.getVideoList, 400);
  }

  componentWillMount () {
    this.getVideoList();
  }

  handleLoading (loading) {
    this.setState({loading});
  }

  makeSearch (response) {
    const videos = response.items;

    // Statistics data will add to videos array;
    this.addStatisticsDataToVideoList(videos);

    let video = videos[0];

    this.getVideoDetail(video.id.videoId);
    this.handleChannelId(video.snippet.channelId);

    // Page tokens will set to state
    this.createPageToken(response);
  }

  getVideoList () {
    this.handleLoading(true);

    YTApiSearchService({key: API_KEY, term: this.state.term, maxResults: this.state.maxResults}, (response) => {
      this.setState({videos: response.items});

      if(Object.keys(response.items).length > 0) {
        this.makeSearch(response);
      } else {
        this.handleLoading(false);
      }
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
    if(id !== this.state.videoId) {
      YTApiVideoService({key: API_KEY, id}, (response) => {
        const selectedVideo = response.items[0];
        this.setState({selectedVideo});

        this.handleLoading(false);
      });
    }
  }

  initVideoDetail (video) {
    const videoId = video.id.videoId;
    this.setState({videoId});
  }

  setSearchTerm (term) {
    this.handleLoading(true);

    this.setState({term}, () => {
      this.getVideoList();
    });
  }

  handleVideoId (videoId) {
    this.handleLoading(true);

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
    this.handleLoading(true);

    YTApiSearchService({key: API_KEY, term: this.state.term, pageToken: token, maxResults: this.state.maxResults}, (response) => {
      if(Object.keys(response.items).length > 0) {
        this.makeSearch(response);
      } else {
        this.handleLoading(false);
      }
    });

    // Window will scroll to top
    const animateScroll = new AnimateScroll();
    animateScroll.scrollToY(0);
  }

  handleChannelId (channelId) {
    YTApiChannelService({key: API_KEY, channelId: channelId}, (response) => {
      const selectedChannel = response.items[0];
      this.setState({selectedChannel});
    });
  }

  render () {
    let container;

    if(this.state.loading){
      container = <Loading />;
    } else {
      container = (
        <div className="video-container-inner row">
          <VideoDetail video={this.state.selectedVideo}
                       channel={this.state.selectedChannel} />
          <VideoList videos={this.state.videos}
                     maxResults={this.state.maxResults}
                     pageTokens={this.state.pageTokens}
                     handlePagerToken={(pager) => this.handlePagerToken(pager)}
                     handleChannelId={(channelId) => this.handleChannelId(channelId)}
                     handleVideoId={(id) => this.handleVideoId(id)} />
        </div>
      );
    }
    return (
      <div className="video-app container">
        <SearchArea value={this.state.term}
                    handleInputChange={(term) => this.setSearchTerm(term)} />
        <div className="video-container">
          {container}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));