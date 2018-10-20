export default class NotImplementedInEntityError extends Error {
    constructor(message) {
        super(message? message:'This entity does not implement this method');
    }
}
