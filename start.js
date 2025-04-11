const concurrently = require('concurrently');

concurrently([
  {
    command: 'npm run frontend',
    name: 'frontend',
    prefixColor: 'blue'
  }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3
});