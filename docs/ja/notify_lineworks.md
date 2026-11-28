# LINE WORKS に通知する

通知を、**LINE WORKS** の Bot から、トークルームや、その人あてに送れます（Exment 7.3.0 以降）。
LINE WORKS API 2.0 の Bot を使います。

- **LINE WORKS（トークルーム）**：Bot が入っているトークルーム（チャンネル）に送ります
- **LINE WORKS（個人あて）**：通知先のユーザーに、1 人ずつ送ります。送り先は、ユーザーの LINE WORKS の ID（初めはメールアドレス）です。受け取る人の言語（[ユーザーの言語](/ja/user_locale)）で送ります
- 送るのは、件名・本文（文字だけ）・データへのリンクです（2000 文字まで）

## 1. LINE WORKS Developers Console で準備する

LINE WORKS の管理者が行います。

1. [LINE WORKS Developers Console](https://dev.worksmobile.com/) で **アプリ** を作ります。**Client ID** と **Client Secret** をひかえます
2. アプリの **OAuth Scopes** に `bot` を足します
3. アプリの **Service Account** を作り、**Private Key** をダウンロードします。Service Account（`xxxx.serviceaccount@...`）をひかえます
4. **Bot** を作り、**Bot ID** をひかえます
5. LINE WORKS の管理画面で、Bot をテナントに足し、使う人に公開します
6. トークルームに送るときは、そのトークルームに Bot を招待し、トークルームの **チャンネル ID** をひかえます

> Client Secret と Private Key は秘密です。持っている人は、Bot として送れます。

## 2. Exment で設定する

システム管理者が行います。

1. [機能の管理](/ja/feature) で **「LINE WORKS への通知」** をオンにします（初めはオフです）
2. 「システム設定」→「詳細設定」の **「LINE WORKS（Bot）」** に、Client ID・Client Secret・Service Account・Private Key・Bot ID を入れて保存します
    - Private Key は、ダウンロードした鍵のファイルの中身を、そのまま貼ります
    - Client Secret と Private Key は、暗号化して保存し、保存したあとは画面に出しません。変えるときは新しい値を入れ、消すときは「消す」をオンにします
3. 個人あてで、メールアドレスではない LINE WORKS の ID に送るときは、**「LINE WORKS の ID の列」** に、その ID を入れたユーザーの列を選びます

## 3. 通知を作る

[通知の設定](/ja/notify) の「通知アクション」で選びます。

- **LINE WORKS（トークルーム）**：「LINE WORKS のトークルームの ID」に、チャンネル ID を入れます
- **LINE WORKS（個人あて）**：「通知先」を選びます（メールなどと同じです）

## 送れなかったとき

- 送れなかったときは、何回か送りなおします（キューのワーカーがあれば 1 分後・5 分後）
- それでも送れないときは、通知を作った人（わからないときはシステム管理者）の画面のお知らせに、送り先と理由が届きます
- 送り先のアドレスは、[Webhook](/ja/notify_webhook) と同じように確かめます。サーバーから `auth.worksmobile.com` と `www.worksapis.com` に、https でつながるようにしてください
