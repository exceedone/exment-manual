# IT サポート：監視の道具とつなぐ
※この機能は、IT サポート（公式プラグイン）の次の版から使えます。

監視の道具（Zabbix・Mackerel・Prometheus Alertmanager・Azure Monitor）やアプリのログから送られた知らせを、[IT サポート](/ja/plugin_it_support)のチケットにします。

- 同じ問題は 1 件のチケットにまとめ、回数を数えます。
- 「直りました」の知らせで、チケットにメモを書いたり、解決・完了にしたりできます。
- すぐにまた起きた問題（ばたつき）は、同じチケットを開け直します。
- ホスト名・IP アドレスで、IT 資産とつなぎます。
- 監視の道具ごとに、別のキーを使います。

送り先の URL は 1 つです。

~~~
https://あなたの Exment/support/intake/alert
~~~

「管理者設定」→「[機能の管理](/ja/feature)」で、「ITサポート：受付箱」と「ITサポート：お客様の窓口」の両方がオンのときだけ動きます（オフのときは 404）。できたチケットは、はじめはお客様に見せません。

## 送り元を作る
1. IT サポートの「設定」→「監視・エラーログから起票」の「送り元」で、監視の道具を選び、名前（例：本社の Zabbix）を入れて「送り元を作る」を押します。
2. **キー** と **署名の秘密** が 1 回だけ出ます。控えてください。IT サポートにはキーのハッシュだけが残ります。なくしたときは「キーを作り直す」を押します（前のキーはすぐ使えなくなります）。
3. 送り元の設定を決めて、「使う」をオンにして「保存」を押します。作ったばかりの送り元は「使わない」です。

| 設定 | 中身 | はじめ |
| --- | --- | --- |
| 使う | このキーで受けるか | 使わない |
| 復旧の知らせ | 「復旧しました」を書くだけ／書いて「解決」にする／書いて「完了」にする | 書くだけ |
| ばたつき | 解決・完了のあと、この分のうちにまた起きたら、同じチケットを開け直す。0 でしない | 30 分 |
| IT 資産 | ホスト名・IP アドレスで IT 資産を探して、チケットにつなぐ | つなぐ |
| 署名 | 署名のない知らせを受けない（汎用と Zabbix だけ） | 署名なしも受ける |
| 送り元の IP | 書いたアドレス・範囲（`192.0.2.0/24`）からだけ受ける。空はどこからでも | 空 |

- 送り元を「消す」と、そのキーはすぐ使えなくなります。できたチケットは残ります。
- キーの送り方は 4 つです。道具に合うものを使います。

| 送り方 | 書き方 |
| --- | --- |
| ヘッダー | `X-ITS-Key: キー` |
| Bearer | `Authorization: Bearer キー` |
| Basic 認証 | `https://its:キー@あなたの Exment/support/intake/alert` |
| URL | `https://あなたの Exment/support/intake/alert?key=キー` |

> **注意**：URL にキーを入れると、Web サーバーのアクセスログなどに残ることがあります。URL で送るときは、「送り元の IP」もしぼってください。

## 道具ごとのつなぎ方

### Zabbix（6.0 以降）
1. Zabbix の「通知」→「メディアタイプ」→「メディアタイプの作成」（Zabbix 6.0 は「管理」→「メディアタイプ」）で、タイプを **Webhook** にします。
2. 「スクリプト」に、[exment-it-support-webhook.js](https://github.com/exceedone/exment-plugins/blob/main/it-support/tools/zabbix/exment-it-support-webhook.js) の中身を貼ります。
3. 「パラメーター」に次を入れます。

| 名前 | 値 |
| --- | --- |
| its_url | `https://あなたの Exment/support/intake/alert` |
| its_key | キー |
| its_secret | 署名の秘密（署名を使わないときは空） |
| event_value | `{EVENT.VALUE}` |
| event_id | `{EVENT.ID}` |
| trigger_id | `{TRIGGER.ID}` |
| subject | `{ALERT.SUBJECT}` |
| message | `{ALERT.MESSAGE}` |
| host | `{HOST.HOST}` |
| host_ip | `{HOST.IP}` |
| event_severity | `{EVENT.SEVERITY}` |
| event_nseverity | `{EVENT.NSEVERITY}` |
| event_tags | `{EVENT.TAGS}` |
| event_opdata | `{EVENT.OPDATA}` |
| event_url | `{$ZABBIX.URL}/tr_events.php?triggerid={TRIGGER.ID}&eventid={EVENT.ID}`（`{$ZABBIX.URL}` はグローバルマクロで作ります） |
| customer | （なくてもよい）IT サポートのお客様コード |

4. 「タグの処理」をオンにすると、Zabbix の問題に、タグ `its_ticket`（チケット番号）が付きます。
5. 「メッセージテンプレート」に「問題」と「問題の復旧」を作ります。ユーザーの「メディア」にこのメディアタイプを足し、アクションの「実行内容」と「復旧時の実行内容」で送ります。

- 同じ問題とみなすもの：トリガー
- 重要度：致命的な障害 → 緊急、重度の障害 → 高、軽度の障害・警告 → 中、情報・未分類 → 低

### Mackerel
1. Mackerel の「チャンネル」で、**Webhook** のチャンネルを作ります。
2. URL に `https://its:キー@あなたの Exment/support/intake/alert`（Basic 認証）か、`https://あなたの Exment/support/intake/alert?key=キー` を入れます。
3. 通知グループで、そのチャンネルにアラートを送ります。

- Mackerel の Webhook には署名がありません。「送り元の IP」に、Mackerel の通知の送信元を書くと安全です。
- 同じ問題とみなすもの：ホスト（外形監視などホストがないときは、アラートの種類）と、監視の名前
- 復旧：`status` が `ok`、または `isOpen` が `false` の知らせ
- 重要度：CRITICAL → 緊急、WARNING・UNKNOWN → 中
- アラートでない知らせ（テストの送信など）は、受けても何もしません。

### Prometheus Alertmanager
~~~yaml
receivers:
  - name: exment-its
    webhook_configs:
      - url: https://あなたの Exment/support/intake/alert
        send_resolved: true
        http_config:
          authorization:
            type: Bearer
            credentials: キー
~~~

- 1 回の知らせに入っているアラート（50 まで）を、1 つずつチケットにします。
- 同じ問題とみなすもの：アラートの `fingerprint`（ラベルから作られる印）
- ホスト：ラベルの `host`・`hostname`・`nodename`、なければ `instance`（ポートを除く）
- 件名：注釈の `summary`、なければ `alertname`
- 重要度：ラベルの `severity`（critical → 緊急、error → 高、warning → 中、info → 低）
- お客様：ラベルの `customer`（お客様コード）

### Azure Monitor
1. Azure の「アクション グループ」に、**Webhook** のアクションを足します。URI は `https://あなたの Exment/support/intake/alert?key=キー` です。
2. 「共通アラート スキーマを有効にする」を「はい」にします。
3. アラート ルールで、そのアクション グループを使います。

- 同じ問題とみなすもの：アラート ルールと、対象のリソース
- 復旧：`monitorCondition` が `Resolved` の知らせ
- 重要度：Sev0 → 緊急、Sev1 → 高、Sev2 → 中、Sev3・Sev4 → 低
- ホスト：`configurationItems` の 1 つめ

### 汎用（JSON）・アプリのログ
~~~sh
curl -X POST https://あなたの Exment/support/intake/alert \
  -H "X-ITS-Key: キー" \
  -H "Content-Type: application/json" \
  -d '{"title":"Disk full on web01","source":"web01.example.co.jp","severity":"error","detail":"/var 98%"}'
~~~

| 項目 | 意味 |
| --- | --- |
| `title`（必須） | 件名（`message` でも受けます） |
| `source` | 発生元（ホスト名・URL。`host` でも受けます）。ドメインがお客様の「メールのドメイン」と合えば、そのお客様のチケットになります。IT 資産を探すのにも使います |
| `ip` | IP アドレス（IT 資産を探すのに使います） |
| `severity` | critical → 緊急、error → 高、warning → 中、info → 低（`level` でも受けます） |
| `status` | `resolved`・`ok`・`recovered` などで「直りました」 |
| `fingerprint` | 同じ問題をまとめる印（なければ、発生元と件名から数字を除いて作ります） |
| `detail` | 本文 |
| `customer` | お客様コード |
| `url` | 監視の画面への URL（http・https だけ） |

## 直りましたの知らせ（復旧）
同じ問題の、開いているチケットに「監視から『復旧しました』の知らせが来ました。」と書きます。送り元の「復旧の知らせ」で、そのあとを選べます。

- 書くだけ：担当者が確かめて閉じます。
- 「解決」にする：チケットを「解決」にします。設定の日数がたつと、ふだんどおり「完了」になります。
- 「完了」にする：すぐに「完了」にします。

開いているチケットがないとき（担当者がもう閉じたときなど）は、何もしません。「書くだけ」のときのメモは、ばたつきの分（1 分より短いときは 1 分）に 1 回だけ書きます。

## ばたつき
直ってすぐにまた起きる問題を、何件ものチケットにしないしくみです。チケットが解決・完了になってから、送り元の「ばたつき」の分のうちに同じ問題がまた起きたら、新しいチケットを作らずに、そのチケットを開け直します。タグ「ばたつき」が付き、回数が増えます。

開いているチケットがある間は、同じ問題の知らせは回数を数えるだけです（2・10・100・1000 回目にメモを書きます）。

## IT 資産につなぐ
次のどれかに合う IT 資産を、チケットの「IT 資産」にします。その資産に「お客様（会社）」があり、チケットのお客様が決まっていないときは、そのお客様のチケットにします。

- 資産の「名前」が、ホスト名と同じ
- 資産の「名前」が、ホスト名の最初の部分と同じ（`web01.example.co.jp` の `web01`）
- 資産の「場所・IP アドレス」に、IP アドレスかホスト名が 1 語として書いてある（`192.0.2.21` は合いますが、`192.0.2.210` は合いません）

## 署名
汎用と Zabbix では、知らせに署名を付けられます。送り元の「署名」をオンにすると、署名のない知らせ・合わない知らせ・時刻が 5 分より前か後の知らせを受けません。Zabbix のスクリプトは、`its_secret` を入れると署名を付けます。

| ヘッダー | 中身 |
| --- | --- |
| `X-ITS-Timestamp` | 送った時刻（UNIX 時間の秒） |
| `X-ITS-Signature` | `sha256=` と、「時刻 + `.` + 本文」を署名の秘密で HMAC-SHA256 した 16 進数 |

~~~sh
BODY='{"title":"Disk full on web01","source":"web01.example.co.jp"}'
TS=$(date +%s)
SIG=$(printf '%s.%s' "$TS" "$BODY" | openssl dgst -sha256 -hmac "署名の秘密" | sed 's/^.* //')
curl -X POST https://あなたの Exment/support/intake/alert \
  -H "X-ITS-Key: キー" -H "X-ITS-Timestamp: $TS" -H "X-ITS-Signature: sha256=$SIG" \
  -H "Content-Type: application/json" -d "$BODY"
~~~

## 答え
| 状態 | 答え |
| --- | --- |
| 受けた | 200。`ticket_no`（チケット番号）・`created`（新しく作ったか）・`occurrences`（回数）・`action`（create・count・reopen・note・resolve・close・ignore）。Alertmanager で 2 つ以上のときは `results` の中に 1 つずつ |
| キーがちがう | 401 |
| 署名がない・ちがう | 401（`bad_signature`） |
| 送り元を使っていない | 403（`source_disabled`） |
| 送り元の IP でない | 403（`address_not_allowed`） |
| 回数が多い | 429（送り元ごとに 1 分 120 回。まちがったキーは 1 分 30 回まで） |
| 本文が大きい | 413（1 MB まで） |

## 前からの共有のキー
前の版の、1 つの「共有のキー」は、メールの受け口（`/support/intake/mail`。Postfix のパイプなど、元のメールをそのまま POST）に使います。

- 前から使っているサイトでは、共有のキーのアラートも、今までどおり受けます（復旧・ばたつき・IT 資産の新しい動きはしません）。設定の「共有のキーではアラートを受けない」で止められます。
- 新しくセットアップしたサイトでは、共有のキーではアラートを受けません。送り元のキーを使ってください。

## 関連項目
- [IT サポート](/ja/plugin_it_support)
- [機能の管理](/ja/feature)
- [README（GitHub）](https://github.com/exceedone/exment-plugins/blob/main/it-support/README.md)
