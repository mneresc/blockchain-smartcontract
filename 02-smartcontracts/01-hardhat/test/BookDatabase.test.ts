import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("BookDatabaseTest", function () {
    async function deployFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const BookDatabase = await hre.ethers.getContractFactory(
            "BooksDatabase"
        );
        const bookDatabase = await BookDatabase.deploy();

        return { bookDatabase, owner, otherAccount };
    }

    it("should count == 0", async function () {
        const { bookDatabase } = await loadFixture(deployFixture);
        expect(await bookDatabase.count()).to.equal(0);
    });

    it("should addBook", async function () {
        const { bookDatabase } = await loadFixture(deployFixture);
        await bookDatabase.addBook({ title: "1984", year: "1938" });
        expect(await bookDatabase.count()).to.equal(1);
    });

    it("should editBook", async function () {
        const { bookDatabase } = await loadFixture(deployFixture);
        await bookDatabase.addBook({ title: "1984", year: 1938 });
        await bookDatabase.editBook(1, { title: "animal farm", year: 1938 });
        expect((await bookDatabase.books(1)).title).to.equal("animal farm");
    });

    it("should deleteBook", async function () {
        const { bookDatabase } = await loadFixture(deployFixture);
        await bookDatabase.addBook({ title: "1984", year: 1938 });
        let countAfterDelete = await bookDatabase.count();
        countAfterDelete--;
        await bookDatabase.deleteBook(1);
        expect(await bookDatabase.count()).to.equal(countAfterDelete);
    });

    it("should deleteBook fail not owner", async function () {
        const { bookDatabase, otherAccount } = await loadFixture(deployFixture);
        const instanceOtherAcount = bookDatabase.connect(otherAccount);
        await instanceOtherAcount.addBook({ title: "1984", year: 1938 });
        await expect(instanceOtherAcount.deleteBook(1)).to.be.revertedWith("Sai daqui o seu cachorro!");
    });
});
