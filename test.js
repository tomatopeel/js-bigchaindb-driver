
const driver = require('./dist/node/index')

const API_PATH = 'https://test.ipdb.io/api/v1/'

const alice = new driver.Ed25519Keypair()

const tx = driver.Transaction.makeCreateTransaction(
        { assetMessage: 'My very own asset...' },
        { metaDataMessage: 'wrapped in a transaction' },
        // A transaction needs an output
        // `driver.Transaction.makeOutput()`: requires a crypto-condition
        // `driver.Transaction.makeEd25519Condition()`: simple public key output
        [ driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(alice.publicKey))
        ],
        alice.publicKey
        )

const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)

let conn = new driver.Connection(
    API_PATH,
    {
        'Content-Type': 'application/json',
        'app_id': '9919db49',
        'app_key': '426630417dcce050654b0a29a37ed5a2'
    }
)

conn.postTransaction(txSigned)
    .then((res) => {
        console.log(res)
    })
