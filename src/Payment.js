const uuidv4 = require('uuid/v4');

import Account from './entities/Account';
import CounterParty from './entities/CounterParty';
import CounterAccount from './entities/CounterAccount';
import Transaction from './entities/Transaction';
import InvalidAmountError from './errors/InvalidAmountError';
import Currency from './Currency';

export default class Payment {
    constructor({ broker, source, counterParty, counterAccount, amount, currency, reference = '' }) {
        this.broker = broker;
        this.source = source;
        this.counterParty = counterParty;
        this.counterAccount = counterAccount;
        this.amount = amount;
        this.currency = currency;
        this.reference = reference;
    }

    async execute() {
        // TODO: verify target and source are same currency
        const { data } = await this.broker.postResource(
            this.constructor.GetResourcePath(),
            this.format()
        );
        return new Transaction({ id: data.id, broker: this.broker });
    }

    format() {
        return {
            request_id: uuidv4(),
            account_id: this.source.id,
            receiver: {
                counterparty_id: this.counterParty.id,
                account_id: this.counterAccount.id
            },
            amount: this.amount,
            currency: this.currency,
            reference: this.reference
        };
    }

    /*
     * Getter & Setters
     */
    get source() {
        return this._source;
    }
    set source(account) {
        this.constructor.expectAccountInstance(account);
        this._source = account;
    }

    get counterParty() {
        return this._counterParty;
    }
    set counterParty(counterParty) {
        this.constructor.expectCounterPartyInstance(counterParty);
        this._counterParty = counterParty;
    }

    get counterAccount() {
        return this._counterAccount;
    }
    set counterAccount(counterAccount) {
        this.constructor.expectCounterAccountInstance(counterAccount);
        this._counterAccount = counterAccount;
    }

    get amount() {
        return this._amount;
    }
    set amount(amount) {
        this.constructor.expectPositiveAmount(amount);
        this._amount = amount;
    }

    get currency() {
        return this._currency;
    }
    set currency(identifier) {
        this._currency = Currency.GetCode(identifier);
    }

    /*
      * Validation
      */
    /**
      * @private
      */
    static expectAccountInstance(account) {
        if (!(account instanceof Account)) {
            throw new TypeError('Transfer target should be instance of Account');
        }
        return true;
    }
    /**
    * @private
    */
    static expectCounterPartyInstance(counterParty) {
        if (!(counterParty instanceof CounterParty)) {
            throw new TypeError('Transfer target should be instance of Account');
        }
        return true;
    }
    /**
    * @private
    */
    static expectCounterAccountInstance(counterAccount) {
        if (!(counterAccount instanceof CounterAccount)) {
            throw new TypeError('Transfer target should be instance of Account');
        }
        return true;
    }
    /**
      * @private
      */
    static expectPositiveAmount(amount) {
        if (amount <= 0) {
            throw new InvalidAmountError('Transfer amount should be positive');
        }
        return true;
    }

    static GetResourcePath() {
        return '/pay';
    }
}
