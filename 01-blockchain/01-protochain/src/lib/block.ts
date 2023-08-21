export default class Block {
    index: number = 1;
    hash: string = '';


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
