import Block  from './block';


export const helloThere = () => {
    const block = new Block();
    block.index = 1;
    block.hash = '1234';

    console.log(block.isValid());
    console.log(block);

}
