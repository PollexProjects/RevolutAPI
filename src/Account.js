import RevolutEntity from './RevolutEntity';

export default class Account extends RevolutEntity {
    constructor() {
        super();
    }

    update(data) {
        super.update(data);
        this.id = data.id;
        this.balance = data.balance;
        this.currency = data.currency;
        this.state = data.state;
    }
}
