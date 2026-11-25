# Webhook으로 알림을 보낼 때의 설정
Slack이나 Microsoft Teams에 알림을 보내려면 "Webhook URL"이 필요합니다. Webhook URL은 알림을 받기 위한 전용 URL입니다.  
이 페이지에서는 Webhook URL을 받는 방법과, Slack에서 특정 사람에게 멘션을 붙이기 위한 설정을 설명합니다.

| 하고 싶은 것 | 볼 곳 |
|---|---|
| Slack에 알림을 보낸다 | [Slack에서 받는 절차](/ko/notify_webhook?id=slack에서-받는-절차) |
| Microsoft Teams에 알림을 보낸다 | [Microsoft Teams에서 받는 절차](/ko/notify_webhook?id=microsoft-teams에서-받는-절차) |
| Slack 알림에서 사용자에게 멘션을 붙인다 | [Slack ID 설정 방법](/ko/notify_webhook?id=slack-id-설정-방법) |

## Slack에서 받는 절차
1. 다음 URL을 엽니다.  
https://slack.com/services/new/incoming-webhook  

2. 알림을 보낼 채널을 선택합니다.  
그런 다음 "수신 웹후크 통합 앱 추가"를 클릭합니다.  
![알림](../img/notify/notify_slack1.png)  

3. Webhook URL이 만들어지므로 복사합니다.  
![알림](../img/notify/notify_slack2.png)  

4. 복사한 Webhook URL을 Exment의 알림 설정에 붙여 넣습니다.

## Microsoft Teams에서 받는 절차
1. Teams를 열고 알림을 보낼 팀의 "팀 관리"를 클릭합니다.  
![알림](../img/notify/notify_teams1.png)  

2. "앱" 탭을 클릭합니다.  
![알림](../img/notify/notify_teams2.png)

3. "더 많은 앱" 탭을 클릭합니다.  
![알림](../img/notify/notify_teams3.png)

4. "Incoming Webhook"을 클릭합니다.  
![알림](../img/notify/notify_teams4.png)

5. "설치"를 클릭합니다.  
![알림](../img/notify/notify_teams5.png)

6. 알림을 보낼 채널을 선택합니다. 그런 다음 "설정"을 클릭합니다.  
![알림](../img/notify/notify_teams6.png)

7. 알림에서 쓸 이름을 입력하고 "만들기"를 클릭합니다.  
![알림](../img/notify/notify_teams7.png)

8. Webhook의 URL이 만들어지므로 URL을 복사하고 "완료"를 클릭합니다.  
![알림](../img/notify/notify_teams8.png)

9. 복사한 Webhook URL을 Exment의 알림 설정에 붙여 넣습니다.


## Slack ID 설정 방법
Slack에서 특정 사람에게 멘션(그 사람을 지정하여 부르는 것)을 붙이고 싶을 때의 설정입니다.  
사용자별 Slack ID를 넣는 열을 만들고, 시스템 설정에서 그 열을 선택합니다. 처음에 1번만 하십시오.

1. [사용자 정의 테이블](/ko/table) 설정에서 "사용자" 테이블의 "사용자 정의 열 설정" 링크를 클릭합니다.  
![알림](../ja/img/notify/notify_slack3.png) 

2. 사용자 테이블의 [사용자 정의 열](/ko/column) 설정에서 다음 사용자 정의 열을 추가합니다.
    - 열 이름(영숫자), 열 표시 이름: 원하는 이름
    - 열 종류: "한 줄 텍스트"

    ![알림](../ja/img/notify/notify_slack4.png) 

3. [시스템 설정](/ko/system_setting) 화면의 "상세 설정"에서 "Slack ID 설정 열(사용자)"에 방금 추가한 Slack ID 열을 선택합니다.  
![알림](../ja/img/notify/notify_slack5.png) 

4. 사용자 데이터의 편집 화면에서 각 사용자의 Slack ID를 입력합니다. 그 사용자에게 알림을 보낼 때 멘션이 붙습니다.  
※ Slack 화면에서 사용자 ID를 확인하는 방법은 [여기](https://auto-worker.com/blog/?p=27)(일본어)를 확인하십시오.  
![알림](../ja/img/notify/notify_slack6.png) 

이제 알림 설정 화면에서 사용자 데이터에 입력한 Slack ID에 멘션을 붙일 수 있습니다.  
알림 설정 화면에서는 알림 대상의 표시가 다음과 같이 바뀝니다. (위: Slack ID 설정을 하지 않았을 때, 아래: 설정을 했을 때)

![알림](../ja/img/notify/notify_slack7.png) 
![알림](../ja/img/notify/notify_slack8.png) 

