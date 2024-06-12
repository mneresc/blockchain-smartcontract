import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BookDatabase = buildModule("LockModule", (m) => {
    const bookDb = m.contract("BooksDatabase");

    return { bookDb };
});

export default BookDatabase;
