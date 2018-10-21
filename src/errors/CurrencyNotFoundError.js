export default class CurrencyNotFoundError extends Error {
    constructor(message) {
        super(message? message:'Given currency is not found.');
    }
}
