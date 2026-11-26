# LINE WORKS 로 알림 보내기

알림을 **LINE WORKS** 의 Bot 으로 토크방이나 각 사람에게 보낼 수 있습니다(Exment 7.3.0 이상).
LINE WORKS API 2.0 의 Bot 을 사용합니다.

- **LINE WORKS (토크방)**: Bot 이 들어 있는 토크방(채널)으로 보냅니다
- **LINE WORKS (개인)**: 알림 대상 사용자에게 한 명씩, 사용자의 LINE WORKS ID(기본은 메일 주소)로, 받는 사람의 언어([사용자 언어](/ko/user_locale))로 보냅니다
- 제목·본문(텍스트만)·데이터 링크를 보냅니다(2000자까지)

## 1. LINE WORKS Developers Console 에서 준비

LINE WORKS 관리자가 합니다.

1. [LINE WORKS Developers Console](https://dev.worksmobile.com/) 에서 **앱**을 만들고 **Client ID** 와 **Client Secret** 을 적어 둡니다
2. 앱의 **OAuth Scopes** 에 `bot` 을 추가합니다
3. 앱의 **Service Account** 를 만들고 **Private Key** 를 다운로드합니다. Service Account(`xxxx.serviceaccount@...`)를 적어 둡니다
4. **Bot** 을 만들고 **Bot ID** 를 적어 둡니다
5. LINE WORKS 관리 화면에서 Bot 을 테넌트에 추가하고 사용자에게 공개합니다
6. 토크방으로 보낼 때는 그 토크방에 Bot 을 초대하고 **채널 ID** 를 적어 둡니다

> Client Secret 과 Private Key 는 비밀입니다. 가진 사람은 Bot 으로 보낼 수 있습니다.

## 2. Exment 에서 설정

시스템 관리자가 합니다.

1. [기능 관리](/ko/feature)에서 **「LINE WORKS 알림」** 을 켭니다(처음에는 꺼져 있습니다)
2. 「시스템 설정」→「상세 설정」의 **「LINE WORKS (Bot)」** 에 Client ID·Client Secret·Service Account·Private Key·Bot ID 를 입력하고 저장합니다
    - Private Key 는 다운로드한 키 파일의 내용을 그대로 붙여 넣습니다
    - Client Secret 과 Private Key 는 암호화하여 저장하며, 저장 후에는 화면에 표시하지 않습니다. 바꿀 때는 새 값을 넣고, 지울 때는 「지우기」를 켭니다
3. 메일 주소가 아닌 LINE WORKS ID 로 개인 앞에 보낼 때는 **「LINE WORKS ID 열」** 에서 그 ID 가 든 사용자 열을 고릅니다

## 3. 알림 만들기

[알림 설정](/ko/notify)의 「알림 액션」에서 고릅니다.

- **LINE WORKS (토크방)**: 「LINE WORKS 토크방 ID」에 채널 ID 를 넣습니다
- **LINE WORKS (개인)**: 「알림 대상」을 고릅니다(메일과 같습니다)

## 보내지 못했을 때

- 몇 번 다시 보냅니다(큐 워커가 있으면 1분 뒤·5분 뒤)
- 그래도 보내지 못하면, 알림을 만든 사람(모를 때는 시스템 관리자)의 화면 알림에 받는 곳과 이유가 옵니다
- 받는 곳의 주소는 [Webhook](/ko/notify_webhook)과 같이 확인합니다. 서버에서 `auth.worksmobile.com` 과 `www.worksapis.com` 에 https 로 연결되게 해 주세요
