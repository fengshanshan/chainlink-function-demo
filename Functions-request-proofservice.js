// This example shows how to make a call to an open API (no authentication required)
// to retrieve asset price from a symbol(e.g., ETH) to another symbol (e.g., USD)

// CryptoCompare API https://min-api.cryptocompare.com/documentation?key=Price&cat=multipleSymbolsFullPriceEndpoint

// Refer to https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const platformParam = args[0]
const identityParam = args[1]

// make HTTP request
const url = `https://proof-service.nextnext.id/v1/proof`
console.log(`HTTP GET Request to ${url}?fsyms=${fromSymbol}&tsyms=${toSymbol}`)

// construct the HTTP Request object. See: https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code
// params used for URL query parameters
// Example of query: https://proof-service.nextnext.id/v1/proof?platform=nextid&identity=0x02d7c5e01bedf1c993f40ec302d9bf162620daea93a7155cd9a8019ae3a2c2a476
const connectRequest = Functions.makeHttpRequest({
  url: url,
  params: {
    platform: platformParam,
    identity: identityParam,
  },
})

// Execute the API request (Promise)
const connectionResponse = await connectRequest
if (connectionResponse.error) {
  console.error(connectionResponse.error)
  throw Error("Request failed")
}

const data = connectionResponse["data"]
if (data.Response === "Error") {
  console.error(data.Message)
  throw Error(`Functional error. Read message: ${data.Message}`)
}

// extract the price
const avatar = data["ids"][0]["avatar"]
console.log(`The avatar of ${identityParam} in ${platformParam} is  ${avatar}`)

// Solidity doesn't support decimals so multiply by 100 and round to the nearest integer
// Use Functions.encodeUint256 to encode an unsigned integer to a Buffer
return Functions.encodeString(avatar)
