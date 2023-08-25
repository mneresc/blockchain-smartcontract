/**
 * Validation class
 * @class Validation
 */
export default class Validation {
    success: boolean;
    message: string;

    /**
     * Create a validation object to exeplain problems
     * @param success
     * @param message
     */
    constructor(success: boolean = true, message: string = '') {
        this.success = success;
        this.message = message;
    }
}
