import RevolutEntity from './RevolutEntity';

/*
 If type is revolut then only the fields id, currency & type are available!
 */
export default class CounterAccount extends RevolutEntity {

    constructor({ broker, id, data, counterParty }) {
        super({ broker, id, data});
        this.counterParty = counterParty;
    }

    static GetResourcePath() {
        throw new Error('You should retrieve CounterAccounts through CounterParty entity');
    }

    update(data) {
        if (!super.update(data)) return;
        this.accountNo = data.account_no;
        this.routingNumber = data.routingNumber;
        this.sortCode = data.sort_code;
        this.iban = data.iban;
        this.bic = data.bic;
        this.type = data.type;
        this.email = data.email;
        this.name = data.name;
        this.bankCountry = data.bank_country;
        this.currency = data.currency;
        this.recipient_charges = data.recipient_charges;
    }

}
