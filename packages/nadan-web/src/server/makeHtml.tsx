import { logger } from 'jege/server';
import { MakeHtml } from 'express-isomorphic';
import url from 'url';

import routes, {
  Route,
  RouteProps,
} from './routes';
import IsomorphicState from './IsomorphicState';

const log = logger('[sandbox-web]');

const makeHtml: MakeHtml<IsomorphicState> = ({
  requestUrl,
  serverState,
}) => {
  const { socketPath, socketPort, state } = serverState;
  const {
    assets,
    cssFileName,
    nadanWebEndPoint,
  } = state;
  const routerContext = {};
  const html = router({
    cssFileName,
    nadanWebEndPoint,
    reactAssets: assets,
    requestUrl,
    routerContext,
    socketPath,
    socketPort,
  });

  return html;
};

export default makeHtml;

function router(routeProps: RouteProps): Promise<string> {
  const { pathname } = url.parse(routeProps.requestUrl);
  const parsed = parseURL(pathname);

  log(
    'router(): pathname: %s, parsed: %s, routeProps (keys): %s',
    pathname,
    parsed,
    Object.keys(routeProps),
  );

  const route: Route = routes[parsed] || routes.default;
  if (!route.render) {
    log('router(): error, render is not defined for pathname: %s', pathname);
    throw new Error('render is not defined');
  }
  return route.render(routeProps);
}

function parseURL(pathname: string = ''): string {
  const parsed = pathname.split('/')[2];
  return parsed;
}
