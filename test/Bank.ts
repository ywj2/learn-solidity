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
            await bank.save({ value: 1 });
            expect(await bank.check()).to.equal(1);
            await bank.save({ value: 99 });
            expect(await bank.check()).to.equal(100);
        })
    });

    describe("Withdraw", function () {
        it("Should set the right balance", async function () {
            const { bank, owner } = await loadFixture(deploy);
            expect(await bank.check()).to.equal(0);
            await bank.save({ value: 1 });
            expect(await bank.check()).to.equal(1);
            await expect(bank.withdraw(1)).to.changeEtherBalances(
                [owner, bank],
                [1, -1]
            );
        });

        it("Should revert", async function () {
            const { bank } = await loadFixture(deploy);
            expect(await bank.check()).to.equal(0);
            await bank.save({ value: 1 });
            expect(await bank.check()).to.equal(1);
            await expect(bank.withdraw(2)).to.be.revertedWith("not enough balance");
        });
    });
});
