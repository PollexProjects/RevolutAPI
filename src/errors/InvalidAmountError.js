export default class InvalidAmountError extends Error {
    constructor(message) {
        super(message? message:'Invalid amount specified');
    }
}
