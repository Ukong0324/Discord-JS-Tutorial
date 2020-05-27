const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs') // 우리는 커멘드 핸들러를 만들기 위해서 fs 라는 모듈을 사용하였습니다! "npm i fs --save" 
const config = require("./config.json") // config를 선언하여 config.json이 필요하다고 선언하였습니다.
client.on("ready", () => {
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`);
});
client.commands = new Discord.Collection() // commands를 discord.collection을 사용하였습니다.
client.aliases = new Discord.Collection()// aliases를 discord.collection을 사용하였습니다.

fs.readdirSync("./Commands/").forEach(dir => { // fs 모듈을 이용하여 ./Commands/ 폴더 안에 내용을 불러와 forEach를 합니다 이후에 선언되는 것은 dir로 합시다.
    const Filter = fs.readdirSync(`./Commands/${dir}`).filter(f => f.endsWith(".js")); // Fillter를 선언하여 Commands/여러 폴더들을 안에 .js로 끝나는 것들로 필터링 합시다.
    Filter.forEach(file => {  // 안에 .js 파일들을 forEach하여 이후에 선언되는 것은 file로 합시다
        const cmd = require(`./Commands/${dir}/${file}`); // cmd를 선언하여 ./Commands/${dir}/${file}가 필요하다고 합시다
        client.commands.set(cmd.config.name, cmd) // 우리가 콜랙션으로 지정한 것들을 지정해줍시다 (안에 괄호는 그 안에 있는 config에 name을 지정하고 명령어에 이름을 저장합니다.)
        for (let alias of cmd.config.aliases) { // alias를 선언하고 cmd안에 있는 config.aliases가 여러개 있을텐데 그것들을 for로 반복합시다
            client.aliases.set(alias, cmd.config.name) // 콜렉션으로 지정한 것들을 다 넣어줍시다
        }
    })
})


function runCommand(command, message, args, prefix) { // 명령어를 실행할 때 쓸 함수입니다!
    if (client.commands.get(command) || client.aliases.get(command)) { // 만약에 command가 있는가 이후 true
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command)) // cmd를 따로 선언합시다 (해당 명령어를 get하여 불러오고)
        if (cmd) cmd.run(client, message, args, prefix); return // 만약에 cmd가 있다면 그 커멘드를 실행시켜줍니다.
    }
}
client.on("message", async msg => {
    const prefix = "튜토야 " // 접두사(prefix)를 저는 튜토야 라고 선정하였습니다!
    if (!msg.content.startsWith(prefix)) return // 만약에 메세지 내용이 접두사로 시작하지 않으면 return
    let args = msg.content.slice(prefix.length).trim().split(/ +/g) // argument
    let command = args.shift().toLowerCase() // 커멘드에 대한 이름을 선언
    try { // 아래의 명령어를 시도합니다.
        runCommand(command, msg, args, prefix) // 위에서 함수로 선언한 것을 command, msg(message), args(argument), prefix를 불러와 명령어를 실행
    } catch (e) {
        console.error(e) // 명령어를 실행하는 도중 에러가 발생하였다고 알려줍시다.
    }
})

client.login(config.token) // config에 token 부분을 불러오게 합시다.}

/**
 * 이제 Commands 폴더를 생성하고 Bot, Moderator 폴더를 생성후 명령어 소스는 아래와 같이 사용하시면 됩니다.
   exports.run = async (client, msg, args, prefix) => {
    // 여기 부분에 평소에 작성하던 코드를 이쪽에서 해주시면 되요!
}

exports.config = {
    name: 'name', // 말 그대로 봇 명령어 이름이에요
    aliases: ['aliases', 'aliases1', 'aliases2'], // 여기는 위에 봇 명령어 이름을 aliases, aliases1, aliases2 처럼 적은거대로 명령어를 실행하면 위에 코드가 작동해요
    category: ['bot'], // 여기는 카테고리에요. 자신이 원하는데로 카테고리를 분류해주시면 될꺼 같아요.
    des: ['config 설정방법'], // 여기는 해당 명령어에 대한 설명입니다.
    use: ['튜토야 exports 사용법'] // 당신이 원한다면 사용 방법을 적어주시면 다른 유저분들께 도움이 될꺼에요 (추후에 help 명령어 만들예정)
}
 */
