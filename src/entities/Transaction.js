import RevolutEntity from './RevolutEntity';

export default class Transaction extends RevolutEntity {

    static GetResourcePath(id) {
        return `/transactions/${id}`;
    }

    update(data) {
        if (!super.update(data)) return;
        this.type = data.type;
        this.requestId = data.request_id;
        this.state = data.state;
        this.reasonCode = data.reason_code;
        this.reference = data.reference;
        this.completedAt = data.completed_at;
        this.scheduledAt = data.scheduled_at;
    }

    updateLegs(legsData) {
        this.legs = legsData.map(legData => new TransactionLeg(legData));
    }

}
