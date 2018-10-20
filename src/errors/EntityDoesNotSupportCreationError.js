export default class EntityDoesNotSupportCreationError extends Error {
    constructor(message) {
        super(message? message:'This entity cannot be created');
    }
}
