import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(
  `🤖Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

// Add the recipient public key here
const recipient = new PublicKey("BnGZm5nFTAGBqJF9zGhporYvA4vTXHG1zfnMWJGXVuh");

// Subtitute in your token mint account
const tokenMintAccount = new PublicKey(
  "BWh7yKsxaAZGtjbKXvsyGgKgttKXYJkmBGKkEznWGqti"
);
// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 1);
console.log(`💠 Attempting to send 1 token to ${recipient.toBase58()}...`);

// Get or create the source and destination token accounts to store this token
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  user.publicKey
);
const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient
);
// Transfer the tokens
const signature = await transfer(
  connection,
  user,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  user,
  1 * MINOR_UNITS_PER_MAJOR_UNITS
);
const explorerLink = getExplorerLink("transaction", signature, "devnet");
console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);
