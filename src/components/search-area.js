import React from 'react';

const SearchArea = (props) => {
  return (
    <div className="search-area form-group">
      <input className="form-control"
             onChange={(event) => props.handleInputChange(event.target.value)}
             value={props.value}
             placeholder="type something..."/>
    </div>
  );
}

export default SearchArea;