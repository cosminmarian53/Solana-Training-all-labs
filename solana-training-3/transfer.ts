import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

const sender = getKeypairFromEnvironment("SECRET_KEY");
console.log("Sender address:", sender.publicKey.toBase58());

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const receiver = new PublicKey("E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS");

const balance = await connection.getBalance(sender.publicKey);
console.log("Sender balance:", balance / LAMPORTS_PER_SOL);
