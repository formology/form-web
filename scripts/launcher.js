const { argv } = require('yargs');
const { createLauncher, proc } = require('process-launch');
const { logger } = require('jege/server');

const launcherConfig = require('./launcherConfig');

const log = logger('[monorepo-nadan-web]');

const processDefinitions = {
  nadanWeb: proc(
    'node',
    [
      './scripts/launch.js',
    ],
    {
      cwd: './packages/nadan-web',
      env: {
        NADAN_WEB_CORE_ENDPOINT: launcherConfig.NADAN_WEB_CORE_ENDPOINT,
        NADAN_WEB_PORT: launcherConfig.NADAN_WEB_PORT,
      },
      stdio: 'inherit',
    },
  ),
};

const processGroupDefinitions = {
  default: [
    'nadanWeb',
  ],
};

function launcher() {
  try {
    log(
      'launcher(): argv: %j, Processes defined: %j, ProcessGroups: %j',
      argv,
      Object.keys(processDefinitions),
      processGroupDefinitions,
    );

    const Launcher = createLauncher({
      processDefinitions,
      processGroupDefinitions,
    });

    Launcher.run({
      process: argv.process,
    });
  } catch (err) {
    log('launcher(): error reading file', err);
  }
}

if (require.main === module) {
  launcher();
}
