const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs')
const config = require("./config.json")
client.on("ready", () => {
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`);
});
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.devs = ['570617337691111444', "1234567890"] // devs에 제 고유 아이디를 넣어놨습니다! 그리고 이런식으로 아이디를 넣으면 그 사람들도 공유가 됩니다! (eval에서 권한 체크용으로 쓰일 예정)
client.category = ['bot', 'crawling', 'moderator', 'owner'] // help 명령어에서 카테고리들을 쉽게 불러오도록 이미 Array(어레이)를 만들었습니다.
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
    if (!msg.content.startsWith(prefix)) return
    let args = msg.content.slice(prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase()
    try {
        runCommand(command, msg, args, prefix)
    } catch (e) {
        console.error(e)
    }
})

client.login(config.token)
