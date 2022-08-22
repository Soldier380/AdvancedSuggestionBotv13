const GuildConfig = require("../../handlers/models/GuildConfig");

module.exports = {
    name: "setup-suggest",
    aliases: ["sp"],
    category: "Mod",
    description: "Establece el canal de sugerencias",
    ownerOnly: false,
    botPerms: ["ADMINISTRATOR"],
    userPerms: ["ADMINISTRATOR"],
  options: [{name:"canal",description:"Canal de sugerencias a establecer",required:true,type:"CHANNEL"}]
    run: async (client, message, args) => {
   const ch = interaction.options.getChannel("canal")
   if(!ch.type === "GUILD_TEXT") return interaction.reply("Este no es un canal de texto")
      
let data = await GuildConfig.findOne({ guildId: message.guild.id })
  if(!data){
    const newdata = new GuildConfig({ guildId: message.guild.id, suggestionChannel: ch.id })
    newdata.save()
  } else {
    await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { suggestionChannel: ch.id })
  }
return interaction.reply(`:white_check_mark: Canal de sugerencias establecido ${ch}`)
    }
};
