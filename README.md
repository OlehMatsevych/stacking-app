# Sample Hardhat Project
Staking application allowing users to stake a specific PSP22 (ERC20) token, and
the app will accumulate user rewards. Users will get some kind of reputation for staking
tokens in the application

## The application would consist of several components:

### PSP22 (ERC20) token
  ○ initial supply of 1 billion
  ○ 70% will be sent to the staking contract
  ○ 18 decimals

### Staking contract
#### allows users to stake the created PSP22 token
#### the stakers will get their share of the tokens inside the staking contract, with
50% of the tokens being released during the first 365 days and a halving
occurring each 365 days
1) so during the first 365 days, 50% of the tokens in the staking contract
would be distributed to the stakers (35% of the initial supply)
2) during the next 365 days, 25% of the tokens in the staking contract
would be distributed (17.5% of the initial supply)
3) 12.5% of the tokens in staking contract in the next 365 days, and so
on
#### the users can stake, unstake and claim rewards
#### the reward distribution would happen on any of these actions
Try running some of the following tasks:

```shell
npm run build
npm run test
REPORT_GAS=true npx hardhat test
