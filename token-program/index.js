const { createMint } = require('@solana/spl-token');
const { Keypair, Connection, clusterApiUrl,  TOKEN_PROGRAM_ID } = require('@solana/web3.js');

const payer = Keypair.fromSecretKey(Uint8Array.from());

const mintAthority = payer;

const connection = new Connection(clusterApiUrl('devnet'));
const localConnection = new Connection("http:localhost:8899","confirmed");  // for local validator

async function createMintForToken(payer, mintAuthority) {
    const mint = await createMint(
        connection,
        payer,
        mintAuthority,
        null,
        6,
        TOKEN_PROGRAM_ID
    );
    console.log('Mint created at', mint.toBase58());
    return mint;
}

async function main() {
    const mint = await createMintForToken(payer, mintAthority.publicKey);
}

main();
