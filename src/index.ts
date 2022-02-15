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
const { MongoClient } = require("mongodb");
var rwc = require("random-weighted-choice");

var table:any;
var voice_kamran:any;
var voice_tts:any;
var voice_fail:any;
var voice_hassan_fail:any;


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
  table = [
    { weight: 4, id: "tts" }, 
    { weight: 4, id: "kamran" }, 
    { weight: 1, id: "fail" }, 
  ];
  voice_kamran = [
    { weight: 2, id: "./resources/3_s.mp3" }, 
    { weight: 3, id: "./resources/2.mp3" }, 
    { weight: 3, id: "./resources/3.mp3" }, 
    { weight: 3, id: "./resources/4.mp3" }, 
    { weight: 3, id: "./resources/5.mp3" }, 
    { weight: 3, id: "./resources/6.mp3" }, 
    { weight: 3, id: "./resources/7.mp3" }, 
  ];
  
  voice_tts = [
    { weight: 2, id: "./resources/1_s.mp3" }, 
    { weight: 3, id: "./resources/1.mp3" }, 
    { weight: 2, id: "./resources/2_s.mp3" }, 
    { weight: 3, id: "./resources/8.mp3" }, 
    { weight: 3, id: "./resources/9.mp3" }, 
    { weight: 3, id: "./resources/10.mp3" }, 
    { weight: 3, id: "./resources/11.mp3" }, 
    { weight: 3, id: "./resources/12.mp3" }, 
    { weight: 3, id: "./resources/13.mp3" }, 
    { weight: 3, id: "./resources/14.mp3" }, 
    { weight: 3, id: "./resources/15.mp3" }, 
    { weight: 3, id: "./resources/16.mp3" }, 
    { weight: 3, id: "./resources/17.mp3" }, 
    { weight: 3, id: "./resources/18.mp3" }, 
    { weight: 3, id: "./resources/19.mp3" }, 
    { weight: 3, id: "./resources/20.mp3" },
  ];
  
  voice_fail = [
    { weight: 3, id: "./resources/fail.mp3" },
  ];

  voice_hassan_fail = [
    { weight: 2, id: "./resources/fail.mp3" },
    { weight: 3, id: "./resources/hassan_fail.mp3" },
    { weight: 3, id: "./resources/hassan_fail_3.mp3" },
    { weight: 3, id: "./resources/hassan_fail_2.mp3" },
  ]
  

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



function choose(caller:string):string{
  const what_to_do:string = rwc(table)
  table.forEach((element:any) => {
    if(element.id === what_to_do){
      if(what_to_do==="fail"){
        element.weight=1
      }
      else{
        element.weight=4
      }
    }else{
      element.weight++
    }
  });
  let decision:string
  if(what_to_do==="tts"){
    decision=rwc(voice_tts)
    voice_tts.forEach((element:any) => {
      if(element.id === decision){
        if(decision==="./resources/1_s.mp3" || decision==="./resources/2_s.mp3"){
          element.weight=2
        }
        else{
          element.weight=3
        }
      }else{
        element.weight++
      }
    });
  }else if(what_to_do==="kamran"){
    decision=rwc(voice_kamran)
    voice_kamran.forEach((element:any) => {
      if(element.id === decision){
        if(decision==="./resources/3_s.mp3"){
          element.weight=2
        }
        else{
          element.weight=3
        }
      }else{
        element.weight++
      }
    });
  }else{
    //add hassan as caller
    if(caller===process.env.HASSAN!){
      decision=rwc(voice_hassan_fail)
      voice_hassan_fail.forEach((element:any) => {
        if(element.id === decision){
          if(decision==="./resources/fail.mp3"){
            element.weight=2
          }
          else{
            element.weight=3
          }
        }else{
          element.weight++
        }
      });
    }
    else{
      decision=rwc(voice_fail)
    }
  }
  return decision;
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
    const file = choose(caller);
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
