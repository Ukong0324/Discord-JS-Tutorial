const Discord = require("discord.js")
exports.run = async(client, msg, args, prefix) => {
    if (!client.devs.includes(msg.author.id)) return msg.reply("이 명령어는 봇 관리자만 사용할 수 있습니다.")

    const coode = args.join(" ")
    const module = "const Discord = require(\"discord.js\")"
    if (!coode) return msg.reply("실행할 코드를 입력해주세요.")
    new Promise(res => res(eval(coode))).then(code => {
        if (typeof code !== 'string') code = require('util').inspect(code, { depth: 0 })
        let evaled = new Discord.MessageEmbed()
            .setTitle("✅  Code Execution")
            .setColor("7289DA")
            .addField("📥 **Input**", `\`\`\`js\n${module}\n\n${coode}\`\`\``, false)
            .addField("📤 **Output**", `\`\`\`js\n${code}\`\`\``, false)
        msg.reply(evaled)

    }).catch(e => {
        let evaled = new Discord.MessageEmbed()
            .setTitle("❎  Code Execution")
            .setColor("RED")
            .setDescription(`\`\`\`js\n${e}\`\`\``)
        msg.reply(evaled)
    })
}

exports.config = {
    name: '이블',
    aliases: ['eval'],
    category: ['owner'],
    des: ['코드 실행기'],
    use: ['튜토야 이블 <코드>']
}