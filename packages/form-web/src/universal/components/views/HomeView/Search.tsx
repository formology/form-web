import React from 'react';
import styled from '@emotion/styled';

const StyledSearch = styled.div({
  border: '1px solid gray',
  display: 'flex',
  justifyContent: 'center',
  padding: 12,
});

const Logo = styled.div({
  border: '1px solid blue',
  width: 80,
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
      <Logo>LOGO</Logo>
      <SearchBar
        placeholder="Search something"
      />
    </StyledSearch>
  );
};

export default Search;
