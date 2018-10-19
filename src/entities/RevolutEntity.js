const moment = require('moment');

import { DifferentEntityError } from '../errors';

export default class RevolutEntity {

    constructor({ broker, id, data }) {
        this.broker = broker;
        this.id = id;
        if (data) {
            this.update(data);
        }
    }

    get() {
        return this.broker.getResource({ resource: this.constructor, id: this.id });
    }

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

    static GetAll(broker) {
        return broker.getResource({ resource: this });
    }

    static GetResourcePath() {
        throw new Error('Not implemented method in entity');
    }

}
