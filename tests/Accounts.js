/* eslint no-console:0 */
/* eslint-env node,mocha */
require('dotenv').config({});
const expect = require('chai').expect;
const { RevolutBroker, Account } = require('../lib');

const broker = new RevolutBroker(process.env.API_KEY, true);

describe('Revolut accounts', () => {
    it('should returns accounts', () => {
        Account.GetAll(broker)
            .then(accounts => {
                expect(accounts).to.not.have.lengthOf(0);
            });
    });
});
