import { validateEnv } from "./utils/validateEnv";
import { Client } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";
import { IntentOptions } from "./config/IntentOptions";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  validateEnv();

  const BOT = new Client({ intents: IntentOptions });

  BOT.on("ready", async () => await onReady(BOT));

  BOT.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
  );

  await connectDatabase();

  await BOT.login(process.env.TOKEN as string);
})();
