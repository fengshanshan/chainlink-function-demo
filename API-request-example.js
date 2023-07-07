// This example shows how to make a decentralized price feed using multiple APIs

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const platformParam = args[0]
const identityParam = args[1]

// To make an HTTP request, use the Functions.makeHttpRequest function
// Functions.makeHttpRequest function parameters:
// - url
// - method (optional, defaults to 'GET')
// - headers: headers supplied as an object (optional)
// - params: URL query parameters supplied as an object (optional)
// - data: request body supplied as an object (optional)
// - timeout: maximum request duration in ms (optional, defaults to 10000ms)
// - responseType: expected response type (optional, defaults to 'json')

// Use multiple APIs & aggregate the results to enhance decentralization
const connectionRequest = Functions.makeHttpRequest({
  url: `https://proof-service.nextnext.id/v1/proof?platform=${platformParam}&identity=${identityParam}`,
})

// First, execute all the API requests are executed concurrently, then wait for the responses
const [connectionResponse] = await Promise.all([connectionRequest])

let avatar = ""

if (!connectionResponse.error) {
  avatar = connectionResponse.data["ids"][0]["avatar"]
} else {
  console.log("connectionResponse Error")
}

// The source code MUST return a Buffer or the request will return an error message
// Use one of the following functions to convert to a Buffer representing the response bytes that are returned to the client smart contract:
// - Functions.encodeUint256
// - Functions.encodeInt256
// - Functions.encodeString
// Or return a custom Buffer for a custom byte encoding
return Functions.encodeString(avatar)
