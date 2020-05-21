### 웹훅을 생성하는 방법!

**만약에 당신이 서버에 관리자 권한이나 따로 웹훅 권한이 있으시다면 생성하거나 관리를 하실 수 있습니다!**   

![관리자](https://cdn.discordapp.com/attachments/708325535133990963/709005658711654430/unknown.png)
![웹훅 관리](https://cdn.discordapp.com/attachments/708325535133990963/709005853629612053/unknown.png)

#### 1. 왼쪽 위에 서버 이름 적혀있는 곳을 누르시고 **서버 관리**를 들어가주세요.   

![서버 이름 적힌곳 누르면 나오는 이미지](https://cdn.discordapp.com/attachments/708325535133990963/709005304632705064/unknown.png)

#### 2. 왼쪽에 여러가지 있을텐데 **웹후크**를 들어가주세요.   

![웹후크](https://cdn.discordapp.com/attachments/708325535133990963/709006515390119957/unknown.png)

#### 3. **웹후크 만들기**를 누르시고 편집 라인에서 **웹후크 이름을 수정하고 원하는 채널을 설정**을 해주신 후 URL를 복사해주세요..   
(**"저는 webhook-test로 설정하였어요"**)   

![편집라인](https://cdn.discordapp.com/attachments/708325535133990963/709007299431366736/unknown.png)

#### 4. 그러면 이제 URL를 확인해봅시다.

일단 제가 만든 웹훅의 URL은 아래와 같아요!   
**https://discordapp.com/api/webhooks/709006707640107029/piBftlF4QTdTfZdvs6vUJGRZBtdv-GrfAC-fFNBVfncXAfFhkyyHh_xr14cBkiEhRi7j**   

웹훅의 아이디: 709006707640107029   
웹훅의 토큰: piBftlF4QTdTfZdvs6vUJGRZBtdv-GrfAC-fFNBVfncXAfFhkyyHh_xr14cBkiEhRi7j   

이런식으로 되어있을꺼에요!
이것들을 이제 어떻게 봇 소스에 적용하나?

```js
const hook = new Discord.WebhookClient('709006707640107029', 'piBftlF4QTdTfZdvs6vUJGRZBtdv-GrfAC-fFNBVfncXAfFhkyyHh_xr14cBkiEhRi7j')

hook.send("Hello, new World")
```
이런식으로 사용할 수 있어요!
