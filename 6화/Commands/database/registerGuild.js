// 모듈 불러오기
const Discord = require("discord.js")
const reload = require("self-reload-json")
const Guild = new reload("./json/server.json")

exports.run = async(client, msg, args, prefix) => {
    let already = new Discord.MessageEmbed()
        .setDescription("❎  이 서버는 이미 가입되어 있습니다.")
        .setColor("RED")

    // guild[msg.guild.id]가 있을 경우
    if (Guild[msg.guild.id]) return msg.reply(already)
    else {

        // guild[msg.guild.id] 값을 아래의 오브젝트로 저장
        Guild[msg.guild.id] = {
            leveling: true,
            gambling: true
        }
        let registered = new Discord.MessageEmbed()
            .setDescription("✅  성공적으로 해당 길드의 데이터베이스가 생성되었습니다.")
            .setColor("7289DA")

        // Guild 저장
        Guild.save()
        msg.reply(registered)
    }
}

exports.config = {
    name: '서버가입',
    aliases: ['registerGuild'],
    category: ['database'],
    des: ['튜토봇에 이 서버만의 데이터베이스를 생성합니다.'],
    use: ['튜토야 서버가입']
}