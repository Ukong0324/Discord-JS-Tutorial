const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
    if (!client.devs.includes(msg.author.id)) return msg.reply("이 명령어는 봇 관리자만 사용할 수 있습니다.") // bot.js에서 client.devs를 저장한 것을 불러와 포함하지 않으면 해당 메세지로 답변해줍시다.

    const coode = args.join(" ")
    const module = "const Discord = require(\"discord.js\")"
    if (!coode) return msg.reply("실행할 코드를 입력해주세요.")
    new Promise(res => res(eval(coode))).then(code => { // Promise를 생성하여 eval(coode)를 해준 후 then을 사용하여 그것들을 code로 선언해줍시다.
        if (typeof code !== 'string') code = require('util').inspect(code, { depth: 0 }) // 해당 코드가 스트링이 아니라면 code는 util 이라는 모듈 안에 있는 inspect라는 함수를 이용하여 정리 해줍시다.
        /**
         *  util.inspect에 대해 자세히 알고 싶다면 아래의 링크를 클릭해주세요.
         * https://nodejs.org/api/util.html#util_util_inspect_object_options
         * */
        let evaled = new Discord.MessageEmbed()
            .setTitle("✅  Code Execution")
            .setColor("7289DA")
            .addField("📥 **Input**", `\`\`\`js\n${module}\n\n${coode}\`\`\``, false)
            .addField("📤 **Output**", `\`\`\`js\n${code}\`\`\``, false)
        msg.reply(evaled)
        /**
         * 이제 튜토야 이블 msg를 실행 시켜주면 아래와 같은 결과 값이 나와요!
         * Message {
            channel: [TextChannel],
            deleted: false,
            id: '717685629969891369',
            type: 'DEFAULT',
            content: '튜토야 이블 msg',
            author: [User],
            pinned: false,
            tts: false,
            nonce: '717685619970539520',
            system: false,
            embeds: [],
            attachments: Collection [Map] {},
            createdTimestamp: 1591179988139,
            editedTimestamp: null,
            reactions: [ReactionManager],
            mentions: [MessageMentions],
            webhookID: null,
            application: null,
            activity: null,
            _edits: [],
            flags: [MessageFlags],
            reference: null
          }
         */
    }).catch(e => { // 해당 코드에서 에러가 발생하면 캐치를 하고 그 에러 값을 e로 선언해줍시다.
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