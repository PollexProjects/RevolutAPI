import RevolutEntity from './RevolutEntity';

export default class Account extends RevolutEntity {

    static GetResourcePath(id) {
        return `/accounts/${id}`;
    }

    update(data) {
        if (!super.update(data)) return;
        this.id = data.id;
        this.balance = data.balance;
        this.currency = data.currency;
        this.state = data.state;
    }
}
