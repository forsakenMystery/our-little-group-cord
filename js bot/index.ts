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

function whereX(who:string): string{
    const guild = client.guilds.cache.get(process.env.OLG!)
    let before:string = ""
    console.log("who"+who)
    var beef=new Promise((resolve, reject)=>{
        
    })
    guild?.members.fetch(who).then(member=>{
        before = member.voice.channelId as string
        console.log("mem"+member.voice.channelId)
    })
    console.log("before"+before)
    return before

}

function gulagX(who:string): boolean{
    const guild = client.guilds.cache.get(process.env.OLG!)
        const before:string = whereX(who)
        guild?.members.fetch(who).then(member => {
            member.voice.setChannel(process.env.GULAG!).then(()=>{
                console.log("yay")
            }).catch(console.error)
        })

        setTimeout(() => {   
            guild?.members.fetch(who).then(member => {
                member.voice.setChannel(before).then(()=>{
                    console.log("whale cum black")
                }).catch(console.error)
            })
        }, 3000);
        return true

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
        // gulagX(process.env.TEST!)
        const guild = client.guilds.cache.get(process.env.OLG!)
        const join:string = whereX(interaction.user.id)
        console.log(interaction.user.id)
        console.log(join)
        const connection = joinVoiceChannel({
            channelId: join,
            guildId: process.env.OLG!,
            adapterCreator: guild?.voiceAdapterCreator!,
        });
        try{
            console.log(connection.state)
            await entersState(connection, VoiceConnectionStatus.Connecting, 5e3)
            console.log("connecting")
            await entersState(connection, VoiceConnectionStatus.Ready, 5e3)
        }catch(error){
            connection.destroy()
            console.log("couldn't find you guys")
            throw error
        }
        

    }
})

client.login(process.env.TOKEN)