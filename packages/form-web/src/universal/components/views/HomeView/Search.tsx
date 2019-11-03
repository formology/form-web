import React from 'react';
import styled from '@emotion/styled';

const StyledSearch = styled.div({
  display: 'flex',
  justifyContent: 'center',
  padding: 22,
});

const SearchBar = styled.input({
  '&:focus': {
    boxShadow: '0 1px 6px 0 rgba(32,33,36,0.28)',
  },
  border: '1px solid #dfe1e5',
  borderRadius: 21,
  padding: '16px 30px',
  width: 490,
});

const Search = () => {
  return (
    <StyledSearch>
      <SearchBar
        placeholder="Search something..."
      />
    </StyledSearch>
  );
};

export default Search;
