import React, { useState } from 'react';
import "../Pages/style.css";

const SearchBar = ({searchMethod, responseHandler}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleClick = () => {
        searchMethod(searchQuery)
        .then(result => responseHandler(result))
    }

    const handleChange = (event) => {
        setSearchQuery(event.target.value)
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type='text'
            placeholder='Search'
            onChange={handleChange}
            className='searchText'
          />
          <button className='searchSubmit' type='button' onClick={handleClick}>
            Search
          </button>
        </div>
      );
}
export default SearchBar;