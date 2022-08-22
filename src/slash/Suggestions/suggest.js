
const Suggestions = require("../../handlers/models/Suggestions")
module.exports = {
    name: "suggest",
    aliases: ["sug", "sgg"],
    category: "Utility",
    description: "Check the bot's ping!",
    ownerOnly: false,
    botPerms: ["MANAGE_MESSAGES"],
    userPerms: ["MANAGE_MESSAGES"],
    options: [{
name: "accion",
description: "Aceptar o denegar",
type: "STRING",
choices: [{name:"Aceptar",value:"Aceptar"}, {name:"Rechazar",value: "Rechazar"}],
required: true
    }, {
name: "id",
description: "Id del mensaje de la sugerencia",
type: "STRING",
required: true
}],
    run: async (client, message, args, errorMessage, success, prefix) => {       
        const g = await client.GuildConfig.findOne({ guildId: message.guild.id})
        if(!g?.suggestionChannel){
            return interaction.reply({ content: "No hay canal de sugerencias establecido, no puedes aceptar ni rechazara ninguna", ephemeral: true})
        }
 const action = args[0]
 if(!action){
      return interaction.reply({ , ephemeral: true, content: "Ingresa: `"+prefix+"suggest deny | rechazar` o `"+prefix+"suggest accept | aceptar`"})
 }
        
 if(action === "Aceptar"){
const id = args[1]
    const s = await Suggestions.findOne({ suggestion_id: id })
if(!s){
return errorMessage("No encuentro esa sugerencia", true)
}
const data = await client.GuildConfig.findOne({ guildId: message.guild.id })
const ch = message.guild.channels.cache.get(data?.suggestionChannel)

     const razon = args.slice(2).join(" ")
try{
  ch.messages.fetch(id).then((msg) => {
const suggestionEmbed = msg.embeds[0];
if(s?.status === "accepted"){
    return interaction.reply({ , ephemeral: true, content: "ste sugerencia ya esta aceptada" })
}
if(!razon){
suggestionEmbed.fields[2].name = "・ Status";
suggestionEmbed.fields[2].value = ":white_check_mark: Aceptada";
} else {
suggestionEmbed.fields[2].name = ":white_check_mark: Aceptada por " + message.author.username;
suggestionEmbed.fields[2].value = razon || "No espesificada";
suggestionEmbed.fields[2].inline = false;
}
suggestionEmbed.color = "GREEN"
    msg.edit({ embeds: msg.embeds }) 
      const su1 = new client.discord.MessageEmbed()
      .setDescription(client.success + " `|` La sugerencia fue aceptada, [saltar a la sugerencia]("+msg.url+")")
      .setColor("DARK_BUT_NOT_BLACK")
        message.channel.send({ embeds: [su1]})   
 }).catch(err => console.log(err))
    await Suggestions.findOneAndUpdate({ suggestion_id: id}, { status: "accepted" })

} catch {
    return interaction.reply({ , ephemeral: true, content:"No encontre esa sugerencia"})
}
 } else  if(action === "deny" || action === "rechazar"){
const id = args[1]
    const s = await Suggestions.findOne({ suggestion_id: id })
if(!s){
return errorMessage("No encontre esa sugerencia", true)
}
     const razon = args.slice(2).join(" ")
const data = await client.GuildConfig.findOne({ guildId: message.guild.id })
const ch = message.guild.channels.cache.get(data?.suggestionChannel)
try{
        const s = await Suggestions.findOne({ suggestion_id: id })
  ch.messages.fetch(id).then((msg) => {
const suggestionEmbed = msg.embeds[0];
if(s?.status === "deny"){
    return errorMessage("Este sugerencia ya esta rechazada")
}
if(!razon){
suggestionEmbed.fields[2].name = "・ Status";
suggestionEmbed.fields[2].value = ":x: Rechazada";
} else {
suggestionEmbed.fields[2].name = ":x: Rechazada por " + message.author.username;
suggestionEmbed.fields[2].value = razon || "No espesificada";
suggestionEmbed.fields[2].inline = false;
}
suggestionEmbed.color = "RED"
    msg.edit({ embeds: msg.embeds }) 
      const su1 = new client.discord.MessageEmbed()
      .setDescription(client.success + " `|` La sugerencia fue rechazada, [saltar a la sugerencia]("+msg.url+")")
      .setColor("DARK_BUT_NOT_BLACK")
        message.channel.send({ embeds: [su1]})   
 }).catch(err => console.log(err))
    await Suggestions.findOneAndUpdate({ suggestion_id: id}, { status: "deny" })

} catch {
    return errorMessage("No encuentro esa sugerencia")
}
 } else {
     return errorMessage("Ingresa: `"+prefix+"suggest deny | rechazar` o `"+prefix+"suggest accept | aceptar`")
 }
        
        
    }
};
