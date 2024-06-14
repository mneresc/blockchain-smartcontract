import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("MeuDinheirinho", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const MeuDinheirinho = await hre.ethers.getContractFactory(
            "MeuDinheirinho"
        );
        const dinheirinho = await MeuDinheirinho.deploy();
        return { dinheirinho, owner, otherAccount };
    }

    describe("Deployment", function () {
        // it("Should set the right owner", async function () {
        //   const { dinheirinho, owner } = await loadFixture(deployFixture);
        //   expect(await dinheirinho.owner()).to.equal(owner.address);
        // });

        it("Should set state variables", async function () {
            const { dinheirinho } = await loadFixture(deployFixture);
            expect(await dinheirinho.name()).to.equal("MeuDinheirinho");
            expect(await dinheirinho.symbol()).to.equal("MDH");
            expect(await dinheirinho.decimals()).to.equal(18);
        });

        it("Should test total suply", async function () {
            const { dinheirinho } = await loadFixture(deployFixture);
            expect(await dinheirinho.totalSupply()).to.equal(1000000n*10n**18n);
        });
    });
});
