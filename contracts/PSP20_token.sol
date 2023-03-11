// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PSP22Token is ERC20 {
    constructor() ERC20("PSP22", "PSP22") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
    
    function transferToStaking(address staking, uint256 amount) external {
        transfer(staking, amount);
    }
}