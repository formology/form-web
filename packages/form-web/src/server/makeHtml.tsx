/* eslint-disable */
import {
  createAssetElements,
  createStringifiableObjectElement,
} from 'express-isomorphic/utils';
import { createXongkoro } from 'xongkoro';
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
  const html = template({
    processEnvElement,
    reactAppInString: renderToString(serverApp),
    reactAssetElements,
  });
  return html;
};

function template({
  processEnvElement,
  reactAppInString,
  reactAssetElements,
}) {
  return `
<html>
  <head>
    ${processEnvElement}
  </head>
  <div id="react-root">
    ${reactAppInString}
  </div>
  ${reactAssetElements}
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
