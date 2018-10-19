const moment = require('moment');

export default class RevolutEntity {

    constructor(data, broker) {
        this.broker = broker;
        this.update(data);
    }

    static GetResourcePath() {
        throw new Error('Not implemented method in entity');
    }

    update(data) {
        // Ensure that the 'update' is newer
        if (this.updatedAt >= moment(data.updated_at)) return false;

        this.id = data.id;
        this.createdAt = moment(data.created_at);
        this.updatedAt = moment(data.updated_at);

        return true;
    }

}
