/* eslint-env node,mocha */
require('dotenv').config({});
const { RevolutBroker, Account } = require('../lib');

const broker = new RevolutBroker(process.env.API_KEY, true);

describe('sandbox', () => {
    it('should return status 200', () => {

        (async () => {
            const accounts = await broker.getResource({
                resource: Account
            });
            console.log(accounts);
        })();

    });
});
