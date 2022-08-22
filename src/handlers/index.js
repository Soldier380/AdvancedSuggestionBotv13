
const fs    = require("fs");

const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync(`${client.cwd}/src/events`);
    for (const folder of eventFolders) {
        const eventFiles = fs
            .readdirSync(`${client.cwd}/src/events/${folder}`)
            .filter((file) => file.endsWith(".js"));
        
        for (const file of eventFiles) {
            const event = require(`${client.cwd}/src/events/${folder}/${file}`);
            
            if (event.name) {
    
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Evento ${file} nececita ayuda`));
                continue;
            }
            
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

/**
 * Load Prefix Commands
 */
const loadCommands = async function (client) {
    const commandFolders = fs.readdirSync(`${client.cwd}/src/commands/`);
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${client.cwd}/src/commands/${folder}`)
            .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`${client.cwd}/src/commands/${folder}/${file}`);
            
            if (command.name) {
                client.commands.set(command.name, command);
   
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Prefix Command ${file} nececita ayuda`));
                continue;
            }
            
            if (command.aliases && Array.isArray(command))
                command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
        }
    }
}

/**
 * Load SlashCommands
 */
const loadSlashCommands = async function (client) {
    let slash = [];

    const commandFolders = fs.readdirSync(`${client.cwd}/src/slash`);
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${client.cwd}/src/slash/${folder}`)
            .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`${client.cwd}/src/slash/${folder}/${file}`);
            
            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command)
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => SlashCommand ${file} Nececita ayuda `));
                continue;
            }
        }
    }

    client.on("ready", async() => {
        // Registrar los comandos para un solo servidor
        // await client.guilds.cache
        //    .get("YOUR_GUILD_ID")
        //    .commands.set(slash);

        console.log('Comandos de barra registrados.');
        await client.application.commands.set(slash)
    })
}

module.exports = {
    loadEvents,
    loadCommands,
    loadSlashCommands
}
