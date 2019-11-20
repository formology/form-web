import React from 'react';
import styled from '@emotion/styled';

const StyledLeftBar = styled.div({
  fontFamily: 'bookman',
  fontSize: '26',
  padding: '55px 0 0 42px',
  width: 200,
});

const StyledLeftBarEntry = styled.div({
  paddingBottom: 5,
});

const LeftBarEntry = ({
  handleClickEntry,
  label,
  url,
}) => {
  return (
    <StyledLeftBarEntry
      data-url={url}
      onClick={handleClickEntry}
      role="button"
      tabIndex={0}
    >
      {label}
    </StyledLeftBarEntry>
  );
};

const LeftBar = ({
  handleClickEntry,
}) => {
  return (
    <StyledLeftBar>
      <LeftBarEntry
        handleClickEntry={handleClickEntry}
        label="Home"
        url="/"
      />
      <LeftBarEntry
        handleClickEntry={handleClickEntry}
        label="Documents"
        url="/docs"
      />
    </StyledLeftBar>
  );
};

export default LeftBar;
