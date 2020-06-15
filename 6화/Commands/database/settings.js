const Discord = require("discord.js")
const reload = require("self-reload-json")
const guild = new reload("./json/server.json")

exports.run = async(client, msg, args, prefix) => {
    let noperm = new Discord.MessageEmbed()
        .setDescription("❎  당신은 관리자 권한이 없습니다.")
        .setColor("RED")
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply(noperm)
    let empty = new Discord.MessageEmbed()
        .setTitle("⚙️  현재 설정되어 있는 것들")
        .setColor("7289DA")
        .setDescription(`레벨링: ${guild[msg.guild.id].leveling ? "✅" : "❎"}\n도박: ${guild[msg.guild.id].gambling ? "✅" : "❎"}`)
        .setFooter(`기능들을 온오프 하고 싶으시면 "${prefix}설정 <기능>"으로 해주세요.`)
    switch (args[0]) { // args[0]에 대한 여러가지 변수가 있을때 사용함
        case "레벨링": // args[0] == 레벨링 일 경우
            let emptyGuild = new Discord.MessageEmbed()
                .setDescription("❎  현재 이 길드는 데이터베이스에 저장되어 있지 않습니다.")
                .setFooter(`데이터베이스에 가입하고 싶으시면\n서버 관리자중"${prefix} 서버가입" 명령어를 사용해주세요.`)
                .setColor("RED")

            // guild[msg.guild.id] 가 없을 경우
            if (!guild[msg.guild.id]) return msg.reply(emptyGuild)

            // guild[msg.guild.id].leveling이 true일 경우
            if (guild[msg.guild.id].leveling === true) {
                let question = new Discord.MessageEmbed()
                    .setDescription("정말로 이 서버에서 레벨링을 비활성화 하시겠습니까?")
                    .setColor("7289DA")
                msg.reply(question).then(async message => {
                    await message.react("✅")
                    await message.react("❎")

                    // 필터 생성
                    let filterYes = (reaction, user) => reaction.emoji.name === '✅' && user.id == msg.author.id

                    // 콜랙터 생성
                    let collectorYes = message.createReactionCollector(filterYes, { max: 1, time: 60000 })

                    // 콜랙터 이벤트 생성
                    collectorYes.on('collect', () => { // 반응을 할 경우
                            message.delete()
                            let success = new Discord.MessageEmbed()
                                .setDescription("성공적으로 이 서버에 레벨링 기능을 비활성화 하였습니다.")
                                .setColor("7289DA")
                            msg.reply(success)

                            // guild.leveling = false
                            guild[msg.guild.id].leveling = false

                            // guild 저장
                            guild.save()
                        })
                        // 콜랙터 이벤트 생성
                    collectorYes.on('end', (_, reason) => { // 이벤트가 종료되었을 경우
                        if (reason === "time") { // 종료된 사유가 time일 경우
                            message.delete()
                            let timeover = new Discord.MessageEmbed()
                                .setDescription("시간이 초과가 되었으니 다시 시도해주세요.")
                                .setColor("RED")
                            msg.reply(timeover)
                        }
                    })

                    // 필터 생성
                    let filterNo = (reaction, user) => reaction.emoji.name === '❎' && user.id === msg.author.id

                    // 콜랙터 생성
                    let collectorNo = message.createReactionCollector(filterNo, { max: 1, time: 60000 })

                    // 콜랙터 이벤트 생성
                    collectorNo.on('collect', () => { // 반응을 할 경우
                        message.delete()
                        let cancel = new Discord.MessageEmbed()
                            .setDescription("레벨링 비활성화를 취소하였습니다.")
                            .setColor("RED")
                        msg.reply(cancel)
                    })
                })

                // guild[msg.guild.id].leveling이 false일 경우
            } else if (guild[msg.guild.id].leveling === false) {
                let question = new Discord.MessageEmbed()
                    .setDescription("정말로 이 서버에서 레벨링을 활성화 하시겠습니까?")
                    .setColor("7289DA")
                msg.reply(question).then(async message => {
                    await message.react("✅")
                    await message.react("❎")

                    // 필터 생성
                    let filterYes = (reaction, user) => reaction.emoji.name === '✅' && user.id == msg.author.id

                    // 콜랙터 생성
                    let collectorYes = message.createReactionCollector(filterYes, { max: 1, time: 60000 })

                    // 콜랙터 이벤트 생성
                    collectorYes.on('collect', () => { // 반응을 할 경우
                        message.delete()
                        let success = new Discord.MessageEmbed()
                            .setDescription("성공적으로 이 서버에 레벨링 기능을 활성화 하였습니다.")
                            .setColor("7289DA")
                        msg.reply(success)

                        // guild.leveling = true
                        guild[msg.guild.id].leveling = true

                        // guild 저장
                        guild.save()

                    })

                    // 콜랙터 이벤트 생성
                    collectorYes.on('end', (_, reason) => { // 이벤트가 종료할 경우
                        if (reason === "time") { // 종료 사유가 time일 경우
                            message.delete()
                            let timeover = new Discord.MessageEmbed()
                                .setDescription("시간이 초과가 되었으니 다시 시도해주세요.")
                                .setColor("RED")
                            msg.reply(timeover)
                        }
                    })

                    // 필터 생성
                    let filterNo = (reaction, user) => reaction.emoji.name === '❎' && user.id === msg.author.id

                    // 콜랙터 생성
                    let collectorNo = message.createReactionCollector(filterNo, { max: 1, time: 60000 })

                    // 콜랙터 이벤트 생성
                    collectorNo.on('collect', () => { // 반응을 할 경우
                        message.delete()
                        let cancel = new Discord.MessageEmbed()
                            .setDescription("레벨링 활성화를 취소하였습니다.")
                            .setColor("RED")
                        msg.reply(cancel)
                    })
                })
            }
            break;
        case "도박": // args[0] == 도박 일 경우
            /**
             * 밑에는 위와 설명이 같습니다.
             */
            if (!guild[msg.guild.id]) return msg.reply(emptyGuild)
            if (guild[msg.guild.id].gambling === true) {
                let question = new Discord.MessageEmbed()
                    .setDescription("정말로 이 서버에서 도박을 비활성화 하시겠습니까?")
                    .setColor("7289DA")
                msg.reply(question).then(async message => {
                    await message.react("✅")
                    await message.react("❎")
                    let filterYes = (reaction, user) => reaction.emoji.name === '✅' && user.id == msg.author.id
                    let collectorYes = message.createReactionCollector(filterYes, { max: 1, time: 60000 })
                    collectorYes.on('collect', () => {
                        message.delete()
                        let success = new Discord.MessageEmbed()
                            .setDescription("성공적으로 이 서버에 도박 기능을 비활성화 하였습니다.")
                            .setColor("7289DA")
                        msg.reply(success)
                        guild[msg.guild.id].gambling = false
                        guild.save()
                    })
                    collectorYes.on('end', (_, reason) => {
                        if (reason === "time") {
                            message.delete()
                            let timeover = new Discord.MessageEmbed()
                                .setDescription("시간이 초과가 되었으니 다시 시도해주세요.")
                                .setColor("RED")
                            msg.reply(timeover)
                        }
                    })
                    let filterNo = (reaction, user) => reaction.emoji.name === '❎' && user.id === msg.author.id
                    let collectorNo = message.createReactionCollector(filterNo, { max: 1, time: 60000 })

                    collectorNo.on('collect', () => {
                        message.delete()
                        let cancel = new Discord.MessageEmbed()
                            .setDescription("도박 비활성화를 취소하였습니다.")
                            .setColor("RED")
                        msg.reply(cancel)
                    })
                })
            } else if (guild[msg.guild.id].gambling === false) {
                let question = new Discord.MessageEmbed()
                    .setDescription("정말로 이 서버에서 도박을 활성화 하시겠습니까?")
                    .setColor("7289DA")
                msg.reply(question).then(async message => {
                    await message.react("✅")
                    await message.react("❎")
                    let filterYes = (reaction, user) => reaction.emoji.name === '✅' && user.id == msg.author.id
                    let collectorYes = message.createReactionCollector(filterYes, { max: 1, time: 60000 })
                    collectorYes.on('collect', () => {
                        message.delete()
                        let success = new Discord.MessageEmbed()
                            .setDescription("성공적으로 이 서버에 도박 기능을 활성화 하였습니다.")
                            .setColor("7289DA")
                        msg.reply(success)
                        guild[msg.guild.id].gambling = true
                        guild.save()

                    })
                    collectorYes.on('end', (_, reason) => {
                        if (reason === "time") {
                            message.delete()
                            let timeover = new Discord.MessageEmbed()
                                .setDescription("시간이 초과가 되었으니 다시 시도해주세요.")
                                .setColor("RED")
                            msg.reply(timeover)
                        }
                    })
                    let filterNo = (reaction, user) => reaction.emoji.name === '❎' && user.id === msg.author.id
                    let collectorNo = message.createReactionCollector(filterNo, { max: 1, time: 60000 })

                    collectorNo.on('collect', () => {
                        message.delete()
                        let cancel = new Discord.MessageEmbed()
                            .setDescription("도박 활성화를 취소하였습니다.")
                            .setColor("RED")
                        msg.reply(cancel)
                    })
                })
            }
            break;
        default:
            msg.reply(empty)
            break;
    }

}

exports.config = {
    name: '설정',
    aliases: ['settings', ],
    category: ['database'],
    des: ['데이터베이스에 대한 설정을 합니다.'],
    use: ['튜토야 설정 <항목들>']
}