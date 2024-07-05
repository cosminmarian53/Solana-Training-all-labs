import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const account = getKeypairFromEnvironment("SECRET_KEY");

const createTokenAccount = async () => {
  const mint = await createMint(
    connection,
    account,
    account.publicKey,
    null,
    9
  );
};
