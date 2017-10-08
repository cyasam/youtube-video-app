import React,{Component} from 'react';
import {DESCRIPTION_HEIGHT} from '../../config';
import {ConvertToHTML} from '../../utils';
import AnimateHeight from 'react-animate-height';

class VideoDescription extends Component {
  constructor () {
    super();

    this.state = {
      open:false,
      height: DESCRIPTION_HEIGHT
    }
  }
  render () {
    return (
      <div>
        <AnimateHeight
          className="description"
          duration={ 500 }
          height={ this.state.height }
        >
          <p dangerouslySetInnerHTML={{__html: ConvertToHTML(this.props.value)}}/>
        </AnimateHeight>

        {this.state.open !== true &&
        <button className="showmore-btn btn btn-outline-secondary"
                onClick={() => {
                  if (!this.state.open) {
                    this.setState({height: 'auto'});
                  } else {
                    this.setState({height: DESCRIPTION_HEIGHT});
                  }

                  this.setState({open: !this.state.open});
                }}
        >Show More...</button>
        }
      </div>
    );
  }
};

export default VideoDescription;