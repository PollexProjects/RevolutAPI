/* eslint no-console:0 no-unused-vars:0 */
/* eslint-env node,mocha */
require('dotenv').config({});
const expect = require('chai').expect;
const { RevolutBroker, Transaction, TransactionLeg, Account, CounterAccount } = require('../lib');

const broker = new RevolutBroker(process.env.API_KEY, true);

const context = {
    transactionPromise: Transaction.GetAll(broker)
};

describe('TransactionLeg entity', () => {
    before(async () => {
        // first has to wait for promise to finish
        context.leg = (await context.transactionPromise)[0].legs[0];
    });

    it('should contain properties', () => {
        const leg = context.leg;
        expect(leg).to.have.property('id').and.exist;
        expect(leg).to.have.property('amount').and.exist;
        expect(leg).to.have.property('currency').and.exist;
        expect(leg).to.have.property('account').and.exist;
        expect(leg).to.have.property('counterParty').and.exist;
        expect(leg).to.have.property('counterAccount').and.exist;
        expect(leg).to.have.property('description').and.exist;
    });

    it('should a property account which is an identified Account entity', () => {
        const leg = context.leg;
        expect(leg.account).to.be.instanceOf(Account);
        expect(leg.account).to.have.property('id').and.exist;
    });

    it('should a property counterAccount which is a resolved CounterAccount entity', () => {
        const leg = context.leg;
        expect(leg.counterAccount).to.be.instanceOf(CounterAccount);
        expect(leg.counterAccount).to.have.property('id').and.exist;
    });
});
