import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Bank", function () {
    async function deploy() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const Bank = await hre.ethers.getContractFactory("Bank");
        const bank = await Bank.deploy();

        return { bank, owner, otherAccount };
    }

    describe("Save", function () {
        it("Should set the right balance", async function () {
            const { bank } = await loadFixture(deploy);
            expect(await bank.check()).to.equal(0);
            await bank.save(1);
            expect(await bank.check()).to.equal(1);
            await bank.save(99);
            expect(await bank.check()).to.equal(100);
        })
    });

    describe("Withdraw", function () {
        it("Should set the right balance", async function () {
            const { bank } = await loadFixture(deploy);
            expect(await bank.check()).to.equal(0);
            await bank.save(1);
            expect(await bank.check()).to.equal(1);
            expect(await bank.withdraw(1)).to.be.ok;
        })
    });
});
