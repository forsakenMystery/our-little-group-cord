import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInterface } from "../interface/CommandInterface";
import { errorHandler } from "../utils/errorHandler";
import { sentence } from "../utils/helper";

export const kamran: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("kamran")
    .setDescription("Going on a Tour with nuisance") as SlashCommandBuilder,
  run: async (interaction: any) => {
    interaction.reply({
      content: "soon enough!",
      ephemeral: true,
    });
    var target: string = process.env.KAMRAN!;
    target = process.env.TEST!;

    await sentence(target, interaction.guild!, interaction.member?.user.id!);
    try {
      return;
    } catch (err) {
      errorHandler("kamran command", err);
    }
  },
};
