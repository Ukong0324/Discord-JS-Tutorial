### 라이브러리를 쉽게 읽는 방법!   

1. 일단은 **라이브러리를 먼저 들어가**볼까요?   
[Offcial Docs](https://discord.js.org/#/) | [Unoffical Korean Docs](https://discord-kr.js.org/#/)   

![image](https://cdn.discordapp.com/attachments/708325535133990963/715862892955566080/unknown.png)   

2. 우리는 docs를 읽으러 왔으니 **오른쪽 위에 Documentation를 눌러**줍시다!   

![image](https://cdn.discordapp.com/attachments/708325535133990963/715863273978855451/unknown.png)   

3. 음.. 일단은 **검색을 할려면 오른쪽 위에 Search**라고 있어요! 거기서 한번 **Message** 라는걸 찾아봅시다!   

![image](https://cdn.discordapp.com/attachments/708325535133990963/715864091381596221/unknown.png)   

4. 으아... 엄청나게 결과 값이 나오죠?   
일단은 제가 찾을려는 것이 **클래스 문이니 🇨 라고 되어있는 곳에 Message를 클릭**해줍시다!   

![image](https://cdn.discordapp.com/attachments/708325535133990963/715865222312624129/unknown.png)   

5. 그러면 위에 사진처럼 보일거에요!   

그러면 질문이 있을꺼에요!   

Q: 제작자님 여기서 **Properties, Methods**가 무엇인가요?   
A: Properties: **괄호를 사용하지 않고 결과값을 표출**을 해줍니다.   
Methods: **괄호를 사용하여 괄호 안에 값을 기입하여 결과값을 표출**을 해줍니다.   

우리가 늘 사용하게 될 **message에서 한번 content 찾아**볼까요?   

![image](https://cdn.discordapp.com/attachments/708325535133990963/715865529646317628/unknown.png)   

6. 클릭을 해보니 해당 라인에 자동으로 이동되면서 **설명이 적혀**있네요!   
The content of the message (해석하면 메세지 내용 이라고 되겠네요)   

7. 그러면 우리가 **메인 파일에서 if (message.content) 를 쓰는것이 어떤 의미였는지 알게 되었어**요!   
그러면... **마지막으로 하나 더** 해볼까요?   

- - -

8. 한번 guildMember를 찾아봅시다!   

![image](https://cdn.discordapp.com/attachments/708325535133990963/715866148029202552/unknown.png)   

9. 여기서 이제 질문이 하나 올라올꺼에요.   
Q: 제작자님! **guildMember**가 머에요..?   
A: 설명을 드리자면 **우리가 흔히들 말하는 서버가 여기서는 guild(길드)**로 표현하고 있는데   
그 안에서 **우리는 유저라고 표현하긴 하지면 member(멤버)**로 표현하고 있어요!   
약간 코드 형식으로 말씀 드리자면   

```js
message.member
```

이렇게 쓰시면 저기서 **member가 GuildMember로 표현**이 되요!   

10. 나머지는 알아서 충분히 하실 수 있다고 봐요!   
***정말로 모르겠으면 디스코드로 연락주세요!***

### **라이브러리 읽는 법은 여기까지 마치도록 하겠습니다!**   

나머지는 메인 파일에서 뵙도록 합시다!   
