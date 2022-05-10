const sha256 = require('sha256');
const EC = require('elliptic').ec;
const ec = new EC("secp256k1");
const axios = require('axios');

/*
 Backend API endpoints
 */
const api = "https://node.deso.org";
const apiAuthorize = "/api/v0/authorize-derived-key";
const apiSubmit = "/api/v0/submit-transaction";

/*
 Payload from DeSo Identity after using the /derive window API endpoint
 */

// Access signature is a certificate signed by the master public key
const accessSignature = "3046022100935167b22ad5b6446092dfbb63321c31978daa89d86593881fae6fc3e4b5d68502210087bcc2befe4ebd9ce4da9c21408fd107946d91551475eb3185500f5791173ca7";
// Private key of the derived key
const derivedSeedHex = "5eb9b474328b63d463c7d5f815166c39c7e89cfad3e6431445e2364b106676a7";
// Public key of the derived key
const derivedPublicKey = "BC1YLftDyYbG63yCy2MaZ9cMPpyCPxp74GyC2VsYYLc363HQG1xryFx";
// Master public key
const publicKey = "BC1YLjL7iWeo7gGmyc9PCevqUF7AUdpSY7mJgz6V1uTJQLmpNRPBtWJ";
// When the derived key expires
const expirationBlock = 14423;

/*
 Authorize a derived key logic
 */

// authorizeDerivedKey();
async function authorizeDerivedKey() {
    // Step 1. Construct an authorize transaction by sending a request to `/api/v0/authorize-derived-key`
    let payload =  {
        OwnerPublicKeyBase58Check: publicKey,
        DerivedPublicKeyBase58Check: derivedPublicKey,
        ExpirationBlock: expirationBlock,
        AccessSignature: accessSignature,
        DeleteKey: false,
        DerivedKeySignature: true,
        MinFeeRateNanosPerKB: 1000
    }
    let res = await axios.post(api + apiAuthorize, payload);
    const transactionHex = res.data.TransactionHex;

    // Step 2. Sign transaction with derived seed hex
    const signedTransaction = signTransaction(derivedSeedHex, transactionHex);

    // Step 3. Submit the transaction
    payload = {
        TransactionHex : signedTransaction
    }
    res = await axios.post(api + apiSubmit, payload)
    console.log(res);
}

/*
 Helper functions
 */

// Serialize a number into an 8-byte array. This is a copy/paste primitive, not worth
// getting into the details.
function uvarint64ToBuf (uint) {
    const result = [];

    while (uint >= 0x80) {
        result.push((uint & 0xFF) | 0x80);
        uint >>>= 7;
    }

    result.push(uint | 0);

    return new Buffer(result);
}

// Sign transaction with seed
function signTransaction (seed, txnHex) {
    const privateKey = ec.keyFromPrivate(seed);
    const transactionBytes = new Buffer(txnHex, 'hex');
    const transactionHash = new Buffer(sha256.x2(transactionBytes), 'hex');
    const signature = privateKey.sign(transactionHash);
    const signatureBytes = new Buffer(signature.toDER());
    const signatureLength = uvarint64ToBuf(signatureBytes.length);
    const signedTransactionBytes = Buffer.concat([
        transactionBytes.slice(0, -1),
        signatureLength,
        signatureBytes
    ])
    return signedTransactionBytes.toString('hex');
}
// console.log(signTransaction(derivedSeedHex,"01205217fe67f56527c55d73d8b3f0d05a5e0029f07199b19e805c9b8bddbe0125000103e1edf9d158af48de6a4e446f0f5d7d2ab1b52454e931401b5c6171d44f9adc6ca7aae204052a0000197b22426f6479223a226465726963206973207369636b2e227de807d461bcfbf791baf7e9f616002103e1edf9d158af48de6a4e446f0f5d7d2ab1b52454e931401b5c6171d44f9adc6c0000"));

export default signTransaction;
