module.exports = {
    name: "ping",
    category: "Utility",
    description: "Ve el ping del bot",
    ownerOnly: false,
    run: async (client, interaction) => {
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
        
        await interaction.reply({ embeds: [pingEmbed] });
    },
};
