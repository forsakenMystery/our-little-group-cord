import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInterface } from "../interface/CommandInterface";
import { errorHandler } from "../utils/errorHandler";

export const stat: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("stat")
    .setDescription("Showing your stat") as SlashCommandBuilder,
  run: async (interaction: any) => {
    try {
      console.log("shit");
      return;
    } catch (err) {
      errorHandler("edit command", err);
    }
  },
};
