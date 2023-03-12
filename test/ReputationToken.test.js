const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReputationToken", function () {
    let ReputationToken;
    let reputationToken;
    let owner;
    let addr1;

    beforeEach(async function () {
        ReputationToken = await ethers.getContractFactory("ReputationToken");
        reputationToken = await ReputationToken.deploy();
        await reputationToken.deployed();

        [owner, addr1] = await ethers.getSigners();
    });
    it("should set level thresholds correctly", async function () {
        expect(await reputationToken.level1Threshold()).to.equal(1e9);
        expect(await reputationToken.level2Threshold()).to.equal(1e10);
        expect(await reputationToken.level3Threshold()).to.equal(1e11);
    });

    it("should increase reputation correctly", async function () {
        await reputationToken.increaseReputation(addr1.address, 100);
        expect(await reputationToken.reputation(addr1.address)).to.equal(100);
    });

    it("should claim reputation correctly", async function () {
        await reputationToken.increaseReputation(addr1.address, 1e9);
        await reputationToken.claimReputation(addr1.address);
        expect(await reputationToken.balanceOf(addr1.address, 1)).to.equal(1);
    });
});