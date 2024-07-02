import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";
const sender = getKeypairFromEnvironment("SECRET_KEY");
console.log("Sender address:", sender.publicKey.toBase58());

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const receiver = new PublicKey("E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS");

console.log("Receiver address:", receiver.toBase58());

const balance = await connection.getBalance(sender.publicKey);
console.log("Sender balance:", balance / LAMPORTS_PER_SOL);

const transaction = new Transaction();

const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver,
  lamports: 0.01 * LAMPORTS_PER_SOL,
});

transaction.add(transferInstruction);

const memo = "💋🤑";
const memoInstruction = createMemoInstruction(memo);
transaction.add(memoInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log("Transaction confirmed! Signature:", signature);

const balanceAfterTransaction = await connection.getBalance(receiver);

console.log(
  "Receiver balance after transaction:",
  balanceAfterTransaction / LAMPORTS_PER_SOL
);