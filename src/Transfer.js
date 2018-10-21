const uuidv4 = require('uuid/v4');

import Currency from './Currency';
import Account from './entities/Account';
import { InvalidAmountError } from './errors/InvalidAmountError';

export default class Transfer {
    constructor({ broker, source, target, amount, currency, reference = '' }) {
        this.requestId = uuidv4();
        this.broker = broker;
        this.source = source;
        this.target = target;
        this.amount = amount;
        this.currency = currency;
        this.reference = reference;
        this.resourcePath = '/transfer';
    }

    execute() {
        return this.broker.postResource(this.resourcePath, this.format());
    }

    format() {
        return {
            request_id: this.requestId,
            source_account_id: this.source.id,
            target_account_id: this.target.id,
            amount: this.amount,
            currency: this.currency,
            reference: this.reference
        };
    }

    /*
     * Getters  &Setters
     * I have chosen setters here because validity of properties are
     * very important.
     * TODO: Add setters to all entities as well!?
     */
    get source() {
        return this._source;
    }
    set source(account) {
        // NOTE: This feels a bit dirty and perhaps tough to understand
        // for other developers
        this.expectAccountInstance(account);
        this._source = account;
    }

    get target() {
        return this._target;
    }
    set target(account) {
        this.expectAccountInstance(account);
        this._target = account;
    }

    get amount() {
        return this._amount;
    }
    set amount(amount) {
        this.expectPositiveAmount(amount);
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
    expectAccountInstance(account) {
        if (!(account instanceof Account)) {
            throw new TypeError('Transfer target should be instance of Account');
        }
        return true;
    }
    /**
     * @private
     */
    expectPositiveAmount(amount) {
        if (amount <= 0) {
            throw new InvalidAmountError('Transfer amount should be positive');
        }
        return true;
    }
}
