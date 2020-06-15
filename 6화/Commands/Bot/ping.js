exports.run = async (client, msg, args, prefix) => {
    msg.channel.send(`${client.user.username}의 핑은 ${client.ws.ping}ms 입니다!`)
}

exports.config = {
    name: '핑',
    aliases: ['vld', 'botping'],
    category: ['bot'],
    des: ['봇의 디스코드 웹소켓 지연시간을 알려드립니다'],
    use: ['튜토야 핑']
}