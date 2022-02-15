import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInterface } from "../interface/CommandInterface";
import { errorHandler } from "../utils/errorHandler";

export const kamran: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("kamran")
    .setDescription("Going on a Tour with nuisance") as SlashCommandBuilder,
  run: async (interaction: any) => {
    console.log("FFFF");
    try {
      return;
    } catch (err) {
      errorHandler("edit command", err);
    }
  },
};
