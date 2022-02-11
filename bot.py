import lightbulb
import hikari
token = "OTQxNDMzMTI3MzQyMDcxODU5.YgV37A.ypPL9mEXeew6Si71ih2vXpfg-Ro"
target_kamran = 336082523010629632
OLG = 378968725623144470
guild = (OLG)

bot = lightbulb.BotApp(
    token=token,
    default_enabled_guilds=guild
 )


@bot.command
@lightbulb.command('kamran', 'Kicks the nuisance!')
@lightbulb.implements(lightbulb.SlashCommand)
async def kicker(ctx):
    rest = ctx.app.rest
    channels = await rest.fetch_guild_channels(OLG)

    for c in channels:
        m = await c.app.rest.fetch_my_connections()
        print(c)
        print(m)
        print("==================")

bot.run()
