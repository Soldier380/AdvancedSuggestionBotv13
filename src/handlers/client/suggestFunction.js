const Suggestions = require("../models/Suggestions")
const GuildConfig = require("../models/GuildConfig")
const Discord = require('discord.js');
module.exports = function(client){
client.on("messageCreate", async (message) => {
    if(!message.guild) return;
    const data = await GuildConfig.findOne({ guildId: message.guild.id })
    if(message.author.bot) return;
    if(message.channel.id === data?.suggestionChannel){
if(!message.content) return;
        message.delete()
                const suggest = await Suggestions.findOne({ suggestion_id: message.id })
        let upvotes = suggest?.upvotes || "0";
        let downvotes = suggest?.downvotes || "0"
        const embed = new client.discord.MessageEmbed()
        .setAuthor({ name: message.author.tag + " | Sugerencia", iconURL: message.author.displayAvatarURL({ dynamic: true})})
        .setDescription(`${message.content}`)
        .addFields({name: ":thumbsup: Votos positivos", value: "```0 votos```", inline: true }, {name: ":thumbdown: Votos negativos", value: "```0 votos```", inline: true }, { name: "・Status", value: `Pendiente`, inline: true})
        .setFooter({ text: "Para hacer una sugerencia, escribe algo en este canal", iconURL: client.user.displayAvatarURL()})
        .setColor("BLUE")
        
        const buttonUpVote = new client.discord.MessageButton()
            .setCustomId("upSuggest")
            .setStyle("PRIMARY")
             .setLabel(`${suggest?.upvotes || 0}`)
            .setEmoji("👍")
        const buttonDownVote = new client.discord.MessageButton()
            .setCustomId("downSuggest")
            .setStyle("PRIMARY")
               .setLabel(`${suggest?.downvotes || 0}`)
            .setEmoji("👎")  
            const viewUsers = new client.discord.MessageButton()
            .setCustomId("votersSuggest")
            .setStyle("SECONDARY")
               .setLabel(`Votadores`)
                        const deleteSuggest = new client.discord.MessageButton()
            .setCustomId("delSuggest")
            .setStyle("SECONDARY")
               .setEmoji("1010548096238886945")
        const row = new client.discord.MessageActionRow().addComponents(buttonUpVote, buttonDownVote, viewUsers, deleteSuggest)
if(message.attachments.size < 1){
        return message.channel.send({ embeds: [embed], components: [row]}).then((msg) => {
        let newsuggest = new Suggestions({ suggestion_id: msg.id, status: "Pediente"})
newsuggest.save()
        })
}

    }
})
}
