// 모듈 불러오기
const Discord = require("discord.js")
const reload = require("self-reload-json")
const User = new reload("./json/user.json")

exports.run = async(client, msg, args, prefix) => {
    let money = new Discord.MessageEmbed()
        // user.money를 아래와 같이 불러옴.
        .setDescription(`보유하고 있는 금액: ${User[msg.author.id].money}₩`)
        .setColor("7289DA")
    msg.reply(money)
}

exports.config = {
    name: '돈',
    aliases: ['내돈', 'money', 'mymoney'],
    category: ['database'],
    des: ['당신이 보유하고 있는 금액을 알려드립니다.'],
    use: ['튜토야 돈']
}