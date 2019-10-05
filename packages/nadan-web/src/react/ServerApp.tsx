import {
  Xongkoro,
  XongkoroProvider,
} from 'xongkoro';
import React from 'react';
import {
  Provider as ReduxProvider,
} from 'react-redux';
import { QuerriedStaticRouter } from 'querry';
import { Store } from 'redux';

import { ReduxState } from '@@react/universal/state';
import Universal from '@@react/universal/components/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  reduxStore,
  requestUrl,
  routerContext,
  xongkoro,
}) => {
  return (
    <QuerriedStaticRouter
      basename="/frameworks/react"
      context={routerContext}
      location={requestUrl}
    >
      <ReduxProvider store={reduxStore}>
        <XongkoroProvider xongkoro={xongkoro}>
          <Universal />
        </XongkoroProvider>
      </ReduxProvider>
    </QuerriedStaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  reduxStore: Store<ReduxState>;
  requestUrl: string;
  routerContext: object;
  xongkoro: Xongkoro<any>;
}
