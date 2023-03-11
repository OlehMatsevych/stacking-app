const { expect } = require("chai");

describe("StackingContract", function () {
    let psp22Token;
    let stackingContract;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const PSP22Token = await ethers.getContractFactory("PSP22Token");
        psp22Token = await PSP22Token.deploy();
        await psp22Token.deployed();

        const StackingContract = await ethers.getContractFactory("StackingContract");
        stackingContract = await StackingContract.deploy(psp22Token.address);
        await stackingContract.deployed();
    });

    describe("stake", function () {
        it("should allow users to stake tokens", async function () {
            const amount = ethers.utils.parseUnits("100", "ether");

            await psp22Token.mint(owner.address, amount);
            await psp22Token.connect(owner).approve(stackingContract.address, amount);
            await stackingContract.connect(owner).stake(amount);

            const balance = await psp22Token.balanceOf(stackingContract.address);
            expect(balance).to.equal(amount);

            const stackedAmount = await stackingContract.stackedAmount(owner.address);
            expect(stackedAmount).to.equal(amount);
        });

        it("should not allow users to stake zero tokens", async function () {
            const amount = ethers.utils.parseUnits("0", "ether");
            await expect(stackingContract.connect(owner).stake(amount)).to.be.revertedWith("Amount should be greater than 0");
        });
    });

    describe("unstake", function () {
        it("should allow users to unstake tokens", async function () {
            const amount = ethers.utils.parseUnits("100", "ether");

            await psp22Token.mint(owner.address, amount);
            await psp22Token.connect(owner).approve(stackingContract.address, amount);
            await stackingContract.connect(owner).stake(amount);
            await stackingContract.connect(owner).unstake();

            const balance = await psp22Token.balanceOf(stackingContract.address);
            expect(balance).to.equal(0);

            const stackedAmount = await stackingContract.stackedAmount(owner.address);
            expect(stackedAmount).to.equal(0);
        });

        it("should not allow users to unstake tokens when they have none staked", async function () {
            await expect(stackingContract.connect(owner).unstake()).to.be.revertedWith("No stake to unstake");
        });
    });

    describe("claimRewards", function () {
        it("should allow users to claim their rewards", async function () {
            const amount = ethers.utils.parseUnits("100", "ether");
            await psp22Token.mint(owner.address, amount);
            await psp22Token.connect(owner).approve(stackingContract.address, amount);
            await stackingContract.connect(owner).stake(amount);

            const rewardBefore = await psp22Token.balanceOf(owner.address);
            await stackingContract.connect(owner).claimRewards();
            const rewardAfter = await psp22Token.balanceOf(owner.address);

            const rewardPerToken = await stackingContract.rewardPerToken();
            const expectedReward = BigInt(100) * BigInt(rewardPerToken);
            expect(rewardAfter.toString()).to.equal(rewardBefore.add(expectedReward).toString());
        })
    })
})
