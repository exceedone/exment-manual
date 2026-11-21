# Groupware（公式プラグイン）
「Groupware」は、Exment のグループウェアの**公式プラグイン**です。無料で使えます。今あるのは次の 2 つです。

- **Web メール**：Outlook・Gmail のような、ブラウザーのメールソフト
- **Office**：Word（.docx）・Excel（.xlsx）・PowerPoint（.pptx）のファイルを、ブラウザーで動く Office（株式会社アイビスの [ibisOffice](https://github.com/ibisjp/ibis-office)）で開く・編集する

- ソースコード・説明：[exceedone/exment-plugins（groupware）](https://github.com/exceedone/exment-plugins/tree/main/groupware)
- ライセンス：GPL-3.0（Exment と同じ）。ibisOffice は AGPL-3.0-only です（[ibisOffice のライセンス](/ja/plugin_groupware?id=ibisoffice-のライセンス)）。
- プラグインの一覧に出る名前：Exment Plugin Groupware。内部の名前は `ExmentGroupware`、URL は `/admin/plugins/exment_groupware` です。

<!-- 画面写真：Web メール（img/plugin_groupware/gw_mail.png）と、Office で開いたファイル（img/plugin_groupware/gw_office.png）。d9 に確かめてもらってから撮る -->

## Web メール
Exment はメールサーバーを持ちません。Outlook と同じように、会社が今使っているメールサーバーに **IMAP**（受信）と **SMTP**（送信）でつなぎます。メールはサーバーに残るので、Outlook やスマホのメールと並べて使えます。Exment にメールをコピーしません。

- フォルダー・一覧（新しい順、1 ページ 50 件）・閲覧ウィンドウ・検索（件名・差出人・宛先・本文。日本語も可）・未読／フラグ付きの絞り込み・フラグ・移動（フォルダーへのドラッグも可）・迷惑メール・ごみ箱へ削除・フォルダーの作成
- 新規・返信・全員に返信・転送（添付ごと）・Cc／Bcc・添付（1 通 25MB まで）・簡単な書式・署名・下書き。`Ctrl+Enter` で送信
- 1 人で複数のアカウントを使えます。受信トレイの未読数を 1 分ごとに確かめます。
- 日本語のメール（ISO-2022-JP・Shift_JIS）をそのまま読めます。

| サービス | ログイン | サーバー |
| --- | --- | --- |
| Xserver | パスワード（ユーザー名はメールアドレス） | `sv****.xserver.jp`、IMAP 993／SMTP 465（SSL） |
| KAGOYA | パスワード（ユーザー名はメールアカウント名） | IMAP `m***.kagoya.net` 993、SMTP `smtp.kagoya.net` 465（SSL） |
| Microsoft 365 | Microsoft でサインイン（OAuth 2.0） | `outlook.office365.com` 993、`smtp.office365.com` 587（STARTTLS） |
| Gmail・Google Workspace | Google でサインイン（OAuth 2.0）、またはアプリ パスワード | `imap.gmail.com` 993、`smtp.gmail.com` 465 |
| そのほか | パスワード | どの IMAP・SMTP サーバーでも |

### Microsoft 365・Google を使うとき
システム管理者がアプリを一度登録し、プラグインの設定（「管理者設定」→「プラグイン」→「Exment Plugin Groupware」→「設定」）に入れます。設定の画面に、登録するリダイレクト URI（`…/admin/plugins/exment_groupware/mail/oauth/callback`）が出ます。

- Microsoft：Azure portal の「アプリの登録」で Web アプリを作ります。Office 365 Exchange Online の委任のアクセス許可 `IMAP.AccessAsUser.All`・`SMTP.Send` と、`offline_access openid email profile` が要ります。テナントの管理者が、そのユーザーの SMTP 認証（SMTP AUTH）を許可している必要があります。
- Google：Google Cloud console で OAuth クライアント ID（ウェブ アプリケーション）を作り、スコープは `https://mail.google.com/` です。社内で使う Google Workspace なら、「内部」のアプリにすれば Google の審査は要りません。

### 使い方
1. 左のメニューの「メール」（または `/admin/plugins/exment_groupware/mail`）を開きます。
2. 「アカウントを追加する」を押し、サービスを選びます。
3. Xserver・KAGOYA・そのほかは、パスワードを入れます。Microsoft 365・Google は「サインイン」を押して、それぞれの画面でログインします。

### セキュリティ
- パスワード・トークンは、アプリの鍵（`APP_KEY`）で暗号化して保存します。
- HTML のメールはサーバーで危ない部分を取り除き、スクリプトの動かない枠で表示します。外部の画像は「画像を表示」を押すまで読み込みません。
- つなげるのは、インターネットのアドレスのメールのポートだけです。社内のネットワークのメールサーバーにつなぐときは、管理者が設定の「社内のネットワークのメールサーバーを許可する」をオンにします。

## Office
### ファイルサーバーのファイル
[ファイルサーバー](/ja/file_server)の Word・Excel・PowerPoint のファイルの画面に、「Office で開く」ボタンが出ます。

- 押すと、新しいタブでエディターが開きます。**保存**すると、ファイルの新しい版になります（前の版は版の履歴に残ります）。
- 編集のために開いている間は**チェックアウト**になり、ほかの人は変更できません。エディターを閉じるとチェックインします。見るだけの権限の人や、ほかの人がチェックアウトしているファイルは、読み取り専用で開きます。
- 間にほかの人が保存していたときは、保存を断るので、上書きで消えることはありません。
- サーバーに LibreOffice がないときは、ファイルの画面のプレビューの欄に、エディターを読み取り専用で埋め込みます。

### データの添付ファイル
データに添付した Word・Excel・PowerPoint も、ブラウザーの Office で見られます（プロジェクト管理の課題・Wiki・プロジェクトのファイルなど）。ファイルサーバーがなくても動きます。

- 見られるのは、そのファイルをダウンロードできる人だけです。
- そのデータを編集できる人には「編集する」が出ます。保存すると、添付の中身が新しくなり、アドレスは変わりません。データには、だれが編集したかと、前の中身へのリンクがコメントで残ります。
- Exment v7.2.0 以降では、前の中身は添付の「前の版」（「版 n」）として残ります（[差し替えと前の版](/ja/data_details)）。1 つの添付ファイルに 10 個まで（`EXMENT_DOCUMENT_VERSION_LIMIT`）で、超えると古いものから消え、添付を消すと一緒に消えます。
- それより前の Exment では、前の中身は別のファイルとして残り、コメントのリンクからだけ開けます。添付を消しても、このファイルは消えません。
- 編集できるのは添付だけです（ファイルの列の値は対象外）。`EXMENT_FILE_DELETE_USERONLY` が `true` のサイトでは、ファイルを上げた人だけです。保存できる大きさは 50MB まで（Exment のアップロードの上限のほうが小さければ、そちら）です。

## 機能の管理（Exment v7.2.0 以降）
- Web メールは、「管理者設定」→「[機能の管理](/ja/feature)」に「メール」（`exment_groupware.mail`）の 1 行で出ます。システム管理者が、使う・使わないと、使える役割グループを選びます。
- 前からこのプラグインを入れていたサイトでは、更新しても「使う」のままです。**新しく入れたサイトでは「使わない」から始まる**ので、機能の管理で「メール」を「使う」にしてください（使わないのあいだは、メールの画面は 404 になります）。
- Office は、ファイルサーバーの機能に従います。ファイルサーバーが「使わない」のときは、ファイルサーバーの「Office で開く」は開きません。

## 動作要件
- Exment 7.1 以上（7.1・7.2 で確かめています）と PHP 8.2 以上。Web メールとデータの添付は、どちらでも動きます。
- ファイルサーバーのファイルを開くには、ファイルサーバーのある Exment（v7.2.0 以降）が要ります。ないときは、その部分だけ動きません。
- `zip` の拡張は、ibisOffice のインストールにだけ使います。
- Office を使うには、WebGPU のあるブラウザー（Chrome・Edge、または Safari 26 以降）と、HTTPS のサイトが要ります。

## インストール
1. プラグインを入れます。Exment v7.2.0 以降は「機能の管理」から、それより前は zip のアップロードです。[公式プラグイン](/ja/plugin_official)をご覧ください。
2. Office を使うときは、システム管理者でプラグインの画面（`/admin/plugins/exment_groupware`）を開き、「ibisOffice 0.8.9 をインストールする」を押します。ibisOffice のリリース（約 40MB、展開すると 125MB）をダウンロードし、決まった SHA-256 と合うかを確かめてから、サイトの `public/vendor/exment_groupware/ibisoffice/` に置きます。

Web サーバーが複数台のときや、`public/` に書き込めないときは、展開したリリースをほかの場所で公開し、プラグインの設定の「ibisOffice の場所（URL）」に、`index.html` のあるフォルダーの URL を入れます。

### Web サーバーの設定
- `.wasm` は `application/wasm` で送ります（最近の nginx・Apache は標準でそうなっています）。
- `.wasm` と `.js` は、gzip か Brotli で圧縮して送ります（wasm は 92MB で、圧縮すると約 4 分の 1）。nginx なら `gzip_types application/wasm application/javascript text/javascript;`。
- フォルダーに版が入っているので、長くキャッシュできます（`Cache-Control: public, max-age=31536000, immutable`）。
- Content-Security-Policy を付けているサイトは、`script-src 'self' 'wasm-unsafe-eval'` が要ります。

## ibisOffice のライセンス
ibisOffice は株式会社アイビスのソフトウェアで、AGPL-3.0-only と商用ライセンスのデュアルライセンスです。このプラグインは、ibisOffice をリリースのまま（改変せず）別の枠で動かし、プラグインには含めません（アイビスのリリースからダウンロードします）。エディターの画面とプラグインの画面に「Powered by ibisOffice」を出します。

## 関連項目
- [公式プラグイン](/ja/plugin_official)
- [ファイルサーバー](/ja/file_server)
- [README（GitHub）](https://github.com/exceedone/exment-plugins/blob/main/groupware/README.md)
