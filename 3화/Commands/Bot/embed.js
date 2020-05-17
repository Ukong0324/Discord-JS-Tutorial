const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
    var embed = new Discord.MessageEmbed()
        .setTitle("여기는 대표 타이틀!")
        .setDescription("여기는 대표 설명!")
        .setColor("RED")
        .setFooter("여기는 말머리?")
        .setThumbnail("http://blogfiles.naver.net/20151023_23/shin_0305_1445573936921jrPRT_JPEG/%BD%E6%B3%D7%C0%CF%BF%B9%BD%C3.jpg")
        .setImage("http://blogfiles.naver.net/MjAxODA4MjNfMjQ0/MDAxNTM1MDE5ODk1Njc3.c5p_E9tLPEXGnXPAkpOuhpEOm7VLqopETMTfJ9C8CWYg.6FCsIDtjWnd19lSzmw_z1oHm9E7fd39s1RmRPeBOF3Ag.JPEG.dlawldbs20/VD-poem-20150915-01.jpg")
        .setTimestamp()
        .addField("여기는 소제목", "여기는 소설명(??)")
    msg.reply(embed)
}

exports.config = {
    name: '임베드',
    aliases: ['embed', 'dlaqpem'],
    category: ['bot'],
    des: ['임베드에 대한 설명'],
    use: ['튜토야 임베드']
}