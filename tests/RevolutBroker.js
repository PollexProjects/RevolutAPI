/* eslint-env node, mocha */
const expect = require('chai').expect;
const sinon = require('sinon');
const { RevolutBroker, RevolutEntity } = require('../src');

describe('RevolutBroker', function() {
    /**
     * Setup constants
     */
    before(function() {
        // Constants
        this.broker = new RevolutBroker();
        this.productionUrl = 'https://b2b.revolut.com/api/1.0/';
        this.devUrl = 'https://sandbox-b2b.revolut.com/api/1.0';
        // Generic get request result
        this.entityObject = {
            data: {
                id: '1111-1111-1111-1111'
            }
        };
    });
    /**
     * Setup mocks every test
     */
    beforeEach(function() {
        // Create Spies
        this.MockEntityType = sinon.spy();
        this.MockEntityType.GetResourcePath = () => { return '/MockEntity'; };
        // Create stubs
        sinon.stub(this.broker, 'getResource');
        sinon.stub(this.broker, 'postResource');
        sinon.stub(this.broker.axios, 'get');
        sinon.stub(this.broker.axios, 'post');
        // Implement stubs
        this.broker.getResource
            .callThrough();
        this.broker.getResource
            .withArgs('/')
            .resolves({ data: {} });
        this.broker.getResource
            .withArgs('/MockEntity')
            .resolves(this.entityObject);

        this.broker.postResource.callThrough();
        this.broker.axios.post.resolves({ data: {} });

        this.broker.axios.get
            .resolves({ data: {} });
        this.broker.axios.post
            .resolves({ data: {} });
    });
    /**
     * Restore mocks every test
     */
    afterEach(function() {
        sinon.restore();
    });
    describe('#getResource', function() {
        it('Should send GET request to correct url', function(done) {
            // Arrange
            // Act
            this.broker.getResource('/passthrough')
                .then(() => {
                    // Assert
                    expect(this.broker.axios.get.withArgs('/passthrough').called).to.be.true;
                    done();
                })
                .catch(done);
        });
    });
    describe('#postResource', function() {
        it('Should send POST request to correct url with body', function(done) {
            // Arrange
            // Act
            this.broker.postResource('/passthrough', {})
                .then(() => {
                    // Assert
                    expect(this.broker.axios.post.withArgs('/passthrough', {}).called).to.be.true;
                    done();
                })
                .catch(done);
        });
    });
    describe('#getEntity', function() {
        it('Should make a request to the entities resource path', function(done) {
            // Arrange
            // Act
            this.broker.getEntity({ entityType: this.MockEntityType }).then(() => {
                // Assert
                expect(this.broker.getResource.withArgs(this.MockEntityType.GetResourcePath()).called).to.be.true;
                done();
            }).catch(done);
        });
        it('Should return instance of given constructor', function(done){
            // Arrange
            // Act
            this.broker.getEntity({ entityType: this.MockEntityType })
                .then(result => {
                    // Assert
                    expect(result).to.be.instanceOf(this.MockEntityType);
                    done();
                }).catch(done);
        });
        it('Should call constructor with broker and data', function(done){
            // Arrange
            // Act
            this.broker.getEntity({ entityType: this.MockEntityType })
                .then(() => {
                    // Assert
                    expect(this.MockEntityType.withArgs({
                        broker: this.broker,
                        data: this.entityObject.data
                    }).called).to.be.true;
                    // Finish
                    done();
                }).catch(done);
        });
    });
});
