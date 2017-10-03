import React, {Component} from 'react';

class SearchArea extends Component {
  constructor (props) {
    super(props);
  }

  handleInputChange (event) {
    this.props.handleInputChange(event.target.value);
  }

  render () {
    return (
      <div className="search-area form-group">
        <input className="form-control"
               onChange={(event) => this.handleInputChange(event)}
               value={this.props.value}
               placeholder="type something..."/>
      </div>
    );
  }
}

export default SearchArea;