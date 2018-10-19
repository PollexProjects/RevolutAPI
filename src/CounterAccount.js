import RevolutEntity from './RevolutEntity';

export default class CounterAccount extends RevolutEntity {

    static GetResourcePath() {
        throw new Error('You should retrieve CounterAccounts through CounterParty entity');
    }

    update(data) {
        super.update(data);
        this.accountNo = data.account_no;
        this.routingNumber = data.routingNumber;
        this.sortCode = data.sort_code;
        this.iban = data.iban;
        this.bix = data.bic;
        this.type = data.type;
        this.email = data.email;
        this.name = data.name;
        this.bankCountry = data.bank_country;
        this.currency = data.currency;
        this.recipient_charges = data.recipient_charges;
    }

}
