import { compose } from 'redux';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import styled, {
  createGlobalStyle,
} from 'styled-components';
import { useDispatch } from 'react-redux';

import { Action } from '@@react/universal/state';
import AccountPage from '@@react/universal/components/pages/AccountPage/AccountPage';
import CartPage from '@@react/universal/components/pages/CartPage/CartPage';
import ErrorBoundary from '@@react/universal/components/app/ErrorBoundary';
import OrderPage from '@@react/universal/components/pages/OrderPage/OrderPage';
import ProductPage from '@@react/universal/components/pages/ProductPage/ProductPage';
import Top from '@@react/universal/components/app/Top/Top';

const StyledUniversal = styled.div({
  '& table': {
    borderCollapse: 'collapse',
  },
  display: 'flex',
  flexDirection: 'column',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
  minHeight: '100%',
  padding: '25 33',
});

const Bottom = styled.div({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  width: '100%',
});

const GlobalStyle = createGlobalStyle({
  '#react-root': {
    height: '100%',
    left: 0,
    overflowY: 'scroll',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

const Universal: React.FC<any> = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(Action.getAuthToken());
  }, []);

  return (
    <ErrorBoundary>
      <GlobalStyle />
      <StyledUniversal>
        <Top />
        <Bottom>
          <Switch>
            <Route
              component={ProductPage}
              exact
              path="/"
            />
            <Route
              component={CartPage}
              path="/cart"
            />

            <Route
              component={OrderPage}
              path="/orders"
            />
            <Route
              component={AccountPage}
              path="/account"
            />
            <Route
              render={() => {
                return 'URL is wrong. Could you check again?';
              }}
            />
          </Switch>
        </Bottom>
      </StyledUniversal>
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
