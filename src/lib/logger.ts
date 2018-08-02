'use strict';

import * as Bunyan from 'bunyan';
import config from '../config';

export default new Bunyan({
    name: config.name
});
