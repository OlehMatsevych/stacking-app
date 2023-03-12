# Sample Hardhat Project
Staking application allowing users to stake a specific PSP22 (ERC20) token, and
the app will accumulate user rewards. Users will get some kind of reputation for staking
tokens in the application

## The application would consist of several components:

### PSP22 (ERC20) token
1) initial supply of 1 billion
2) 70% will be sent to the staking contract
3) 18 decimals

### Staking contract
1) allows users to stake the created PSP22 token
2) the stakers will get their share of the tokens inside the staking contract, with
50% of the tokens being released during the first 365 days and a halving
occurring each 365 days
- so during the first 365 days, 50% of the tokens in the staking contract
would be distributed to the stakers (35% of the initial supply)
- during the next 365 days, 25% of the tokens in the staking contract
would be distributed (17.5% of the initial supply)
- 12.5% of the tokens in staking contract in the next 365 days, and so
on
3) the users can stake, unstake and claim rewards
4) the reward distribution would happen on any of these actions


### Reputation token
1) NFT token - Multitoken (ERC1155)]
2) Rewarded to stakers on certain milestones
3) Staking 1 token (10**18 tokens) for 1 day increases reputation by 1
4) Reputation levels:
- Level 1: 1 billion reputation
- Level 2: 10 billion reputation
- Level 3: 100 billion reputation
- amount of levels can be infinite
5) the users can call the claim reputation function, which would mint the rep.
token to them
6) Tokens will be minted on any of the reward distributions or upon calling the
claim reputation function


Build:

```shell
npm i
npm run build 

// Test commands:
npm run test
npm run test:coverage


![image](https://user-images.githubusercontent.com/59181255/224518618-d7f85369-f614-4843-8e88-66caec423fb9.png)
