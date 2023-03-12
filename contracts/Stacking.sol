// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './PSP20Token.sol';
import './ReputationToken.sol';

contract StackingContract {
    PSP22Token public psp22Token;
    mapping(address => uint256) public stackedAmount;
    mapping(address => uint256) public lastStakeTimestamp;

    ReputationToken public reputationToken;
    uint256 public totalStakedAmount;
    uint256 public rewardPerToken;
    uint256 public lastRewardTimestamp;
    uint256 public constant REWARD_DURATION = 365 days;

    constructor(address _psp22Token, address _reputationToken){
        psp22Token = PSP22Token(_psp22Token);
        reputationToken = ReputationToken(_reputationToken);

        psp22Token.mint(address(this), 100 * 10 ** 18);

        lastRewardTimestamp = block.timestamp;
        rewardPerToken = 0;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount should be greater than 0");

        updateReward();
        psp22Token.transferToStaking(address(this), amount);
        stackedAmount[msg.sender] += amount;
        totalStakedAmount += amount;
        lastStakeTimestamp[msg.sender] = block.timestamp;
        
        reputationToken.increaseReputation(msg.sender, amount);
    }

    function unstake() external {
        require(stackedAmount[msg.sender] > 0, "No stake to unstake");
        updateReward();
        uint256 amount = stackedAmount[msg.sender];
        psp22Token.transfer(msg.sender, amount);
        stackedAmount[msg.sender] = 0;
        totalStakedAmount -= amount;
        lastStakeTimestamp[msg.sender] = 0;
    }

    function claimRewards() external {
        updateReward();
        require(stackedAmount[msg.sender] > 0, "No stake to claim reward");
        uint256 reward = (stackedAmount[msg.sender] * rewardPerToken) / (10 ** 18);
        psp22Token.transfer(msg.sender, reward);
        
        reputationToken.claimReputation(msg.sender);
    }


    function updateReward() internal {
        if(totalStakedAmount == 0){
            return;
        }
        uint256 rewardDuration = block.timestamp - lastRewardTimestamp;
        uint256 rewardAmount = (totalStakedAmount * rewardDuration) / REWARD_DURATION;
        rewardPerToken += (rewardAmount*10 ** 18)/totalStakedAmount;
        lastRewardTimestamp = block.timestamp;
    }
}