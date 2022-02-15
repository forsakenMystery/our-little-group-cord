import { Guild } from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import { createReadStream } from "fs";
import { getAudioDurationInSeconds } from "get-audio-duration";
var rwc = require("random-weighted-choice");

async function gulag(who: string, guild: Guild, caller: string) {
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

async function sentence(who: string, guild: Guild, caller: string) {
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
    let resource = createAudioResource(createReadStream(file));

    const subscribtion = connection.subscribe(player);

    player.play(resource);
    if (subscribtion) {
      getAudioDurationInSeconds(file).then((duration: any) => {
        setTimeout(() => {
          subscribtion.unsubscribe();
          connection.destroy();
          gulag(who, guild, caller);
        }, (duration + 2) * 1000);
      });
    }
  });
}

function choose(caller: string): string {
  const what_to_do: string = rwc(globalThis.table);
  globalThis.table.forEach((element: any) => {
    if (element.id === what_to_do) {
      if (what_to_do === "fail") {
        element.weight = 1;
      } else {
        element.weight = 4;
      }
    } else {
      element.weight++;
    }
  });
  let decision: string;
  if (what_to_do === "tts") {
    decision = rwc(globalThis.voice_tts);
    globalThis.voice_tts.forEach((element: any) => {
      if (element.id === decision) {
        if (
          decision === "./resources/1_s.mp3" ||
          decision === "./resources/2_s.mp3"
        ) {
          element.weight = 2;
        } else {
          element.weight = 3;
        }
      } else {
        element.weight++;
      }
    });
  } else if (what_to_do === "kamran") {
    decision = rwc(globalThis.voice_kamran);
    globalThis.voice_kamran.forEach((element: any) => {
      if (element.id === decision) {
        if (decision === "./resources/3_s.mp3") {
          element.weight = 2;
        } else {
          element.weight = 3;
        }
      } else {
        element.weight++;
      }
    });
  } else {
    //add hassan as caller
    if (caller === process.env.HASSAN!) {
      decision = rwc(globalThis.voice_hassan_fail);
      globalThis.voice_hassan_fail.forEach((element: any) => {
        if (element.id === decision) {
          if (decision === "./resources/fail.mp3") {
            element.weight = 2;
          } else {
            element.weight = 3;
          }
        } else {
          element.weight++;
        }
      });
    } else {
      decision = rwc(voice_fail);
    }
  }
  return decision;
}

async function k1muter(who: string, duration: number, guild: Guild) {
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

export { sentence as sentence };
export { k1muter as k1muter };
