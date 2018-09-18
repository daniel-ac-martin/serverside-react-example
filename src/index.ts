'use strict';

import config from './config';
import log from './lib/logger';
import * as healthCheck from './controller/health-check';
import * as restify from 'restify';
require('@skatejs/ssr/register');
const render = require('@skatejs/ssr');
import * as page from './components/Page';

const restifyBunyanLogger = require('restify-bunyan-logger');
const serverless = require('serverless-http');

process.title = config.name.replace(/[^\w]/gi, '').substr(0, 6);

const httpd: restify.Server = restify.createServer({
  log: log,
  name: config.name
});

httpd.use(restify.plugins.requestLogger());
httpd.use(restify.plugins.acceptParser(httpd.acceptable));
httpd.use(restify.plugins.queryParser({ mapParams: false }));
httpd.use(restify.plugins.fullResponse());
httpd.use((req: any, res: any, next: any) => {
  res.header('X-Frame-Options', 'DENY');
  next();
});
httpd.on('after', restifyBunyanLogger());

httpd.get('/healthz', healthCheck.liveness);
httpd.get('/readiness', healthCheck.readiness);

httpd.get('/', (req: any, res: any, next: any) => {
    res.setHeader('Content-type', 'text/html');
    render(new page.component()).then(res.end.bind(res));
});

httpd.get('/gallery', (req: any, res: any, next: any) => {
    res.setHeader('Content-type', 'text/html');
    render(new page.component({ type: page.PageType.Gallery })).then(res.end.bind(res));
});

switch (config.mode) {
    case 'Server':
        // Run as a classical server
        httpd.listen(config.httpd.port, config.httpd.host, () => {
            log.info('%s listening at %s', httpd.name, httpd.url);
        });
        break;
    case 'Serverless':
        // Run under the Serverless framework
        module.exports.handler = serverless(httpd);
        break;
}
