module.exports = {
    name: "ping",
    aliases: ["pong", "latency"],
    category: "Utility",
    description: "Ve el ping del bot",
    ownerOnly: false,
    run: async (client, message, args) => {       
let estado;
if(client.ws.ping < 100){
    estado = `🟢 Perfecto`
}
if(client.ws.ping > 100){
    estado = `🟠 Bueno`
}
if(client.ws.ping > 150){
    estado = `🔴 Malo`
}

        const pingEmbed = new client.discord.MessageEmbed()
            .setTitle(':signal_strength: Bot Ping')
            .setDescription(`Ping: \`${client.ws.ping}\`\nEstado: ${estado}`)
            .setColor("BLUE")
            .setFooter({ text: `Randy`, iconURL: `${client.user.displayAvatarURL()}` });

        await message.channel.send({ allowedMentions: { repliedUser: false }, embeds: [pingEmbed] });
    }
};
