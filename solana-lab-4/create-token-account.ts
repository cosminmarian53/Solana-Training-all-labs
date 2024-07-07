import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  ` Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);
// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "BWh7yKsxaAZGtjbKXvsyGgKgttKXYJkmBGKkEznWGqti"
);

const recipient = new PublicKey("4g8QnwiSYFAXfXwitmA3KxBU6qc2eybqinXWoV2steWz");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`✅ Created token Account: ${link}`);
