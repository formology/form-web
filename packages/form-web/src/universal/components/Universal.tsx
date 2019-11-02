import {
  Switch,
  Route,
  // useParams,
} from 'react-router-dom';
import { compose } from 'redux';
import { css, Global } from '@emotion/core';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import styled from '@emotion/styled';

import DocPage from '@@src/universal/components/pages/DocPage/DocPage';
import ErrorBoundary from '@@src/universal/components/app/Error/ErrorBoundary';
import HomePage from '@@src/universal/components/pages/HomePage/HomePage';
import normalize from '@@src/universal/styles/normalize';

const normalizeStyle = css`
  ${normalize}
`;

const customStyle = css({
  '*': {
    color: 'black',
  },
  body: {
    border: '1px solid black',
  },
  input: {
    border: 'none',
    outline: 'none',
  },
});

const StyledUniversal = styled.div({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
});

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// <FontAwesomeIcon icon={faCoffee} />

const Universal: React.FC<any> = () => {
  return (
    <StyledUniversal>
      <ErrorBoundary>
        <Global
          styles={normalizeStyle}
        />
        <Global
          styles={customStyle}
        />
        <Switch>
          <Route
            component={DocPage}
            path="/:namespace/:docName"
          />
          <Route component={HomePage} />
        </Switch>
      </ErrorBoundary>
    </StyledUniversal>
  );
};

export default compose(
  hot,
)(Universal);

declare global {
  interface Window {
    Nadan;
  }
}
