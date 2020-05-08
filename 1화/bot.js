const Discord = require("discord.js"); // Node Module Package 에서 우리가 사용할 Discord.js 모듈을 불러옵시다.
const client = new Discord.Client(); // Discord.js 에서 핵심적으로 쓰이는 아이는 Client 라는 친구를 사용하게 됩니다.
// client 라는 친구를 bot으로 수정하여 사용해도 되긴 해요! 하지만 이후에 작성되는 모든 코드에 client가 들어갈 예정이니 참고해주세요!

client.on("ready", () => { // client에 이벤트 함수인 ready를 사용하였습니다.
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`); // console.log는 콘솔에 메세지를 보내는 의미에요, 우리가 보낼 메세지는 "USER#1234 봇에 로그인 하였습니다." 라고 보낼겁니다.
}); // 세미콜론(;)은 사용해도 상관 없어요 하지만 세미콜론 뒤에는 아무것도 사용하실 수 없으니 참고해주세요!
// 그리고 괄호 잘 닫았나 잘 확인하면서 코드를 작성해야해요! 안그러면 에러를 뿜게 되거든요 ㅡㅅㅡ...
// Tip! on과 once는 차이가 큽니다! "계속 들을 것이냐" 아니면 "한번만 들을 것이냐" 의 큰 차이니 조심하여 사용해주세요.
client.on("message", msg => { // client에 이벤트 함수인 Message를 사용하였습니다.
    if (msg.content === "핑") { // 만약에 message를 사용하는 곳의 내용이 "핑" 이라고 적었다면
        msg.reply("퐁!"); // 우리는 "퐁!" 이라고 답변을 해줍시다!
    }
});

client.login("토큰"); // Client를 로그인 하기 위해서는 토큰이라는 것이 필요해요!
/**
 * 토큰은 자신만이 알아야 하고 절때로 누군가에게 도움을 받기 위해서 소스코드를 전체 복사하여 보낼 때 각별히 주의를 해주셔야 합니다.
 * 1. https://discord.com/developers/applications 사이트를 들어가주세요.
 * 2. 자신이 만들려 한 봇의 애플리케이션을 클릭하여 접속해주세요.
 * 3. SETTINGS 라인에 BOT이라는 곳을 들어가주세요.
 * 4. Build-A-Bot에 Add Bot이라고 있습니다 클릭하여 봇을 추가해주세요.
 * 5. Token이라는 곳에서 Copy 버튼을 눌러주세요
 * 6. 해당 토큰을 로그인 할려는 공간에 붙어 넣어주시면 됩니다.
 * 7. 해당 토큰은 유포하시면 "위험"하오니 조심하여 다뤄주시길 바랍니다.
 */