/* eslint-env node, mocha */
const expect = require('chai').expect;
const sinon = require('sinon');
const { RevolutBroker, RevolutEntity } = require('../src');

describe('RevolutBroker', function() {
    beforeEach(function() {
        // Constants
        this.productionUrl = 'https://b2b.revolut.com/api/1.0/';
        this.devUrl = 'https://sandbox-b2b.revolut.com/api/1.0';
        this.broker = new RevolutBroker('AAAA');
        // Mocking
    });

    afterEach(function() {
        sinon.restore();
    });

    describe('#getResource', function() {
        it('Should send GET request to correct url', function(done) {
            // Arrange
            const axiosGetStub = sinon.stub(this.broker.axios, 'get').resolves({ data: {} });
            // Act
            this.broker.getResource('/')
                .then(() => {
                    // Assert
                    expect(axiosGetStub.called).to.be.true;
                    expect(axiosGetStub.lastCall.args[0]).to.equal('/');
                    done();
                })
                .catch(done);
        });
    });
    describe('#postResource', function() {
        it('Should send POST request to correct url', function(done) {
            // Arrange
            const axiosPostStub = sinon.stub(this.broker.axios, 'post').resolves({ data: {} });
            // Act
            this.broker.postResource('/', {})
                .then(() => {
                    // Assert
                    expect(axiosPostStub.called).to.be.true;
                    expect(axiosPostStub.lastCall.args[0]).to.equal('/');
                    done();
                })
                .catch(done);
        });
        it('Should send body', function(done) {
            // Arrange
            // Arrange
            const axiosPostStub = sinon.stub(this.broker.axios, 'post').resolves({ data: {} });
            const body = { id: 1234 };
            // Act
            this.broker.postResource('/', body)
                .then(() => {
                    // Assert
                    expect(axiosPostStub.called).to.be.true;
                    expect(axiosPostStub.lastCall.args[1]).to.equal(body);
                    done();
                })
                .catch(done);
        });
    });
    describe('#getEntity', function() {
        beforeEach(function() {
            // Mock
            // Every get request returns this result
            this.entityObject = {
                data: {
                    id: '1111-1111-1111-1111'
                }
            };
            // This function makes the axios request.
            this.broker.getResource = sinon.stub().resolves(this.entityObject);
        });

        it('Should make a request to the entities resource path', function(done) {
            // Arrange
            const requestPath = 'requestPath';
            // Mocking
            const entity = sinon.fake();
            entity.GetResourcePath = sinon.fake.returns(requestPath);
            // Act
            this.broker.getEntity({
                entityType: entity
            }).then(() => {
                // Assert
                // Ensure functions is called
                expect(entity.called).to.be.true;
                expect(entity.GetResourcePath.called).to.be.true;
                // Expect the final request to be with the requestPath we provide
                expect(this.broker.getResource.withArgs(requestPath).called).to.be.true;
                done();
            })
                .catch(done);
        });

        it('Should return instance of given constructor', function(done){
            // Arrange
            class MockEntity extends RevolutEntity {}
            // Mocking
            sinon.stub(MockEntity, 'GetResourcePath').returns('');
            // Act
            this.broker.getEntity({ entityType: MockEntity })
                .then(result => {
                    // Assert
                    expect(result).to.be.instanceOf(MockEntity);
                    done();
                }).catch(done);
        });

        it('Should call constructor with broker and data', function(done){
            // Arrange
            const MockEntity = sinon.spy();
            // Mocking
            MockEntity.GetResourcePath = sinon.fake.returns('');
            // Act
            this.broker.getEntity({ entityType: MockEntity })
                .then(() => {
                    // Assert
                    expect(MockEntity.withArgs({
                        broker: this.broker,
                        data: this.entityObject.data
                    }).calledOnce).to.be.true;
                    // Finish
                    done();
                }).catch(done);
        });
    });
});
