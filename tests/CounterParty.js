/* eslint no-console:0 no-unused-vars:0 */
/* eslint-env node,mocha */
require('dotenv').config({});
const expect = require('chai').expect;
const { RevolutBroker, CounterParty, CounterAccount } = require('../lib');

const broker = new RevolutBroker(process.env.API_KEY, true);

const context = {};

describe('CounterParty entity', () => {
    it('method GetAll should return an array of CounterParty instances', (done) => {
        CounterParty.GetAll(broker)
            .then(counterParties => {
                expect(counterParties).to.be.an('array');
                expect(counterParties).to.not.have.lengthOf(0);
                expect(counterParties[0]).to.be.instanceOf(CounterParty);
                context.partyId = counterParties[0].id;
                done();
            })
            .catch(done);
    });

    it('method Get should return an CounterParty instance', (done) => {
        CounterParty.Get(context.partyId, broker)
            .then(counterParty => {
                expect(counterParty).to.be.instanceOf(CounterParty);
                done();
            })
            .catch(done);
    });

    it('a resolved instance should have properties', (done) => {
        (new CounterParty({ id: context.partyId, broker })).get()
            .then(counterParty => {
                expect(counterParty).to.have.property('id').and.exist;
                expect(counterParty).to.have.property('name').and.exist;
                // expect(counterParty).to.have.property('phone').and.exist;
                // expect(counterParty).to.have.property('profileType').and.exist;
                // expect(counterParty).to.have.property('country').and.exist;
                expect(counterParty).to.have.property('state').and.exist;
                expect(counterParty).to.have.property('accounts').and.exist;
                expect(counterParty).to.have.property('createdAt').and.exist;
                expect(counterParty).to.have.property('updatedAt').and.exist;
                done();
            })
            .catch(done);
    });

    it('a resolved instance should have an array of identified accounts', (done) => {
        (new CounterParty({ id: context.partyId, broker })).get()
            .then(counterParty => {
                const accounts = counterParty.accounts;
                // The array
                expect(accounts).to.be.an('array');
                // One instance
                expect(accounts[0]).to.be.instanceOf(CounterAccount);
                expect(accounts[0]).to.have.property('id').and.exist;
                done();
            })
            .catch(done);
    });
});
