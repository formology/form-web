import React from 'react';
import styled from '@emotion/styled';

const StyledHeader = styled.div({
  border: '1px solid gray',
  display: 'flex',
  justifyContent: 'space-between',
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

const Account = styled.div({
  '& p': {
    cursor: 'pointer',
  },
  '&>p:not(:last-child)': {
    marginRight: 15,
  },
  display: 'flex',
});

const Header = () => {
  return (
    <StyledHeader>
      <Logo>LOGO</Logo>
      <SearchBar
        placeholder="Search something"
      />
      <Account>
        <p>Become a member</p>
        <p>Sign In  </p>
      </Account>
    </StyledHeader>
  );
};

export default Header;
