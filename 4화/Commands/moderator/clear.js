exports.run = async (client, msg, args, prefix) => {
    if (!args[0]) return msg.reply("청소할 만큼의 값을 정수로 적어주세요!")
    if (!Number(args[0])) return msg.reply("메세지를 지울 값이 숫자가 아니면 안되요!")
    if (args[0] < 1) return msg.reply("메세지를 지울 값을 1보다 작게 하시면 안되요!")
    if (args[0] > 100) return msg.reply("메세지를 지울 값이 100보다 크면 메세지가 안지워져요!")

    msg.channel.bulkDelete(args[0]).then(msg.reply(`성공적으로 ${args[0]}개 만큼 메세지를 삭제하였습니다!`))
}

exports.config = {
    name: '청소',
    aliases: ['clear', 'clean'],
    category: ['moderator'],
    des: ['bulkdelete'],
    use: ['튜토야 청소 <청소 할 메세지의 수>']
}