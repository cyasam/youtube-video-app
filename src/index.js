import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import apiService from './api';
import SearchArea from './components/search-area';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';

import './style/app.scss';

const API_KEY = 'AIzaSyBbBlVrJd5zd6HC-EEahsuDz_40ys2O1EU';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      videos: [],
      term: 'Çağdaş'
    };
  }

  componentWillMount () {
    this.getVideoList();
  }

  getVideoList () {
    apiService({key: API_KEY, term: this.state.term}, (response) => {
      const videos = response.items;
      this.setState({videos});
    });
  }

  setSearchTerm (term) {
    this.setState({term}, () => {
      this.getVideoList();
    });
  }

  render () {
    return (
      <div className="video-app container">
        <SearchArea value={this.state.term} handleInputChange={(term) => this.setSearchTerm(term)} />
        <div className="video-container row">
          <VideoDetail />
          <VideoList videos={this.state.videos} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));