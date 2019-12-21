const { argv } = require('yargs');
const { createLauncher, proc } = require('process-launch');
const { logger } = require('jege/server');

const launcherConfig = require('./launcherConfig');

const log = logger('[monorepo-form-web]');

const processDefinitions = {
  formWeb: proc(
    'node',
    [
      './scripts/launch.js',
    ],
    {
      cwd: './packages/form-web',
      env: {
        FORM_WEB_PORT: launcherConfig.FORM_WEB_PORT,
      },
      stdio: 'inherit',
    },
  ),
};

const processGroupDefinitions = {
  default: [
    'formWeb',
  ],
};

function launcher() {
  try {
    log(
      'launcher(): argv: %j, Processes defined: %j, ProcessGroupDefinitions: %j',
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
