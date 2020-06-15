const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
    const hook = new Discord.WebhookClient('WebHook ID', 'WebHook Token');
    hook.send("Hello, new World!")
}

exports.config = {
    name: '웹훅',
    aliases: ['vld', 'botping'],
    category: ['bot'],
    des: ['웹훅에 대한 사용방법'],
    use: ['튜토야 웹훅']
}