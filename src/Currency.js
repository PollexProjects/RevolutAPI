var cc = require('currency-codes');

import { CurrencyNotFoundError } from './errors/InvalidAmountError';

export default class Currency {
    /**
     * Returns the currency code based on the given parameter.
     * Parameter can be: a code, a country, a number
     * @param {[code, country, number]} identifier The identifier for the currency
     */
    static GetCode(identifier) {
        if (cc.codes().includes(identifier)) {
            return cc.code(identifier).code;
        } else if (cc.countries().includes(identifier)) {
            return cc.country(identifier).code;
        } else if (cc.numbers().includes(identifier)) {
            return cc.number(identifier).code;
        }
        return new CurrencyNotFoundError();
    }
}
