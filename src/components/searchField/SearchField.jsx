import React, { useState } from 'react';
import style from './SearchField.module.scss'
import SvgIcon from '../../icon/SvgIcon';

const SearchField = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm); 
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };
    
    
  return (
     <form className={style.searchForm} onSubmit={handleSearchSubmit}>
      <div className={style.inputWrapper}>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className={style.searchInput}
        />
        {searchTerm && (
          <button type="button" className={style.clearButton} onClick={clearSearch}>
            <SvgIcon icon="x" width="20" height="20" />
          </button>
              )}
              
              <button type="submit" className={style.searchButton}>
          <SvgIcon icon="search" width="20" height="20" />
        </button>
      </div>
    </form>
  )
}

export default SearchField
