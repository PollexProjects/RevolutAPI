import RevolutEntity from './RevolutEntity';

export default class Transaction extends RevolutEntity {

    static GetResourcePath() {
        return '/transactions';
    }

    update(data) {
        super.update(data);
        this.type = data.type;
        this.requestId = data.request_id;
        this.state = data.state;
        this.reasonCode = data.reason_code;
        this.reference = data.reference;
        this.completedAt = data.completed_at;
        this.scheduledAt = data.scheduled_at;
    }

}
