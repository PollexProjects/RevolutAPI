import RevolutEntity from './RevolutEntity';

export default class Account extends RevolutEntity {

    static GetResourcePath(id) {
        return id? `/accounts/${id}`:'/accounts';
    }

    update(data) {
        if (!super.update(data)) return;
        this.id = data.id;
        this.name = data.name;
        this.balance = data.balance;
        this.currency = data.currency;
        this.state = data.state;
        this.public = data.public;
    }
}
