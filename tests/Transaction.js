/* eslint no-console:0 no-unused-vars:0 */
/* eslint-env node,mocha */
require('dotenv').config({});
const expect = require('chai').expect;
const { RevolutBroker, Transaction, TransactionLeg } = require('../lib');

const broker = new RevolutBroker(process.env.API_KEY, true);

const context = {};

describe('Transaction entity', () => {
    it('method GetAll should return an array of Transaction instances', (done) => {
        Transaction.GetAll(broker)
            .then(transactions => {
                expect(transactions).to.be.an('array');
                expect(transactions).to.not.have.lengthOf(0);
                expect(transactions[0]).to.be.instanceOf(Transaction);
                context.transactionId = transactions[0].id;
                done();
            })
            .catch(done);
    });

    it('method Get should return an Transaction instance', (done) => {
        Transaction.Get(context.transactionId, broker)
            .then(transaction => {
                expect(transaction).to.be.instanceOf(Transaction);
                done();
            })
            .catch(done);
    });

    it('a resolved instance should have properties', (done) => {
        (new Transaction({ id: context.transactionId, broker })).get()
            .then(transaction => {
                expect(transaction).to.have.property('id').and.exist;
                expect(transaction).to.have.property('type').and.exist;
                expect(transaction).to.have.property('requestId').and.exist;
                expect(transaction).to.have.property('state').and.exist;
                if (['declined', 'failed'].includes(transaction.state))
                    expect(transaction).to.have.property('reasonCode').and.exist;
                expect(transaction).to.have.property('legs').and.exist;
                expect(transaction).to.have.property('createdAt').and.exist;
                expect(transaction).to.have.property('updatedAt').and.exist;
                done();
            })
            .catch(done);
    });

    it('a resolved instance should contain resolved TransactionLeg entities', (done) => {
        (new Transaction({ id: context.transactionId, broker })).get()
            .then(transaction => {
                const legs = transaction.legs;
                expect(legs).to.be.an('array');
                expect(legs[0]).to.be.instanceOf(TransactionLeg);
                done();
            })
            .catch(done);
    });
});
