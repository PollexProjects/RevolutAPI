export default class TransactionLeg {

    constructor(data) {
        this.update(data);
    }

    update(data) {
        this.amount = data.amount;
        this.currency = data.currency;
        this.description = data.description;

        // Relations
        this.account = data.account;
        this.counterParty = data.counterparty;
        this.counterAccount = data.counterparty.account_id;
    }

}
