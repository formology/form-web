import {
  Switch,
  Route,
} from 'react-router-dom';
import { compose } from 'redux';
import { css, Global } from '@emotion/core';
import { hot } from 'react-hot-loader/root';
import React from 'react';

import DocPage from '@@src/universal/components/pages/DocPage/DocPage';
import ErrorBoundary from '@@src/universal/components/app/ErrorBoundary';
import HomePage from '@@src/universal/components/pages/HomePage/HomePage';

// const StyledUniversal = styled.div({
//   '& table': {
//     borderCollapse: 'collapse',
//   },
//   display: 'flex',
//   flexDirection: 'column',
//   fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
//   minHeight: '100%',
//   padding: '25 33',
// });

// const GlobalStyle = createGlobalStyle({
//   '#react-root': {
//     height: '100%',
//     left: 0,
//     overflowY: 'scroll',
//     position: 'absolute',
//     right: 0,
//     top: 0,
//   },
// });

const globalStyle = css({
  '*': {
    color: 'green',
  },
});

const Universal: React.FC<any> = () => {
  return (
    <ErrorBoundary>
      <Global
        styles={globalStyle}
      />
      <Switch>
        <Route
          component={DocPage}
          path="/:namespace/:docName"
        />
        <Route component={HomePage} />
      </Switch>
    </ErrorBoundary>
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
