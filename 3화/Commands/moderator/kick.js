exports.run = async (client, msg, args, prefix) => {
    var user = msg.mentions.users.first();
    if (!user) {
        msg.reply("추방하시기 전에 맨션을 먼저 해주세요!")
    } else {
        var member = msg.guild.member(user);
        if (member) {
            member.kick(`${msg.author.username}님의 의해 서버에서 추방됨.`).then(member => {
                msg.reply(`성공적으로 ${member.user.tag}님을 추방하였습니다.`)
            }).catch(msg.reply("해당 유저를 킥 할 권한이 없습니다."))
        } else {
            msg.reply("이 서버에 존재하지 않은 유저입니다!")
        }
    }
}

exports.config = {
    name: '추방',
    aliases: ['킥', 'kick'],
    category: ['moderator'],
    des: ['유저를 강제퇴장 시킵니다.'],
    use: ['튜토야 추방 <유저 맨션>']
}