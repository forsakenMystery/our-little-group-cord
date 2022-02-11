import DiscordJS, { Guild, GuildMember, Intents, Interaction } from 'discord.js'
import dotenv from 'dotenv'
import {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} from '@discordjs/voice';

dotenv.config()
const client = new DiscordJS.Client(
    {
        intents:[
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_INTEGRATIONS
        ]
    }
)

client.on('ready', ()=>{
    console.log("bot is ready!")
    let guildID:string = process.env.OLG!
    const guild = client.guilds.cache.get(guildID)
    let commands
    if (guild){
        commands = guild.commands
    }
    else{
        commands = client.application?.commands
    }
    commands?.create({
        name: "kamran",
        description: "kick the nuisance!"
    }
    )
})

client.on('messageCreate', (message)=>{
    if(message.content==="!kamran"){
        message.reply({
            content: 'soon i will kick the nuisance!'
        })
    }
})


function gulag(who:string, guild:DiscordJS.Guild, caller:string){
    const target = new Promise<string>((resolve, reject) => {
        
        guild?.members.fetch(who).then((member)=> {
            resolve(member.voice.channelId as string);
        })
    });
    const aimer = new Promise<string>((resolve, reject) => {
        
        guild?.members.fetch(caller).then((member)=> {
            resolve(member.voice.channelId as string);
        })
    });
    target.then(where=>{
        aimer.then(wheee=>{
            if(wheee===where){
                guild?.members.fetch(who).then(member => {
                    member.voice.setChannel(process.env.GULAG!).then(()=>{
                        console.log("yay")
                    }).catch(console.error)
                })
                setTimeout(() => {   
                    guild?.members.fetch(who).then(member => {
                        member.voice.setChannel(where).then(()=>{
                            console.log("whale cum black")
                        }).catch(console.error)
                    })
                }, 3000);
            }
            else{
                console.log("not in a same place")
            }
        })
        
    })


}




client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()){
        return
    }
    const {commandName, options} = interaction
    if(commandName==='kamran'){
        interaction.reply({
            content: "soon enough!",
            ephemeral:true,
        })
        const target:string = process.env.KAMRAN!
        gulag(process.env.TEST!, interaction.guild!, interaction.member?.user.id!)
        
        // const guild = client.guilds.cache.get(process.env.OLG!)
        // const join:string = whereX(interaction.user.id)
        // console.log(interaction.user.id)
        // console.log(join)
        // const connection = joinVoiceChannel({
        //     channelId: join,
        //     guildId: process.env.OLG!,
        //     adapterCreator: guild?.voiceAdapterCreator!,
        // });
        // try{
        //     console.log(connection.state)
        //     await entersState(connection, VoiceConnectionStatus.Connecting, 5e3)
        //     console.log("connecting")
        //     await entersState(connection, VoiceConnectionStatus.Ready, 5e3)
        // }catch(error){
        //     connection.destroy()
        //     console.log("couldn't find you guys")
        //     throw error
        // }
        

    }
})

client.login(process.env.TOKEN)