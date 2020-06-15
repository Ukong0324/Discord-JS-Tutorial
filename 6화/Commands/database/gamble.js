// 모듈 불러오기
const Discord = require("discord.js")
const reload = require("self-reload-json")
const User = new reload("./json/user.json")

exports.run = async(client, msg, args, prefix) => {
    // 무작위숫자 함수
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    // user[msg.author.id].money가 0보다 작거나 같을 경우
    if (User[msg.author.id].money <= 0) {
        let nomoney = new Discord.MessageEmbed()
            .setDescription("❎  당신은 도박을 할 돈이 없습니다..")
            .setColor("RED")
        return msg.reply(nomoney)
    }

    let help = new Discord.MessageEmbed()
        .setDescription(`${prefix}도박 <돈>`)
        .setColor("7289DA")
        .setFooter("돈 부분은 무조건 정수로 적어주세요.")

    // args[0]이 비어있을 경우
    if (!args[0]) return msg.reply(help)

    // args[0]이 숫자가 아닐경우
    if (!Number(args[0])) return msg.reply(help)

    let gamble = new Discord.MessageEmbed()
        .setDescription(`정말로 \`${args[0]}₩\` 만큼 도박을 진행하시겠습니까?`)
        .setColor("7289DA")

    msg.reply(gamble).then(async message => {
        // 반응 추가 (✅, ❎)
        await message.react("✅")
        await message.react("❎")

        // 필터 생성
        let filterYes = (reaction, user) => reaction.emoji.name === '✅' && user.id == msg.author.id

        // 반응 콜랙터 생성
        let collectorYes = message.createReactionCollector(filterYes, { max: 1, time: 60000 }) // max: 1 -> 반응은 한번만, time: 60000 -> 제한시간 60초

        // 위에 콜랙터 이벤트 생성
        collectorYes.on('collect', () => { // 반응을 할 경우
            message.delete()

            // 배율 설정
            let multiplication = getRandomInt(2, 10)

            // 성공하면 받을 금액
            let money = args[0] * multiplication

            // 성공과 실패를 나눌 숫자
            let boolean = getRandomInt(1, 3)

            // boolean 변수가 1일 경우
            if (boolean == 1) {
                let yourmoney = User[msg.author.id].money + money
                let success = new Discord.MessageEmbed()
                    .setDescription(`당신은 도박을 성공하여 ${multiplication}배 만큼 거신 금액을 얻으셨습니다.\n\n 보유하고 있는 돈: ||${yourmoney}₩||`)
                    .setColor("7289DA")
                msg.reply(success)

                // user의 money는 money + money <- (위에 선언한 money)
                User[msg.author.id].money = User[msg.author.id].money + money

                // user 저장
                User.save()

                // 아닐경우
            } else {
                // 임베드에 표기할 숫자
                let yourmoney = User[msg.author.id].money - args[0]
                let fail = new Discord.MessageEmbed()
                    .setDescription(`당신은 도박을 실패하여 거신 금액을 모두 잃었습니다.\n\n 보유하고 있는 돈: ||${yourmoney}₩||`)
                    .setColor("7289DA")
                msg.reply(fail)

                // user의 money는 money - args[0] (건 금액)
                User[msg.author.id].money = User[msg.author.id].money - args[0]

                // user의 json을 저장
                User.save()
            }
        })

        // 위의 콜랙터의 이벤트 생성
        collectorYes.on('end', (_, reason) => { // 이벤트가 끝날 경우
            if (reason === "time") { // 이벤트가 끝난 사유가 time일 경우
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
                .setDescription("도박 진행을 취소하였습니다.")
                .setColor("RED")
            msg.reply(cancel)
        })
    })
}

exports.config = {
    name: '도박',
    aliases: ['gamble'],
    category: ['database'],
    des: ['당신이 돈을 걸어 반반의 확률로 게임을 진행합니다.'],
    use: ['튜토야 도박 <돈>']
}