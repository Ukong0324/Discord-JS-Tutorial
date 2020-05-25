const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs')
const config = require("./config.json")
client.on("ready", () => {
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`);
});
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdirSync("./Commands/").forEach(dir => {
    const Filter = fs.readdirSync(`./Commands/${dir}`).filter(f => f.endsWith(".js")); 
    Filter.forEach(file => {
        const cmd = require(`./Commands/${dir}/${file}`);
        client.commands.set(cmd.config.name, cmd)
        for (let alias of cmd.config.aliases) {
            client.aliases.set(alias, cmd.config.name)
        }
    })
})


function runCommand(command, message, args, prefix) {
    if (client.commands.get(command) || client.aliases.get(command)) {
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
        if (cmd) cmd.run(client, message, args, prefix); return 
    }
}
client.on("message", async msg => {
    const prefix = "튜토야 "
    if(!msg.content.startsWith(prefix)) return
    let args = msg.content.slice(prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase()
    try {
    runCommand(command, msg, args, prefix)
    } catch (e) {
       console.error(e)
    }
})

client.login(config.token)
