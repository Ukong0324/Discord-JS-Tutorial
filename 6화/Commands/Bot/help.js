const Discord = require("discord.js")
exports.run = async(client, msg, args, prefix) => {
        if (!args[0]) {
            const categorys = client.category
            let Commands = new Discord.MessageEmbed()
                .setAuthor(client.user.username + " 봇 명령어", client.user.displayAvatarURL())
                .setColor("7289DA")
                .setFooter(`${prefix}도움 <명령어> 를 통하여 해당 명령어를 자세히 확인해보세요.`)
            for (const category of categorys) {
                Commands.addField(category, `> **\`${client.commands.filter(el => el.config.category == category).keyArray().join('`, `')}\`**`)

        }
        msg.reply(Commands)
    } else {
        if (client.commands.get(args[0])) {
            var command = client.commands.get(args[0])
        } else if (client.aliases.get(args[0])) {
            let aliases = client.aliases.get(args[0])
            var command = client.commands.get(aliases)
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