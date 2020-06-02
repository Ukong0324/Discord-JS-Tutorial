const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "튜토야 " // 우리는 이제 접두사를 추가할꺼에요! (저는 튜토야 라고 했습니다!)

client.on("ready", () => {
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`);
});
client.on("message", msg => {
    if (!msg.guild) return; // 만약에 길드 이외 다른곳이라면 return을 사용을 해줍시다.
    if (msg.author.bot) return; // 여기도 마찬가지로 만약에 메세지 사용자가 봇이라면 return을 사용합시다.
    if (message.content.indexOf(prefix) !== 0) return; //메세지가 prefix로 시작되지 않을시 return을 사용을 해줍시다
    var args = message.content.slice(prefix.length).trim().split(/ +/g); // argument(args)
    var command = args.shift().toLowerCase(); //명령어를 가져올꺼에요 args의 어레이중 가장 앞부분을 가져옵니다 toLowerCase()는 대문자를 소문자로 변경시켜줍니다. Kick같은 실수를 방지할수 있죠
    if (command === `핑`) { // 이전에 핑을 퐁으로 답변했다면 웹소켓 지연시간을 알려주는 코드로 해봅시다!
        msg.reply(`${client.ws.ping}ms`); // CLIENT에 WS(WEBSOCKET)이라는 곳에서 PING을 구해오는 값입니다.
    }
    if (command === `임베드`) {
        var embed = new Discord.MessageEmbed()
            .setTitle("여기는 대표 타이틀!") // 여기는 임베드에서 타이틀로 사용됩니다!
            .setDescription("여기는 대표 설명!") // 여기는 타이틀을 설명해주는 걸로 사용됩니다!
            .setColor("RED") // 여기는 색상을 설정하는 공간인데 HEX값을 넣으셔도 됩니다! (#7239DA) "red" 말고 다른것들도 있어요! 맨 밑에다가 적어놓을테니 확인해주세요!
            .setFooter("여기는 말머리?") // 여기는 임베드의 밑부분에서 말머리로 사용됩니다!
            .setThumbnail("http://blogfiles.naver.net/20151023_23/shin_0305_1445573936921jrPRT_JPEG/%BD%E6%B3%D7%C0%CF%BF%B9%BD%C3.jpg") // 여기는 임베드에서 썸네일로 불려옵니다! (URL를 넣어가 경로를 기입하면 그 경로에 있는 이미지를 불러와 썸네일로 이용되요!)
            .setImage("http://blogfiles.naver.net/MjAxODA4MjNfMjQ0/MDAxNTM1MDE5ODk1Njc3.c5p_E9tLPEXGnXPAkpOuhpEOm7VLqopETMTfJ9C8CWYg.6FCsIDtjWnd19lSzmw_z1oHm9E7fd39s1RmRPeBOF3Ag.JPEG.dlawldbs20/VD-poem-20150915-01.jpg") // 여기는 임베드에서 이미지로 사용되는 곳입니다. // 위에 설명이랑 같아요

            .setTimestamp() // 여기는 타임스탬프를 설정하는 공간인데 비워두면 현재시각, 여기에 타임스탬프를 넣으시면 그 값에 맞는 시간으로 변환됩니다!
            .addField("여기는 소제목", "여기는 소설명(??)") // 첫번째 칸은 임베드의 소제목, 두번째 칸은 임베드의 소제목의 설명하는 공간입니다! 세번째 칸은 INLINE으로 사용되는데 TRUE 하면 라인에 들어가는거고 FALSE 하면 밑라인으로 내려가게 됩니다.
        msg.reply(embed) // EMBED를 REPLY로 답변합시다!
    }
    if (command === `웹훅`) {
        const hook = new Discord.WebhookClient('WebHook ID', 'WebHook Token'); // https://discordapp.com/api/webhooks/{WebHook ID}/{WebHook Token} // 웹훅 생성하는 방법은 README.MD에서 설명해드릴꺼에요!
        hook.send("Hello, new World!") // 웹훅이 채널이 지정되어 있는 곳에다가 우리는 "Hello, new World" 라고 보내주는거에요!
    }

    /** 
     * Moderator (관리자 기능!)
     * 여기 부분은 관리자 기능을 추가할려고 해요!
     * 코드를 꼭 이해를 하시고 복붙만 하여 사용하여 문의를 안해주셨으면 좋겠어용..
     * ※ 주의사항 ※
     * 주석으로 설명하는 라인을 잘 확인하시고 403 (permissions denial) 안뜨게 봇의 권한을 잘 사용해주세요.
    */

    if (command === `추방`) { // 만약에 메세지 내용이 추방이라면 ?
        var user = msg.mentions.users.first(); // var로 user를 선언을 해줍시다. (맨션을 먼저 언급을 해주라 라는 의미에용, 맨션을 안하면 undefined가 뜹니다)
        if (!user) { // 그래서 만약에 user가 안된다면
            msg.reply("추방하시기 전에 맨션을 먼저 해주세요!") // 맨션을 먼저 해달라고 문구를 전송해줍시다!
        } else { // 아니라면?
            var member = msg.guild.member(user); // var로 member를 선언을 해줍니다
            if (member) { // 만약에 member가 있다면
                member.kick(`${msg.author.username}님의 의해 서버에서 추방됨.`).then(member => { // 해당 유저를 추방하고, audit log에 추방을 당했다고 로그를 남겨줍시다.
                    msg.reply(`성공적으로 ${member.user.tag}님을 추방하였습니다.`) // 그리고 채팅 친 곳에서 해당 유저를 추방 당했다고 알려줍시다.
                })
            } else { // member가 없다면
                msg.reply("이 서버에 존재하지 않은 유저입니다!") // 서버에 없는 존재를 맨션한걸로 전송해줍시다!
            }
        }
    }

    if (command === `차단`) { // 만약에 메세지 내용이 차단이라면?
        var user = msg.mentions.users.first(); // var로 user를 선언을 해줍시다. (맨션을 먼저 언급을 해주라 라는 의미에용, 맨션을 안하면 undefined가 뜹니다)
        if (!user) { // 그래서 만약에 user가 안된다면
            msg.reply("차단하시기 전에 맨션을 먼저 해주세요!") // 맨션을 먼저 해달라고 문구를 전송해줍시다!
        } else {
            var member = msg.guild.member(user); // var로 member를 선언을 해줍니다
            if (member) { // 만약에 member가 있다면
                member.ban(`${msg.author.username}님의 의해 서버에서 추방됨.`).then(member => { // 해당 유저를 추방하고, audit log에 차단을 당했다고 로그를 남겨줍시다.
                    msg.reply(`성공적으로 ${member.user.tag}님을 추방하였습니다.`) // 그리고 채팅 친 곳에서 해당 유저를 차단당했다고 알려줍시다.
                })
            } else { // member가 없다면
                msg.reply("이 서버에 존재하지 않은 유저입니다!") // 서버에 없는 존재를 맨션한걸로 전송해줍시다!
            }
        }
    }

    if (command === `청소`) { // 만약에 메세지 내용이 청소라면?
        if (!args[0]) return msg.reply("청소할 만큼의 값을 정수로 적어주세요!") // 만약에 argument가 비어있다면? 값을 적어달라고 메세지를 답변해줍시다.
        if (!Number(args[0])) return msg.reply("메세지를 지울 값이 숫자가 아니면 안되요!") // 만약에 argument가 숫자가 아니라면 숫자로 적어달라고 답변해줍시다.
        if (args[0] < 1) return msg.reply("메세지를 지울 값을 1보다 작게 하시면 안되요!") // 만약에 argument가 1보다 작으면 그렇게 못한다고 답변해줍시다.
        if (args[0] > 100) return msg.reply("메세지를 지울 값이 100보다 크면 메세지가 안지워져요!") // 만약에 argument가 100보다 크면 그렇게 못한다고 답변해줍시다 (최대 100개 삭제가능.)

        msg.channel.bulkDelete(args[0]).then(msg.reply(`성공적으로 ${args[0]}개 만큼 메세지를 삭제하였습니다!`)) // message.channel 에서 bulkDelete 라는 것을 사용하여 수 만큼 삭제한 후 then으로 "몇개를 삭제하였다"라고 답변해줍시다.
    }
});

client.login("토큰")

/**	
 * 그리고 제가 1화에서 설명하지 못한 부분이 있었어요 ㅠㅠ	
 * 현재 디스코드 API에서 버그가 있는거 같은지는 모르겠지만 제 소스는 맞는데 코드가 정상적으로 돌아가지가 않더라고요!	
 * 그런 부분은 제쪽의 잘못이 아니라 디코에서의 문제라 시간을 좀 둬야할꺼 같아요!... 	
 * 그리고 저희가 하고 있는 것은 Discord.JS라는 것을 사용하여 코딩을 진행하였는데, 도큐를 제가 따로 안알려드렸더라고요!	
 * 그래서 제가 아레에 링크 2개를 적어놓을테니 확인해주세요!	
 * 영문판 (공식): https://discord.js.org/ 	
 * 한글판(번역중, 비공식): https://discord-kr.js.org/	
 */	

/**	
 * Discord MessageEmbed Color List	
   * - `DEFAULT`	
   * - `WHITE`	
   * - `AQUA`	
   * - `GREEN`	
   * - `BLUE`	
   * - `YELLOW`	
   * - `PURPLE`	
   * - `LUMINOUS_VIVID_PINK`	
   * - `GOLD`	
   * - `ORANGE`	
   * - `RED`	
   * - `GREY`	
   * - `DARKER_GREY`	
   * - `NAVY`	
   * - `DARK_AQUA`	
   * - `DARK_GREEN`	
   * - `DARK_BLUE`	
   * - `DARK_PURPLE`	
   * - `DARK_VIVID_PINK`	
   * - `DARK_GOLD`	
   * - `DARK_ORANGE`	
   * - `DARK_RED`	
   * - `DARK_GREY`	
   * - `LIGHT_GREY`	
   * - `DARK_NAVY`	
   * - `RANDOM`	
 */
