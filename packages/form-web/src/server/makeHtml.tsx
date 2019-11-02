import {
  createAssetElements,
  createStringifiableObjectElement,
} from 'express-isomorphic/utils';
import { createXongkoro } from 'xongkoro';
import { dom } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { logger } from 'jege/server';
import { MakeHtml } from 'express-isomorphic';

import { initializeStore } from '@@src/universal/state';
import IsomorphicState from './IsomorphicState';
import ServerApp from '@@src/server/ServerApp';

const log = logger('[form-web]');

const makeHtml: MakeHtml<IsomorphicState> = ({
  requestUrl,
  serverState,
}) => {
  log('makeHtml');

  const { socketPath, socketPort, state } = serverState;
  const {
    assets,
    publicPath,
  } = state;

  const reduxStore = initializeStore();
  const xongkoro = createXongkoro({
    preloadedState: {},
    ssr: true,
  });
  const reactAssetElements = createAssetElements(assets, publicPath);
  const processEnvElement = createStringifiableObjectElement('__FORM_ENV__', getProcessEnv('FORM'));

  const serverApp = (
    <ServerApp
      reduxStore={reduxStore}
      requestUrl={requestUrl}
      routerContext={{}}
      xongkoro={xongkoro}
    />
  );
  const reactAppInString = renderToString(serverApp);

  const html = template({
    fontAwesomeCss: dom.css(),
    processEnvElement,
    reactAppInString,
    reactAssetElements,
    socketPath,
    socketPort,
  });
  return html;
};

function template({
  fontAwesomeCss,
  processEnvElement,
  reactAppInString,
  reactAssetElements,
  socketPath,
  socketPort,
}) {
  return `
<html>
  <head>
    ${processEnvElement}
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
    <style>${fontAwesomeCss}</style>
  </head>
  <div id="react-root">${reactAppInString}</div>
  ${reactAssetElements}
  <script>
    if (window.io) {
      var socket = io('http://localhost:${socketPort}', {
        path: '${socketPath}'
      });
      socket.on('express-isomorphic', function ({ msg }) {
        console.warn('[express-isomorphic] %s', msg);
      });
    }
  </script>
</html>
`;
}

function getProcessEnv(prefix) {
  if (prefix === undefined || prefix.length < 1) {
    throw new Error('getProcessEnv(): prefix is not defined');
  }

  const env = {};
  Object.keys(process.env)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => {
      env[key] = process.env[key];
    });
  return env;
}

export default makeHtml;
