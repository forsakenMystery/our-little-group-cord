import DiscordJS, {
  Guild,
  GuildMember,
  Intents,
  Interaction,
  VoiceChannel,
} from "discord.js";
import dotenv from "dotenv";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  AudioResource,
} from "@discordjs/voice";

dotenv.config();
const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});

client.on("ready", () => {
  console.log("bot is ready!");
  let guildID: string = process.env.OLG!;
  const guild = client.guilds.cache.get(guildID);
  let commands;
  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }
  commands?.create({
    name: "kamran",
    description: "kick the nuisance!",
  });
});

client.on("messageCreate", (message) => {
  if (message.content === "!kamran") {
    message.reply({
      content: "soon i will kick the nuisance!",
    });
  }
});

async function gulag(who: string, guild: DiscordJS.Guild, caller: string) {
  const target = new Promise<string>((resolve, reject) => {
    guild?.members.fetch(who).then((member) => {
      resolve(member.voice.channelId as string);
    });
  });
  const aimer = new Promise<string>((resolve, reject) => {
    guild?.members.fetch(caller).then((member) => {
      resolve(member.voice.channelId as string);
    });
  });
  target.then((where) => {
    aimer.then((wheee) => {
      if (wheee === where) {
        guild?.members.fetch(who).then((member) => {
          member.voice
            .setChannel(process.env.GULAG!)
            .then(() => {
              console.log("yay tranquility");
            })
            .catch(console.error);
        });
        setTimeout(() => {
          guild?.members.fetch(who).then((member) => {
            member.voice
              .setChannel(where)
              .then(() => {
                console.log("whale cum black");
              })
              .catch(console.error);
          });
        }, 3000);
      } else {
        console.log("not in a same place");
      }
    });
  });
}

async function join_and_voice(who: string, guild: DiscordJS.Guild) {
    const target = new Promise<string>((resolve, reject) => {
        guild?.members.fetch(who).then((member) => {
          resolve(member.voice.channelId as string);
        });
      });
      
      target.then((where) => {
        const connection = joinVoiceChannel({
            channelId: where,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator!,
        });
        const audioplayer = createAudioPlayer();
        connection.subscribe(audioplayer);
      })

}


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName, options } = interaction;
  if (commandName === "kamran") {
    interaction.reply({
      content: "soon enough!",
      ephemeral: true,
    });
    const target: string = process.env.KAMRAN!;
    
    


    
    // let resource = createAudioResource(createReadStream(join(__dirname, 'resources/try.mp3')), {
    //     inlineVolume : true
    // });
    await gulag(process.env.TEST!, interaction.guild!, interaction.member?.user.id!);

    await join_and_voice(process.env.TEST!, interaction.guild!)


    
    
    


    // connection.subscribe(player);
    // player.play(resource)
    // console.log("done");

    // await interaction.reply('I have joined the voice channel!');
  
  }
});

client.login(process.env.TOKEN);
