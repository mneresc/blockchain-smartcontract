export default class Block {
    index: number = 1;
    hash: string = '';

    /**
     * Block constructor
     * @param index block index
     * @param hash block hash
     */
    constructor(index: number = 1, hash: string = '') {
        this.index = index;
        this.hash = hash;
    }

    /**
     * Check if block is valid
     * @returns {boolean} true if block is valid
     */
    isValid(): boolean {
        if (this.index < 1) {
            return false;
        }

        if (!this.hash) {
            return false;
        }
        return true;
    }
}
