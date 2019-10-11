const NODE_ENV = process.env.NODE_ENV || 'development';
const FORM_WEB_PORT = 3001;

const launcherConfig = (() => {
  const rawConfig = {
    development: {
      // NADAN_API_DB_ENV: 'aws',
      // NADAN_API_LAUNCH_ENV: 'local',
      // NADAN_SANDBOX_API_ENDPOINT: `http://localhost:3002`,
      // NADAN_SANDBOX_API_PORT: 3002,
      // NADAN_SANDBOX_WEB_PORT: 3001,
      // NADAN_WEB_CORE_ENDPOINT: `http://localhost:${NADAN_WEB_CORE_PORT}`,
      // NADAN_WEB_CORE_PORT,
      // NADAN_WEB_ENDPOINT: `http://localhost:${NADAN_WEB_PORT}`,
      FORM_WEB_PORT,
    },
    production: {},
  };
  return rawConfig[NODE_ENV];
})();

module.exports = launcherConfig;
