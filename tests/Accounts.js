/* eslint no-console:0 */
/* eslint-env node,mocha */
require('dotenv').config({});
const expect = require('chai').expect;
const { RevolutBroker, Account } = require('../lib');

const broker = new RevolutBroker(process.env.API_KEY, true);

const context = {};

describe('Account entity', () => {
    it('method GetAll should return an array of Account instances', (done) => {
        Account.GetAll(broker)
            .then(accounts => {
                expect(accounts).to.be.an('array');
                expect(accounts).to.not.have.lengthOf(0);
                expect(accounts[0]).to.be.instanceOf(Account);
                context.accountId = accounts[0].id;
                done();
            })
            .catch(done);
    });

    it('method Get should return an Account instance', (done) => {
        Account.Get(context.accountId, broker)
            .then(account => {
                expect(account).to.be.instanceOf(Account);
                done();
            })
            .catch(done);
    });

    it('a resolved instance should have properties', (done) => {
        (new Account({ id: context.accountId, broker })).get()
            .then(account => {
                expect(account).to.have.property('id').and.exist;
                expect(account).to.have.property('balance').and.exist;
                expect(account).to.have.property('currency').and.exist;
                expect(account).to.have.property('state').and.exist;
                expect(account).to.have.property('public').and.exist;
                expect(account).to.have.property('createdAt').and.exist;
                expect(account).to.have.property('updatedAt').and.exist;
                done();
            })
            .catch(done);
    });
});
