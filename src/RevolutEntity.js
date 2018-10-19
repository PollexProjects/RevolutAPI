export default class RevolutEntity {

    constructor(broker) {
        this.broker = broker;
    }

    static CreateFrom(data, broker) {
        const entity = new RevolutEntity(broker);
        entity.update(data);
    }

    update(data) {
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

}
