import React from 'react';
import styled from '@emotion/styled';

const StyledSearch = styled.div({
  display: 'flex',
  justifyContent: 'center',
  padding: 12,
});

const SearchBar = styled.input({
  backgroundColor: '#ececec',
  borderRadius: 3,
  padding: 10,
  width: 490,
});

const Search = () => {
  return (
    <StyledSearch>
      <SearchBar
        placeholder="Search something"
      />
    </StyledSearch>
  );
};

export default Search;
