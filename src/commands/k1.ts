import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInterface } from "../interface/CommandInterface";
import { errorHandler } from "../utils/errorHandler";
import { k1muter } from "../utils/helper";

export const k1: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("k1")
    .setDescription("Some peace and quiet") as SlashCommandBuilder,
  run: async (interaction: any) => {
    try {
      interaction.reply({
        content: "Proceeding to K1",
        ephemeral: true,
      });
      var target: string = process.env.KEYVAN!;
      await k1muter(target, 5, interaction.guild!);

      return;
    } catch (err) {
      errorHandler("edit command", err);
    }
  },
};
