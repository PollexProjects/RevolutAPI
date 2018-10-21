import RevolutEntity from './RevolutEntity';
import Transfer from '../Transfer';

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

    /**
     * Create a Transfer from one account to another. This transfer is not
     * yet executed.
     * @param  {Account} to        The receiving account
     * @param  {decimal} amount    The amount to send
     * @param  {string} reference  An optional reference for the transfer
     * @return {Transfer}          A Transfer entity
     */
    transfer(to, amount, reference = '') {
        return new Transfer({
            broker: this.broker,
            source: this,
            target: to,
            amount,
            reference,
            currency: this.currency
        });
    }
}
