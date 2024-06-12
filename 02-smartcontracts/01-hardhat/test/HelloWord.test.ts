import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";

  describe("HelloWordTest", function () {
    async function deployFixture() {
      const [owner, otherAccount] = await hre.ethers.getSigners();

      const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
      const helloWorld = await HelloWorld.deploy();

      return { helloWorld, owner, otherAccount };
    }

    describe("Deployment", function () {

      it("Should set a message", async function () {
        const newMessage = "the real slim shady please stand up"
        const { helloWorld } = await loadFixture(deployFixture);
        await helloWorld.setMessage(newMessage);
        expect(await helloWorld.message()).to.equal(newMessage);
      });



      it("Should read original message", async function () {
        const { helloWorld } = await loadFixture(deployFixture);
        expect(await helloWorld.message()).to.equal("My name is Slim Shady!");
      });


    });

  });
