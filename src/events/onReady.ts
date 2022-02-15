import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";
import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { CommandList } from "../commands/_CommandList";
import { Client } from "discord.js";
export const onReady = async (BOT: Client): Promise<void> => {
  try {
    const rest = new REST({ version: "9" }).setToken(
      process.env.TOKEN as string
    );
    console.log("bot is ready!");

    globalThis.table = [
      { weight: 4, id: "tts" },
      { weight: 4, id: "kamran" },
      { weight: 1, id: "fail" },
    ];
    globalThis.voice_kamran = [
      { weight: 2, id: "./resources/3_s.mp3" },
      { weight: 3, id: "./resources/2.mp3" },
      { weight: 3, id: "./resources/3.mp3" },
      { weight: 3, id: "./resources/4.mp3" },
      { weight: 3, id: "./resources/5.mp3" },
      { weight: 3, id: "./resources/6.mp3" },
      { weight: 3, id: "./resources/7.mp3" },
    ];

    globalThis.voice_tts = [
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

    globalThis.voice_fail = [{ weight: 3, id: "./resources/fail.mp3" }];

    globalThis.voice_hassan_fail = [
      { weight: 2, id: "./resources/fail.mp3" },
      { weight: 3, id: "./resources/hassan_fail.mp3" },
      { weight: 3, id: "./resources/hassan_fail_3.mp3" },
      { weight: 3, id: "./resources/hassan_fail_2.mp3" },
    ];

    const commandData: {
      name: string;
      description?: string;
      type?: number;
      options?: APIApplicationCommandOption[];
    }[] = [];

    CommandList.forEach((command) =>
      commandData.push(
        command.data.toJSON() as {
          name: string;
          description?: string;
          type?: number;
          options?: APIApplicationCommandOption[];
        }
      )
    );
    await rest.put(
      Routes.applicationGuildCommands(
        BOT.user?.id || "missing token",
        process.env.OLG as string
      ),
      { body: commandData }
    );
    logHandler.log("info", "Bot has connected to Discord!");
  } catch (err) {
    errorHandler("onReady event", err);
  }
};
