const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PSP22Token", function () {
  it("Deployment should mint tokens", async function () {
    const PSP22Token = await ethers.getContractFactory("PSP22Token");
    const psp22 = await PSP22Token.deploy();
    await psp22.deployed();
    const totalSupply = await psp22.totalSupply();

    // Check that the total supply is correct
    expect(totalSupply).to.equal(1000000000n * 10n ** 18n);
  });

  it("Transfer to staking should work", async function () {
    const PSP22Token = await ethers.getContractFactory("PSP22Token");
    const [owner, staking] = await ethers.getSigners();
    const psp22 = await PSP22Token.deploy();
    await psp22.deployed();
    await psp22.transfer(staking.address, 1000);

    // Check that the balance of the staking contract is correct
    const stakingBalance = await psp22.balanceOf(staking.address);
    expect(stakingBalance).to.equal(1000);

    // Check that the balance of the owner is correct
    const ownerBalance = await psp22.balanceOf(owner.address);
    expect(ownerBalance.toString()).to.equal("999999999999999999999999000");
  });
});
