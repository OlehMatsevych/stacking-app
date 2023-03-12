// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ReputationToken is ERC1155 {
    using SafeMath for uint256;

    uint256 public level1Threshold;
    uint256 public level2Threshold;
    uint256 public level3Threshold;

    mapping(address => uint256) public reputation;

    constructor() ERC1155("") {
        // Set thresholds for each level
        level1Threshold = 1e9;
        level2Threshold = 1e10;
        level3Threshold = 1e11;
    }

    function increaseReputation(address staker, uint256 amount) public {
        reputation[staker] = reputation[staker].add(amount);
    }

    function claimReputation(address staker) external {
        // Mint reputation tokens to staker
        uint256 amount = reputation[staker];
        require(amount > 0, "No reputation to claim");
        reputation[staker] = 0;

        if (amount >= level3Threshold) {
            _mint(staker, 1, 3, "");
            amount = amount.sub(level3Threshold);
        }
        if (amount >= level2Threshold) {
            _mint(staker, 1, 2, "");
            amount = amount.sub(level2Threshold);
        }
        if (amount >= level1Threshold) {
            _mint(staker, 1, 1, "");
        }

    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        // Mint reputation tokens upon reward distribution
        if (ids[0] == 0 && amounts.length > 0) {
            
            uint256 amount = amounts[0];
            increaseReputation(to, amount);
            _mint(to, 1, amount, data);
        }
    }
}
