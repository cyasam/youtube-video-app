import React, {Component} from 'react';

class SearchArea extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="form-group">
        <input className="form-control"
               onChange={(event) => this.props.handleInputChange(event.target.value)}
               value={this.props.value}/>
      </div>
    );
  }
}

export default SearchArea;