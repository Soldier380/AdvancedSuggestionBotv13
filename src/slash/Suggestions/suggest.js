
const Suggestions = require("../../handlers/models/Suggestions")
module.exports = {
    name: "suggest",
    aliases: ["sug", "sgg"],
    category: "Utility",
    description: "Acepta o rechaza una sugerencia",
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
}, {
name: "razon",
description: "Razon de la aceptacion/denegacion",
type: "STRING",
required: false
}],
    run: async (client, message, args) => {       
        const g = await client.GuildConfig.findOne({ guildId: message.guild.id})
        if(!g?.suggestionChannel){
            return interaction.reply({ content: "No hay canal de sugerencias establecido, no puedes aceptar ni rechazara ninguna", ephemeral: true})
        }
 const action = interaction.options.getString("accion", true)

 if(action === "Aceptar"){
const id = interaction.options.getString("id")
    const s = await Suggestions.findOne({ suggestion_id: id })
if(!s){
return interaction.reply({ ephemeral: true, content: "No encuentro esa sugerencia" })
}
const data = await client.GuildConfig.findOne({ guildId: message.guild.id })
const ch = interaction.guild.channels.cache.get(data?.suggestionChannel)

     const razon = interaction.options.getString("razon")
try{
  ch.messages.fetch(id).then((msg) => {
const suggestionEmbed = msg.embeds[0];
if(s?.status === "accepted"){
    return interaction.reply({ ephemeral: true, content: "esta sugerencia ya esta aceptada" })
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
        interaction.reply({ embeds: [su1]})   
 }).catch(err => console.log(err))
    await Suggestions.findOneAndUpdate({ suggestion_id: id}, { status: "accepted" })

} catch {
    return interaction.reply({ ephemeral: true, content:"No encontre esa sugerencia"})
}
 } else  if(action === "Rechazar"){
const id = args[1]
    const s = await Suggestions.findOne({ suggestion_id: id })
if(!s){
return interaction.reply({ ephemeral: true, content: "No encontre esa sugerencia" })
}
     const razon = args.slice(2).join(" ")
const data = await client.GuildConfig.findOne({ guildId: message.guild.id })
const ch = interaction.guild.channels.cache.get(data?.suggestionChannel)
try{
        const s = await Suggestions.findOne({ suggestion_id: id })
  ch.messages.fetch(id).then((msg) => {
const suggestionEmbed = msg.embeds[0];
if(s?.status === "deny"){
    return interaction.reply({  ephemeral: true, content: "Este sugerencia ya esta rechazada" })
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
        interaction.reply({ embeds: [su1]})   
 }).catch(err => console.log(err))
    await Suggestions.findOneAndUpdate({ suggestion_id: id}, { status: "deny" })

} catch {
    return interaction.reply({ ephemeral: true, content: "No encuentro esa sugerencia" })
}

        
        
    }
};
