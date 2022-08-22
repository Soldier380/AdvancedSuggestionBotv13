const Suggestions = require("../models/Suggestions")
const Discord = require('discord.js');
module.exports = function(client){
client.on("interactionCreate", async (i) => {
    if(i.isButton()){
let sugg = await Suggestions.findOne({ suggestion_id: i.message.id })  
        if(i.customId === "delSuggest"){
       if(!i.member.permissions.has("ADMINISTRATOR")){
          return i.reply({ ephemeral: true, content: "No tienes permiso de administrador para esta accion"})
       }
            await Suggestions.findOneAndDelete({ suggestion_id: i.message.id })
            i.user.send({ content: `La sugerencia a sido eliminada`, embeds: i.message.embeds })
            i.message.delete()
        }
        if(i.customId === "votersSuggest"){
let us = "Nadie";
if(sugg?.up_users.length > 0){
us = `
<@${sugg?.up_users.join(`>\n<@`)}>
`
}
let down = "Nadie";
if(sugg?.down_users.length > 0){
down = `
<@${sugg?.down_users.join(`>\n<@`)}>
`
}
const embed = new Discord.MessageEmbed()
.setTitle("¿Quien ha votado?")
.addFields({ name: "Votos Positivos", value: `
${us}
`, inline: true}, { name: "Votos Negativos", value: `
${down}
`, inline: true})
return i.reply({ embeds: [embed], ephemeral: true})
    }
if(i.customId === "upSuggest"){
    if(sugg?.status === "deny"){
             return i.reply({ ephemeral: true, content: `Esta sugerencia fue rechazada, ya no puedes votar por esta sugerencia` })
    }
    if(sugg?.up_users.includes(i.user.id)){
        return i.reply({ ephemeral: true, content: `Ya diste pulgar arriba a esta sugerencia` })
    }
    
let oldupvotes = sugg?.upvotes || 0;
let newvotes = oldupvotes + 1;
await Suggestions.findOneAndUpdate({ suggestion_id: sugg?.suggestion_id }, { upvotes: newvotes, $push: {up_users: i.user.id} })
if(sugg?.downvotes){
if(!sugg?.down_users.includes(i.user.id)){
return;
}
let down = sugg?.downvotes || 0;
let ndv = down - 1;
await Suggestions.findOneAndUpdate({ suggestion_id: i.message.id }, { downvotes: ndv })

i.message.components[0].components[1].setLabel(`${ndv}`)
i.message.embeds[0].fields[1].value = `\`\`\`${ndv} votos\`\`\``
await i.message.edit({ embeds: i.message.embeds, components: i.message.components })
}
let nuevasIds = sugg?.down_users.filter(x => !x.includes(i.user.id))
 await Suggestions.findOneAndUpdate({ suggestion_id: sugg?.suggestion_id }, { $set: {
down_users: nuevasIds
 } })
i.reply({ content: `Has votado pulgar arriba para esta sugerencia`, ephemeral: true})
let d = sugg?.downvotes || 0;
let u = newvotes;
i.message.components[0].components[0].setLabel(`${newvotes}`)
i.message.embeds[0].fields[0].value = `\`\`\`${newvotes} votos\`\`\``
await i.message.edit({ embeds: i.message.embeds, components: i.message.components })
}
if(i.customId === "downSuggest"){
        if(sugg?.status === "deny"){
             return i.reply({ ephemeral: true, content: `Esta sugerencia fue rechazada, ya no puedes votar por esta sugerencia` })
    }
if(sugg?.down_users.includes(i.user.id)){
        return i.reply({ ephemeral: true, content: `Ya diste pulgar abajo a esta sugerencia` })
    }
           let olddownvotes = sugg?.downvotes || 0;
       let newdownvotes = olddownvotes + 1;
       await Suggestions.findOneAndUpdate({ suggestion_id: i.message.id }, { downvotes: newdownvotes, $push: {
           down_users: i.user.id
       } })
if(sugg?.upvotes){
if(!sugg?.up_users.includes(i.user.id)){
return;
}
let up = sugg?.upvotes || 0;
let nuv = up - 1;
await Suggestions.findOneAndUpdate({ suggestion_id: i.message.id }, { upvotes: nuv })
    i.message.components[0].components[0].setLabel(`${nuv}`)
    i.message.embeds[0].fields[0].value = `\`\`\`${nuv} votos\`\`\` `
await i.message.edit({ embeds: i.message.embeds, components: i.message.components })
}
let nuevasIds = sugg?.up_users.filter(x => !x.includes(i.user.id))
await Suggestions.findOneAndUpdate({ suggestion_id: sugg?.suggestion_id }, { $set: {up_users: nuevasIds} })
i.reply({ content: `Has votado pulgar abajo para esta sugerencia`, ephemeral: true })
i.message.components[0].components[1].setLabel(`${newdownvotes}`)
    i.message.embeds[0].fields[1].value = `\`\`\`${newdownvotes} votos\`\`\` `
await  i.message.edit({ embeds: i.message.embeds, components: i.message.components })
}
    }
})
}
