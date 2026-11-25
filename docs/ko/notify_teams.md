# Teams의 개인 채팅으로 알림 보내기

알림을 그 사람의 **Teams 개인 채팅** 으로 직접 보낼 수 있습니다(Exment 7.2.6 이상).
Exment가 Teams의 **워크플로**(Power Automate)에 알림 내용을 보내고, 워크플로가 그 사람의 채팅에 봇(흐름 봇)으로 게시합니다.

- 보내는 것은 제목, 본문, 데이터로 가는 링크입니다. Teams에서는 제목이 굵은 머리글이 되고, 본문은 단락과 번호 목록 그대로, "열기" 버튼이 붙은 카드(Adaptive Card)로 도착합니다
- 알림 템플릿의 제목과 본문을 받는 사람의 언어([사용자의 언어](/ko/user_locale))로 사용합니다
- 보낼 곳의 Teams 계정은 Exment 사용자의 **메일 주소** 입니다

> 채널로 보내는 지금의 방법([Webhook](/ko/notify_webhook)의 Microsoft Teams)은 Microsoft가 Office 365 커넥터를 종료하는 방향입니다. 같은 워크플로로 채널에도 보낼 수 있습니다(아래의 "채널로 보낼 때").

## 1. Teams에서 워크플로 만들기

Teams 조직의 사람이 만듭니다(만든 사람의 계정으로 동작합니다).

1. Teams 왼쪽의 "앱"에서 **워크플로**(Workflows)를 열고 "만들기" → "처음부터 만들기"를 선택합니다
2. 트리거로 **"Teams 웹후크 요청이 수신된 경우"**(When a Teams webhook request is received)를 선택합니다
   - "흐름을 트리거할 수 있는 사용자"는 **"모든 사용자"**(Anyone)로 합니다. Exment에서 보내는 요청은 주소를 알고 있는지만으로 받아들입니다. **주소는 비밀로 해 주십시오**
3. "새 단계"에서 **"채팅 또는 채널에 카드 게시"**(Post card in a chat or channel)를 추가합니다
   - 게시자: **흐름 봇**
   - 게시 위치: **흐름 봇과 채팅**
   - 받는 사람: "식"에 `triggerBody()?['to_email']` 을 넣습니다
   - 적응형 카드: "식"에 `triggerBody()?['card']` 를 넣습니다
4. 저장하면 트리거에 **HTTP POST URL** 이 만들어집니다. 이것을 복사합니다

### Exment가 보내는 JSON

워크플로는 다음 형태의 JSON을 받습니다. 카드(`card`)는 Exment가 만들므로, 워크플로는 그대로 게시하기만 하면 됩니다.

```json
{
  "to_email": "user1@example.com",
  "title": "과제가 업데이트되었습니다(ISS00423)",
  "body": "**로그인할 수 없음**\n\n1. 상태를 \"대응 중\"으로 바꿨습니다",
  "url": "https://exment.example.com/admin/data/pm_issue/423",
  "sender": "Seiji Noro",
  "locale": "ko",
  "card": { "type": "AdaptiveCard", "version": "1.4", "body": [ ... ], "actions": [ ... ] }
}
```

트리거의 "요청 본문 JSON 스키마"를 사용할 때는 다음을 넣어 주십시오.

```json
{
  "type": "object",
  "properties": {
    "to_email": { "type": "string" },
    "title": { "type": "string" },
    "body": { "type": "string" },
    "url": { "type": ["string", "null"] },
    "sender": { "type": ["string", "null"] },
    "locale": { "type": "string" },
    "card": { "type": "object" }
  }
}
```

## 2. Exment에 설정하기

1. "관리자 설정" → "기능 관리"에서 **"Teams 알림(개인 채팅)"** 을 "사용"으로 합니다(처음에는 "사용 안 함"입니다)
2. "시스템 설정"(상세 설정)의 **"Teams(워크플로)"** 의 "새 주소"에 복사한 URL을 넣고 저장합니다
   - 주소는 비밀 값이므로 저장한 뒤에는 화면에 나오지 않습니다("설정됨"이라고만 나옵니다). 비워 둔 채 저장하면 지금의 주소를 계속 사용합니다. 지울 때는 "주소 삭제"를 켜고 저장합니다
   - 주소는 작업 로그에도 나오지 않습니다
3. 알림 설정([알림](/ko/notify))에서 "실행 액션"으로 **"Teams(개인)"** 을 선택하고, 알림 대상(사용자·조직 열, 만든 사람 등)을 선택합니다

## 채널로 보낼 때

워크플로의 "게시 위치"를 **채널** 로 하고, 팀과 채널을 선택합니다(받는 사람의 식은 필요 없습니다). Exment에서는 그 알림의 알림 대상을 1명으로 해 주십시오(1명에게 1번씩 보내므로, 알림 대상이 많으면 같은 카드가 여러 번 게시됩니다).

## 잘 도착하지 않을 때

- Exment의 로그(storage/logs)에 "the Teams workflow answered …"라고 나와 있을 때는 워크플로의 실행 기록(Teams의 워크플로 → 그 흐름 → 실행 기록)에서 이유를 봅니다
- 받는 사람을 찾을 수 없을 때는 Exment 사용자의 메일 주소가 Teams 계정(조직의 메일 주소)과 같은지 확인합니다
- 아무 일도 일어나지 않을 때는 기능 관리에서 "Teams 알림(개인 채팅)"이 "사용"으로 되어 있는지, 시스템 설정에 주소가 들어 있는지 확인합니다
