### Overview 
This branch, implemented a process that fetch the data from NextID [ProofService API](https://github.com/NextDotID/proof_server/blob/develop/docs/api.apib)

## Set the environment 
setting up the necessary configure in both network-config.js and hardhat-config.js

## Running steps:
1. config PRC_URL and PRIVATE_KEY is the first step 

2. run `npx hardhat functions-simulate --gaslimit 200000` to simulate (gaslimit defaults to 100,000, must update to 200000 otherwise it will fail)

3. run `npx hardhat functions-deploy-client --network NETWORK` to deploy the consumer contract to specific network (get the address of function consumer)

4. run `npx hardhat functions-sub-create --network NETWORK --amount 1 --contract YOUR_FUNCTION_CONSUMER_ADDRESS --gaslimit 200000`
if the running goes successfully, should get the Subscription ID from the output
```
......
Created subscription with ID: YOUR_SUBSCRIPTION_ID
Owner: ACCOUNT_ADDRESS
Balance: 1.0 LINK
1 authorized consumer contract:
[ 'YOUR_FUNCTION_CONSUMER_ADDRESS' ]
```

1. get the the result through `npx hardhat functions-request --subid YOUR_SUBSCRIPTION_ID --contract YOUR_FUNCTION_CONSUMER_ADDRESS --network NETWORK`

## Example of result

ℹ Transaction confirmed, see https://mumbai.polygonscan.com/tx/0x4f0c5745eff4e45a4004daaaaca954895c64cea77eed9d1777941ab88d14f941 for more details.
✔ Request 0x768a3759b2ad3be61348346844b34e47a55cb5ef1f7651bd5a36c61e15acf869 fulfilled! Data has been written on-chain.

Response returned to client contract represented as a hex string: 0x3078303264376335653031626564663163393933663430656333303264396266313632363230646165613933613731353563643961383031396165336132633261343736
Decoded as a string: 0x02d7c5e01bedf1c993f40ec302d9bf162620daea93a7155cd9a8019ae3a2c2a476

Actual amount billed to subscription #2007:

|  Type |  Amount |
|:---|:---|
|  Transmission cost:   | 0.0.000049675883400763 LINK   |
|   Base fee:  |    0.2 LINK |
|  Total cost:    |  0.200049675883400763 LINK   |

And also can check the response data from smart contract directly from here
https://mumbai.polygonscan.com/address/0xa6d51377d1b6f3c8570d024f974e669c69ef0929#readContract