import {
  Switch,
  Route,
} from 'react-router-dom';
import { compose } from 'redux';
import { css, Global } from '@emotion/core';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import styled from '@emotion/styled';

import DocAddView from '@@src/universal/components/views/DocView/DocAddView';
import DocEditView from '@@src/universal/components/views/DocView/DocEditView';
import DocsView from '@@src/universal/components/views/DocsView/DocsView';
import DocView from '@@src/universal/components/views/DocView/DocView';
import ErrorBoundary from '@@src/universal/components/app/Error/ErrorBoundary';
import HomeView from '@@src/universal/components/views/HomeView/HomeView';
import normalize from '@@src/universal/styles/normalize';

const normalizeStyle = css`
  ${normalize}
`;

const customStyle = css({
  '*': {
    boxSizing: 'border-box',
    color: 'black',
  },
  a: {
    textDecoration: 'none',
  },
  body: {
  },
  input: {
    border: 'none',
    outline: 'none',
  },
  p: {
    margin: 0,
  },
});

const StyledUniversal = styled.div({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
});

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
            component={DocsView}
            exact
            path="/docs/"
          />
          <Route
            component={DocAddView}
            path="/docs/post"
          />
          <Route
            component={DocEditView}
            path="/docs/edit/:namespace/:name"
          />
          <Route
            component={DocView}
            path="/docs/blob/:namespace/:name"
          />
          <Route component={HomeView} />
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
    SimpleMDE;
  }
}
