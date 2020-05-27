const Discord = require("discord.js")
const fetch = require("node-fetch")
exports.run = async (client, msg, args, prefix) => {
    /**
     * 이것은 번외로 Discord.js 문서 api로 크롤링하여 임베드로 표현한 코드입니다.
     * Discord.js 라이브러리 읽는것이 익숙하지 않을 경우 이것을 사용하여 참고하시면 좋을거 같습니다 (실제로 저도 많이 사용하고 있습니다 ㅎㅎ)
     * 그러나 라이브러리를 읽는것이 익숙해지는 것을 권장합니다!
     * API URL: https://djsdocs.sorta.moe
     */
    if (!args[0]) return msg.reply("❎ 쿼리를 입력해주세요.") // argument가 없다면 쿼리를 입력해달라고 전해줍시다.
    let query = encodeURI(args.join(" ")) // 쿼리를 선언하였고 검색에 사용할 것이오니 인코드를 해줍시다.
    fetch(`https://djsdocs.sorta.moe/v1/main/stable/embed?q=${query}`).then(a => a.json().then((r) => { // 해당 api를 fetch 합시다 a = fetch한 값들, 그걸 json화 하고 그 값들을 불러오기 위해서는 다시 then을 사용하여 r로 선언합니다.
        if (!r) return msg.reply("❎ 해당 쿼리는 존재하지 않습니다.")
        const docs = new Discord.MessageEmbed(r) // docs를 const로 선언을 해줍시다. 
        docs.setFooter(msg.author.tag, msg.author.displayAvatarURL())
        msg.reply(docs)
    }))
}

exports.config = {
    name: 'docs',
    aliases: ['djsdocs'],
    category: ['Crawling'],
    des: ['Discord.js 문서 api를 활용한 명령어 입니다'],
    use: ['튜토야 docs <query>']
}