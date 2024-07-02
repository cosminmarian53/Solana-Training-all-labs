import "dotenv/config";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";

import bs58 from "bs58";
async function checkBalance() {
  // Connect to the Solana network
  const connection = new Connection(clusterApiUrl("devnet"));
  console.log("💘Connected to the devnet cluster");

  const publicKey = new PublicKey(
    "8P6G7qy5P3FxzdXZRz9nSK5Gvy8bzVBhaBwn3cnaZkBT"
  );

  const keypair = Keypair.generate();
  const privateKey = bs58.encode(keypair.secretKey);

  try {
    // Get the balance of the account
    const balance = await connection.getBalance(publicKey);
    const solBalance = balance / LAMPORTS_PER_SOL;
    console.log("🎉Successfully checked the balance");
    // Print the balance
    console.log(
      `🤑Account balance for ${publicKey} in Lamports: ${balance} Lamports`
    );
    console.log(
      `🍞Account balance for ${publicKey} in 💲SOL: ${solBalance} SOL`
    );
  } catch (error) {
    console.error("😠Failed to check balance:", error);
  }
}

checkBalance();
