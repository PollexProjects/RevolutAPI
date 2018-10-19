const moment = require('moment');

import RevolutEntity from './RevolutEntity';
import TransactionLeg from './TransactionLeg';

export default class Transaction extends RevolutEntity {

    static GetResourcePath(id) {
        return id? `/transactions/${id}`:'/transactions';
    }

    update(data) {
        if (!super.update(data)) return;
        this.type = data.type;
        this.requestId = data.request_id;
        this.state = data.state;
        this.reasonCode = data.reason_code;
        this.reference = data.reference;
        this.completedAt = moment(data.completed_at);
        this.scheduledAt = moment(data.scheduled_at);

        this.updateLegs(data.legs);
    }

    updateLegs(legsData) {
        this.legs = legsData.map(legData => new TransactionLeg(legData));
    }

}
