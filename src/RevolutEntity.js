export default class RevolutEntity {

    constructor(data, broker) {
        this.broker = broker;
        this.update(data);
    }

    static GetResourcePath() {
        throw new Error('Not implemented method in entity');
    }

    update(data) {
        this.id = data.id;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

}
