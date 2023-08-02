### Overview 
[Step by step guide url](https://docs.chain.link/chainlink-functions/getting-started)

## Set the environment 
setting up the necessary configure in both network-config.js and hardhat-config.js

## Running steps:
1. config PRC_URL and PRIVATE_KEY is the first step 

2. run `npx hardhat functions-simulate` to simulate

3. run `npx hardhat functions-deploy-client --network NETWORK` to deploy the consumer contract to specific network (get the address of function consumer)

4. run `npx hardhat functions-sub-create --network NETWORK --amount 1 --contract YOUR_FUNCTION_CONSUMER_ADDRESS`
if the running goes successfully, should get the Subscription ID from the output
```
......
Created subscription with ID: YOUR_SUBSCRIPTION_ID
Owner: ACCOUNT_ADDRESS
Balance: 1.0 LINK
1 authorized consumer contract:
[ 'YOUR_FUNCTION_CONSUMER_ADDRESS' ]
```

5. get the the result through `npx hardhat functions-request --subid YOUR_SUBSCRIPTION_ID --contract YOUR_FUNCTION_CONSUMER_ADDRESS --network NETWORK`

## Example of result

Consumer Contract Address: 0xa6d51377d1b6f3c8570D024f974e669C69ef0929

Response returned to client contract represented as a hex string: 0x00000000000000000000000000000000000000000000000000000000000f50ed
Decoded as a uint256: 1003757

Actual amount billed to subscription #1873:

|  Type |  Amount |
|:---|:---|
|  Transmission cost:   | 0.000095387476493105 LINK   |
|   Base fee:  |    0.2 LINK |
|  Total cost:    |  0.200095387476493105 LINK   |

