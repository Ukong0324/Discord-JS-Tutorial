const Discord = require("discord.js")
const fetch = require("node-fetch")
const moment = require('moment-timezone')
exports.run = async (client, msg, args, prefix) => {
    fetch("http://rank.search.naver.com/rank.js").then(r => r.json().then((r) => {
        let updated = moment(new Date(r.ts)).locale("ko").format("llll")
        console.log(r.data[0].data)
        let data = r.data[0].data
        let NaverRanking = new Discord.MessageEmbed()
            .setTitle("네이버 실시간 검색어 순위")
            .setColor("#83ff7b")
            .setFooter(updated)
        for (let i = 0; i < 10; i++) {
            NaverRanking.addField(`${data[i].rank}위`, `[${data[i].keyword}](https://search.naver.com/search.naver?where=nexearch&query=${encodeURI(data[i].keyword)}&sm=top_lve.agallgrpmamsi0en0sp0&ie=utf8)`)
        }
        msg.channel.send(NaverRanking)
    }))
}

exports.config = {
    name: '네이버차트',
    aliases: ['NaverRank', 'NaverRanking'],
    category: ['crawling'],
    des: ['네이버 랭킹 json을 크롤링하여 값을 불러왔습니다.'],
    use: ['튜토야 네이버차트']
}