import createDebugMessages from "debug";

const debug = createDebugMessages('debug')('SQL:log');
debug("Starting App");

import pkg from 'pg';
import client from './cacheClient.js';

const { Pool } = pkg;

const pool = new Pool();

let queryCount = 0;

module.exports = {
    
    originalClient: pool,

    async query(...params) {
        // debug(...params);
        queryCount += 1;
        debug(`Req n°${queryCount}`);
        return this.originalClient.query(...params);
    },
};

export default dbClient;