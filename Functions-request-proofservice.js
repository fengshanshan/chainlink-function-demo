// This example shows how to make a call to an open API (no authentication required)
// to retrieve asset price from a symbol(e.g., ETH) to another symbol (e.g., USD)

// CryptoCompare API https://min-api.cryptocompare.com/documentation?key=Price&cat=multipleSymbolsFullPriceEndpoint

// Refer to https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const platform = args[0]
const identity = args[1]

// make HTTP request
const url = `https://proof-service.next.id/v1/proof`
console.log(`HTTP GET Request to ${url}?platform=${platform}&identity=${identity}`)

// construct the HTTP Request object. See: https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code
// params used for URL query parameters
// Example of query: https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD
const testAPIRequest = Functions.makeHttpRequest({
  url: url,
  params: {
    platform: platform,
    identity: identity,
  },
})

// Execute the API request (Promise)
const testAPIResponse = await testAPIRequest
if (testAPIResponse.error) {
  console.error(testAPIResponse.error)
  throw Error("Request failed")
}

const data = testAPIResponse["data"]
if (data.Response === "Error") {
  console.error(data.Message)
  throw Error(`Functional error. Read message: ${data.Message}`)
}

// extract the price
const avatar = data["ids"][0]["avatar"]
console.log(`resp is: ${avatar}`)

// Solidity doesn't support decimals so multiply by 100 and round to the nearest integer
// Use Functions.encodeUint256 to encode an unsigned integer to a Buffer
return Functions.encodeString(avatar)
