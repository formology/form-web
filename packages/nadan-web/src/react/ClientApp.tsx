import { createXongkoro, XongkoroProvider } from 'xongkoro';
import { Provider as ReduxProvider } from 'react-redux';
import { QuerriedBrowserRouter } from 'querry';
import React from 'react';
import ReactDOM from 'react-dom';

import { initializeStore } from '@@react/universal/state';
import Universal from '@@react/universal/components/Universal';

const domElement = document.getElementById('react-root');
const store = initializeStore({
  preloadedState: window['__REDUX_STATE__'],
});
const xongkoro = createXongkoro({
  preloadedState: window['__XONGKORO_STATE__'],
});

const ClientApp: React.FC<any> = () => {
  return (
    <QuerriedBrowserRouter
      basename="/frameworks/react"
    >
      <ReduxProvider store={store}>
        <XongkoroProvider xongkoro={xongkoro}>
          <Universal />
        </XongkoroProvider>
      </ReduxProvider>
    </QuerriedBrowserRouter>
  );
};

ReactDOM.hydrate(
  <ClientApp />,
  domElement,
  () => {},
);
