const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
    if (!args[0]) {
        const categorys = client.category // bot.js에 있는 client.category 를 categorys로 선언하였습니다.
        let Commands = new Discord.MessageEmbed()
            .setAuthor(client.user.username + " 봇 명령어", client.user.displayAvatarURL())
            .setColor("7289DA")
            .setFooter(`${prefix}도움 <명령어> 를 통하여 해당 명령어를 자세히 확인해보세요.`)
        for (const category of categorys) { // 위에서 선언한 것을 for문으로 category로 선언하였습니다. (반복문)
            /**
             * 위에 for문을 잠시 설명해드리자면
             * categorys가 있는 만큼 반복을 하여
             * categorys중에 하나를 category로 선언하여 아래의 코드를 작성한 것입니다.
             */
            Commands.addField(category, `> **\`${client.commands.filter(el => el.config.category == category).keyArray().join('`, `')}\`**`)
            /**
             * 소제목에는 카테고리 이름을 넣고 
             * 소 설명에는 이전에 client.commands를 컬랙션으로 지정한 것들을 불러와 필터를 시켜줍니다.
             * el로 선언하여 el이 어떤식으로 되어있냐면 
             * 이전에 명령어들에게 exports를 사용하여 모듈화 하였는데 그것들을 불러오게 됩니다.
             * 여러가지 있는데 그중에 하나만 뜯어서 보여드렸습니다.
             * {
             *   run: [AsyncFunction],
             *   config: {
             *      name: "asd",
             *      aliases: ["asd1", "asd2", "123"],
             *      category: ["example"],
             *      des: ["config 설명"],
             *      use: ["튜토야 도움 <명령어>"]
             *   }
             * }
             * 그러고 이제 config.category가 const로 선언한 category와 맞는지 확인 후 Array화 시킨 후 안에 있는 명령어들을 불러온 것입니다.
             */
        }
        msg.reply(Commands)
    } else {
        if (client.commands.get(args[0])) { // 만약에 client.commands안에 args[0] 라는게 있다면
            var command = client.commands.get(args[0]) // command 는 client.commands.get(args[0])로 선언해줍시다.
        } else if (client.aliases.get(args[0])) { // 만약에 client.aliases 안에 args[0] 라는게 있다면
            let aliases = client.aliases.get(args[0]) // aliases 를 client.aliases.get(args[0])로 선언해주고 (왜냐하면 저기서 aliases를 불러오면 command 이름이 나오기 때문입니다.)
            var command = client.commands.get(aliases) // commands는 client.commands.get(aliases)으로 선언해줍시다.
        } else return msg.reply(`${args[0]} 명령어라는 것을 찾을 수 없어요...`)

        let config = command.config
        let name = config.name
        let aliases = config.aliases
        let category = config.category
        let description = config.des
        let use = config.use

        let Command = new Discord.MessageEmbed()
            .setTitle(`${name} 명령어`)
            .setColor("7289DA")
            .setDescription(`\`\`\`fix\n사용법: ${use}\`\`\``)
            .addField("명령어 설명", `**${description}**`, false)
            .addField("카테고리", `**${category}**`, true)
            .addField("공유하는 명령어", `**${aliases}**`, true)
        msg.reply(Command)
    }
}

exports.config = {
    name: '도움말',
    aliases: ['도움', '명령어', 'commands', 'help'],
    category: ['bot'],
    des: ['봇에 대한 명령어 리스트들을 불러와드립니다.'],
    use: ['튜토야 도움말 <명령어>']
}