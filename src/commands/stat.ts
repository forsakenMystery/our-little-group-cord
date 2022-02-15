import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInterface } from "../interface/CommandInterface";
import { errorHandler } from "../utils/errorHandler";
import { k1muter } from "../utils/helper";

export const stat: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("k1")
    .setDescription("Some peace and quiet") as SlashCommandBuilder,
  run: async (interaction: any) => {
    try {
      console.log("shit");
      return;
    } catch (err) {
      errorHandler("edit command", err);
    }
  },
};
