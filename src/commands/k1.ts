import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInterface } from "../interface/CommandInterface";
import { errorHandler } from "../utils/errorHandler";
import DiscordJS, {
  Guild,
  GuildMember,
  Intents,
  Interaction,
  VoiceChannel,
} from "discord.js";

export const k1: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("k1")
    .setDescription("Some peace and quiet") as SlashCommandBuilder,
  run: async (interaction: any) => {
    interaction.reply({
      content: "Proceeding to K1",
      ephemeral: true,
    });
    var target: string = process.env.KEYVAN!;
    target = process.env.TEST!;
    await k1muter(target, 5, interaction.guild!);
    try {
      return;
    } catch (err) {
      errorHandler("edit command", err);
    }
  },
};
async function k1muter(who: string, duration: number, guild: DiscordJS.Guild) {
  const target = new Promise<string>((resolve, reject) => {
    guild?.members.fetch(who).then((member) => {
      resolve(member.voice.channelId as string);
    });
  });

  target.then((where) => {
    guild?.members.fetch(who).then((member) => {
      member.voice
        .setMute(true)
        .then(() => {
          console.log("The Hoe is Muted for " + duration + " seconds");
          setTimeout(() => {
            member.voice.setMute(false);
          }, duration * 1000);
        })
        .catch(console.error);
    });
  });
}
