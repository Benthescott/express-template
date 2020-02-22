/**
 * This file specifies the configuration PM2 will use when starting the app. The documentation for
 * PM2 can be found here: https://pm2.io/doc/en/runtime/overview/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding
 *
 */
module.exports = {
    apps : [{
      name: 'node-template',
      script: 'server.js',
      exec_mode: 'cluster',
      instances: -1,
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  };
  