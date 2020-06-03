const Discord = require("discord.js")
const fetch = require("node-fetch")
exports.run = async (client, msg, args, prefix) => {
    if (!args[0]) return msg.reply("❎ 쿼리를 입력해주세요.")
    let query = encodeURI(args.join(" "))
    fetch(`https://djsdocs.sorta.moe/v1/main/stable/embed?q=${query}`).then(a => a.json().then((r) => {
        if (!r) return msg.reply("❎ 해당 쿼리는 존재하지 않습니다.")
        const docs = new Discord.MessageEmbed(r)
        docs.setFooter(msg.author.tag, msg.author.displayAvatarURL())
        msg.reply(docs)
    }))
}

exports.config = {
    name: 'docs',
    aliases: ['djsdocs'],
    category: ['crawling'],
    des: ['Discord.js 문서 api를 활용한 명령어 입니다'],
    use: ['튜토야 docs <query>']
}