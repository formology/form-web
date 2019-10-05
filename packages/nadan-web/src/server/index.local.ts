/* eslint-disable */
import chalk from 'chalk';
import express, {
  NextFunction,
} from 'express';
import expressIsomorphic, {
  Extend,
  ServerState,
} from 'express-isomorphic';
import http from 'http';
import { logger } from 'jege/server';
import path from 'path';
import { requireNonEmpty } from 'objekt';
import {
  watch,
  withWebpackDev,
} from 'express-isomorphic-extension/webpack';

import IsomorphicState from './IsomorphicState';
import webpackConfig from '../webpack/webpack.config.client.local.web';
import webpackConfigServer from '../webpack/webpack.config.server.local';

const log = logger('[sandbox-web]');

const paths = {
  assets: path.resolve(__dirname, '../../dist/assets'),
  build: path.resolve(__dirname, '../../build'),
  dist: path.resolve(__dirname, '../../dist'),
  scss: path.resolve(__dirname, '../resources/scss'),
  src: path.resolve(__dirname, '..'),
};

const extend: Extend<IsomorphicState> = async (app, serverState) => {
  const nadanWebEndPoint = requireNonEmpty(process.env.NADAN_WEB_ENDPOINT);
  log('extend(): nadanWebEndPoint: %s', nadanWebEndPoint);

  app.use(express.static(paths.dist));
  app.use(launchStatusChecker(serverState));

  withWebpackDev({
    serverState,
    webpackConfig,
  })(app);

  return Promise.all([
    watch(webpackConfigServer),
  ]).then(() => {
    serverState.update((object) => ({
      ...object,
      state: {
        ...object.state,
        cssFileName: 'index.css',
        isReady: true,
        nadanWebEndPoint,
      },
    }));
  });
};

export default async function server() {
  console.log('Yay');
  // const sandboxWebPort = requireNonEmpty(process.env.NADAN_SANDBOX_WEB_PORT);

  // log(
  //   'server(): starting server, sandboxWebPort: %s',
  //   sandboxWebPort,
  // );

  // const { app } = await expressIsomorphic.createDev<IsomorphicState>({
  //   extend,
  //   makeHtmlPath: path.resolve(paths.build, 'makeHtml.bundle.js'),
  //   watchPaths: [
  //     path.resolve(paths.src, 'server/html'),
  //   ],
  // });

  // const httpServer = http.createServer(app);

  // httpServer.listen(sandboxWebPort, () => {
  //   log(`listening on port: ${chalk.yellow('%s')}`, sandboxWebPort);
  // });
}

function launchStatusChecker(serverState: ServerState<IsomorphicState>) {
  return (req, res, next: NextFunction) => {
    const { state } = serverState.getState();
    if (state.isReady) {
      next();
    } else {
      res.send('Server is launching. Check if this continues for more than 1 minute');
    }
  };
}
