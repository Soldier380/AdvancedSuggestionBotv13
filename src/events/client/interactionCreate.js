
module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'an Error check console' });
        
        if (command.ownerOnly) {
            if (interaction.user.id !== client.config.ownerID) {
                return interaction.reply({ ephemeral: true, content: "This command only for Bot Owner!" });
            }
        }
        
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
                            if(!interaction.member.permissions.has([command.userPerms])){
            const permisos  = new client.discord.MessageEmbed()
            .setDescription("<:m_error:1009590117381455944> \`|\` Nececitas permisos para usar este comando\n\nPermiso requerido: `"+command.userPerms+"`")
            .setColor("RED")
            return interaction.reply({ ephemeral: true, embeds: [permisos]})
        }

        if(!interaction.guild.me.permissions.has([command.botPerms])){
            const ejecutar = new client.discord.MessageEmbed()
            .setDescription("<:m_error:1009590117381455944> \`|\` Nececito permisos para usar este comando\n\nPermiso requerido: `"+command.botPerms+"`")
            .setColor("RED")
            return interaction.reply({ ephemeral: true, embeds: [ejecutar]})
        }
            command.run(client, interaction, args);
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }
}
