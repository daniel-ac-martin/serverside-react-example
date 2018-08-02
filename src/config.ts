'use strict';

const packageJson = require('../package.json');

export default {
    env: process.env.NODE_ENV,
    httpd: {
        host: process.env.LISTEN_HOST || '0.0.0.0',
        port: process.env.LISTEN_PORT || 8080
    },
    mode: process.env.MODE || 'Server',
    name: packageJson.name
};
