export default class DifferentEntityUpdateError extends Error {
    constructor(message) {
        super(message? message:'Update is not for this entity');
    }
}
