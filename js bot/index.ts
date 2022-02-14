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
  AudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  AudioResource,
  generateDependencyReport,
} from "@discordjs/voice";
import { createReadStream } from "fs";
import {getAudioDurationInSeconds} from "get-audio-duration";

let testValues:any;
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
  testValues = [{
    value : './resources/1.mp3',
    probability: 0.3
},
{
    value : './resources/2.mp3',
    probability: 0.6
},
{
    value : './resources/fail.mp3',
    probability: '*'
}]
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

const randomizer = (values:any) => {
  let i, pickedValue,
          randomNr = Math.random(),
          threshold = 0;

  for (i = 0; i < values.length; i++) {
      if (values[i].probability === '*') {
          continue;
      }

      threshold += values[i].probability;
      if (threshold > randomNr) {
              pickedValue = values[i].value;
              break;
      }

      if (!pickedValue) {
          //nothing found based on probability value, so pick element marked with wildcard
          pickedValue = values.filter((value:any) => value.probability === '*');
      }
  }

  return pickedValue;
}

function choose():string{
  

  return randomizer(testValues);
}

async function sentence(who: string, guild: DiscordJS.Guild, caller: string) {
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
    const player = createAudioPlayer();
    const file = choose();
    let resource = createAudioResource(
      createReadStream(file)
    );

    const subscribtion = connection.subscribe(player);

    player.play(resource);
    if (subscribtion) {
      getAudioDurationInSeconds(file).then((duration)=>{
        setTimeout(() => {
          subscribtion.unsubscribe();
          connection.destroy();
          gulag(who, guild, caller);
        }, (duration+2)*1000);
      })
    }
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
    const player = createAudioPlayer();
    let resource = createAudioResource(
      createReadStream("./resources/try.mp3")
    );

    const subscribtion = connection.subscribe(player);

    player.play(resource);
    if (subscribtion) {
      getAudioDurationInSeconds('./resources/try.mp3').then((duration)=>{
        setTimeout(() => {
          subscribtion.unsubscribe();
          connection.destroy();
        }, (duration+10)*1000);
      })
    }
  });
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
    var target: string = process.env.KAMRAN!;
    target = process.env.TEST!;



    await sentence(target, interaction.guild!, interaction.member?.user.id!);

  }
});

client.login(process.env.TOKEN);
