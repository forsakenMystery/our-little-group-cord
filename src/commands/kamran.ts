import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInterface } from "../interface/CommandInterface";
import { errorHandler } from "../utils/errorHandler";
import { sentence } from "../utils/helper";
import { getStats } from "../modules/getStats";
import { updateStats } from "../modules/updateStats";

export const kamran: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("kamran")
    .setDescription("Going on a Tour with nuisance") as SlashCommandBuilder,
  run: async (interaction: any) => {
    try {
      interaction.reply({
        content: "soon enough!",
        ephemeral: true,
      });
      var target: string = process.env.KAMRAN!;

      await sentence(target, interaction.guild!, interaction.member?.user.id!);

      const callerUpdate = await getStats(
        interaction.member?.user.id!,
        interaction.member?.user.tag!.split("#")[0]
      );

      if (!callerUpdate) {
        await interaction.editReply({
          content:
            "There was an error with the database lookup. Please try again later.",
        });
        return;
      }
      await updateStats(callerUpdate, globalThis.successful, 1, 1);
    } catch (err) {
      errorHandler("kamran command", err);
    }
  },
};
