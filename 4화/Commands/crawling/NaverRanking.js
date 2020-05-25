const Discord = require("discord.js")
const fetch = require("node-fetch")
const moment = require('moment-timezone')
exports.run = async (client, msg, args, prefix) => {
    /**
     * http://rank.search.naver.com/rank.js에 있는 값들 입니다.
     * {
        ts: '2020-05-24T12:49:00+0900',
        st: '2020-05-24T12:49:00+0900',
        et: '2020-05-24T12:49:00+0900',
        data: [ { category: 'general', data: [Array] } ]
        }
     * data 안에 있는 값들 입니다.
    [
        {
    category: 'general',
    data: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
            ]
        }
    ]
     * data 안에 있는 Object들의 값을 살펴보면 아래와 같습니다.
    {
        rank: 1,
        keyword: '번외수사',
        change: '+',
        score: 0,
        tvalue: 0,
        cvalue: 0,
        ratio: '.',
        delta: 0
    }
     * 위에 값을 보면서 아래의 소스코드를 보시면 이해하시기 편하실겁니다.
     */
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
    category: ['Crawling'],
    des: ['네이버 랭킹 json을 크롤링하여 값을 불러왔습니다.'],
    use: ['튜토야 네이버차트']
}