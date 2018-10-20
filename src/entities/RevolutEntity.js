const moment = require('moment');

import {
    DifferentEntityError,
    EntityDoesNotSupportCreationError
} from '../errors';

export default class RevolutEntity {

    /**
     * Provides a base-class for entities in the API.
     * Providing an id will create an unresolved entity, which can be resolved
     * by `.get()`.
     * Providing data will map the APIs response data to this entity.
     * @param {RevolutBroker} broker    The broker to use
     * @param {UUID} id                 The entity's UUID
     * @param {Object} data             The entity's data from the API
     */
    constructor({ broker, id, data }) {
        this.broker = broker;
        this.id = id;
        if (data) {
            this.update(data);
        }
    }

    /**
     * Get this entity from the API
     * @return {RevolutEntity} The resolved entity
     */
    get() {
        return this.broker.getResource({ resource: this.constructor, id: this.id });
    }

    /**
     * Updates this entity instance with the given data.
     * @param  {Object} data    The entity's data from the API
     * @return {Boolean}        True if the update was applied
     */
    update(data) {
        if (this.id && this.id !== data.id) throw new DifferentEntityError();
        // Ensure that the 'update' is newer
        if (this.updatedAt && this.updatedAt >= moment(data.updated_at)) return false;

        this.id = data.id;
        this.createdAt = moment(data.created_at);
        this.updatedAt = moment(data.updated_at);

        return true;
    }

    //
    // Static methods
    //
    /**
     * Get and resolve an entity by id from a broker
     * @param {UUID} id                 The entity's ID
     * @param {RevolutBroker} broker    The broker to use
     */
    static Get(id, broker) {
        return broker.getResource({ resource: this, id });
    }

    /**
     * Get and resolve all of this entities from a broker
     * @param {RevolutBroker} broker The broker to use
     */
    static GetAll(broker) {
        return broker.getResource({ resource: this });
    }

    /**
     * Provides the entity's resource path on the API URL
     * @param {UUID} id Optional id to get a single entity.
     */
    // eslint-disable-next-line no-unused-vars
    static GetResourcePath(id) {
        throw new Error('Not implemented method in entity');
    }

    static Create() {
        throw new EntityDoesNotSupportCreationError();
    }

}
