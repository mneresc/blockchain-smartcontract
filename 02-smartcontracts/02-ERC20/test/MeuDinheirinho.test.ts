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

        // should get balance of account
        it("Should get balance of account", async function () {
            const { dinheirinho, owner } = await loadFixture(deployFixture);
            expect(await dinheirinho.balanceOf(owner.address)).to.equal(1000000n*10n**18n);
        });

        // should transfer balance
        it("Should transfer balance", async function () {
            const { dinheirinho, owner, otherAccount } = await loadFixture(deployFixture);

            await expect(dinheirinho.transfer(otherAccount.address, 1))
                .to.emit(dinheirinho, "Transfer")
                .withArgs(owner.address, otherAccount.address, 1);

            expect(await dinheirinho.balanceOf(owner.address)).to.equal(1000000n*10n**18n - 1n);
            expect(await dinheirinho.balanceOf(otherAccount.address)).to.equal(1n);
        });

        //should not transfer more than balance
        it("Should transfer balance", async function () {
            const { dinheirinho, owner, otherAccount } = await loadFixture(deployFixture);
            const poorAcount = dinheirinho.connect(otherAccount);

            await expect(poorAcount.transfer(owner.address, 1))
                .to.be.revertedWith("Not enough balance");
        });

          it("Should get approve transfer", async function () {
            const valueApproved = 10n;
            const { dinheirinho, owner , otherAccount} = await loadFixture(deployFixture);

            await expect(dinheirinho.approve(otherAccount.address, valueApproved))
                .to.emit(dinheirinho, "Approval")
                .withArgs(owner.address,  otherAccount.address, valueApproved);
            expect(await dinheirinho.allowence(owner.address, otherAccount.address)).to.equal(valueApproved);
        });

    });
});
