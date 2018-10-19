/* eslint-env node,mocha */
const { RevolutBroker } = require('../lib');
require('dotenv').config({});

const broker = new RevolutBroker(process.env.API_KEY, true);

describe('sandbox', () => {
    it('should return status 200', () => {

        (async () => {
            await broker.getResource({
                resource: '/accounts'
            });
        })();

    });
});
