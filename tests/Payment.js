/* eslint-env node, mocha */
const expect = require('chai').expect;
const sinon = require('sinon');
const uuid4 = require('uuid/v4');
const {
    RevolutBroker,
    Payment,
    Account,
    CounterParty,
    CounterAccount,
    Transaction,
    InvalidAmountError
} = require('../src');

// Unit tests
describe('Payment', function() {
    /**
     * Setup constants
     */
    before(function() {
        // Constants
        this.broker = new RevolutBroker();
        this.fakeTransaction = {
            id: '1111-1111-1111-1111'
        };
        this.fakeTransactionResponse = {
            data: this.fakeTransaction
        };
        this.fakeTransactionResourcePath =
            Transaction.GetResourcePath(this.fakeTransaction.id);


        // Utility function
        this.constructorParameters = (other) => {
            return {
                id: uuid4(),
                broker: this.broker,
                ...other
            };
        };

        // Constructor parameters for a Payment entity
        this.PaymentConstructorParameters = {
            broker: this.broker,
            source: new Account(this.constructorParameters()),
            counterParty: new CounterParty(this.constructorParameters()),
            counterAccount: new CounterAccount(this.constructorParameters()),
            amount: 100.01,
            currency: 'EUR',
            reference: 'reference',
        };
    });
    /**
     * Setup mocks
     */
    before(function() {
        // Create spies
        sinon.spy(Payment, 'expectAccountInstance');
        sinon.spy(Payment, 'expectCounterPartyInstance');
        sinon.spy(Payment, 'expectCounterAccountInstance');
        sinon.spy(Payment, 'expectPositiveAmount');
        // Create stubs
        sinon.stub(this.broker, 'getResource');
        sinon.stub(this.broker, 'postResource');
        // implement stubs
        this.broker.postResource.withArgs(Payment.GetResourcePath())
            .resolves(this.fakeTransactionResponse);
        this.broker.getResource.withArgs(this.fakeTransactionResourcePath)
            .resolves(this.fakeTransactionResponse);
    });
    /**
     * Restore mocks
     */
    after(function() {
        sinon.restore();
    });
    describe('Constructor', function() {
        it('Should fire `#expect...` functions for properties', function() {
            // Arrange
            // Act
            new Payment(this.PaymentConstructorParameters);
            // Assert
            expect(Payment.expectAccountInstance.called).to.be.true;
            expect(Payment.expectCounterPartyInstance.called).to.be.true;
            expect(Payment.expectCounterAccountInstance.called).to.be.true;
            expect(Payment.expectPositiveAmount.called).to.be.true;
        });
    });
    describe('#execute', function() {
        it('Should return an identified Transaction entity', function(done) {
            // Arrange
            const payment = new Payment(this.PaymentConstructorParameters);
            // Act
            payment.execute().then(returnValue => {
                // assert
                expect(returnValue).to.be.instanceOf(Transaction);
                expect(returnValue).to.have.property('id');
                expect(returnValue.id).to.be.equal(this.fakeTransaction.id);
                done();
            }).catch(done);
        });
    });
    describe('`#expect...` functions', function() {
        describe('#expectAccountInstance', function() {
            it('Should allow parameter of Account instance', function() {
                // Arrange
                const account = new Account(this.constructorParameters());
                // Assert
                expect(() => Payment.expectAccountInstance(account)).to.not.throw()
                    .and.to.be.true;
            });
            it('Should throw if parameter is not an Account instance', function() {
                // Arrange
                const account = sinon.fake();
                // Assert
                expect(() => Payment.expectAccountInstance(account)).to.throw(TypeError);
            });
        });
        describe('#expectCounterPartyInstance', function() {
            it('Should allow parameter of CounterParty instance', function() {
                // Arrange
                const account = new CounterParty(this.constructorParameters());
                // Assert
                expect(() => Payment.expectCounterPartyInstance(account)).to.not.throw()
                    .and.to.be.true;
            });
            it('Should throw if parameter is not an CounterParty instance', function() {
                // Arrange
                const account = sinon.fake();
                // Assert
                expect(() => Payment.expectCounterPartyInstance(account)).to.throw(TypeError);
            });
        });
        describe('#expectCounterAccountInstance', function() {
            it('Should allow parameter of CounterAccount instance', function() {
                // Arrange
                const account = new CounterAccount(this.constructorParameters());
                // Assert
                expect(() => Payment.expectCounterAccountInstance(account)).to.not.throw()
                    .and.to.be.true;
            });
            it('Should throw if parameter is not an CounterAccount instance', function() {
                // Arrange
                const account = sinon.fake();
                // Assert
                expect(() => Payment.expectCounterAccountInstance(account)).to.throw(TypeError);
            });
        });
        describe('#expectPositiveAmount', function() {
            it('Should allow a positive value', function() {
                // Assert
                expect(() => Payment.expectPositiveAmount(10)).to.not.throw();
                expect(() => Payment.expectPositiveAmount(1000)).to.not.throw();
                expect(() => Payment.expectPositiveAmount(1000000)).to.not.throw();
            });
            it('Should fail on zero values', function() {
                // Assert
                expect(() => Payment.expectPositiveAmount(0)).to.throw(InvalidAmountError);
                expect(() => Payment.expectPositiveAmount(-0)).to.throw(InvalidAmountError);
            });
            it('Should fail on negative values', function() {
                // Assert
                expect(() => Payment.expectPositiveAmount(-10)).to.throw(InvalidAmountError);
                expect(() => Payment.expectPositiveAmount(-1000)).to.throw(InvalidAmountError);
                expect(() => Payment.expectPositiveAmount(-1000000)).to.throw(InvalidAmountError);
            });
        });
    });
});
