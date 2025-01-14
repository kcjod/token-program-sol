const { getOrCreateAssociatedTokenAccount, mintTo } = require('@solana/spl-token');
const { Keypair, Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');

const payer = Keypair.fromSecretKey(Uint8Array.from());

const mintAthority = payer;

const connection = new Connection(clusterApiUrl('devnet'));

async function mintNewTokens(mint, to, amount) { 
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        new PublicKey(to)
      );

      console.log('Token account created at', tokenAccount.address.toBase58());
      await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        amount
      )
      console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
}

async function main() {
    const mint = await createMintForToken(payer, mintAthority.publicKey);
    await mintNewTokens(mint, mintAthority.publicKey, 100);    
}

main();
