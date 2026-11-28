# Exmentマニュアル
<p align="center">
<img src="https://exment.net/docs/img/common/exment_logo_side.png" alt="Exment" style="border:none;">
</p>

**Exment（エクスメント）は、画面の設定だけで業務アプリを作れる、無料の Web データベースです。** プラグインで、いくらでも機能を足せます。このページから、使いたい機能の説明を開けます。

[Exment でできること（概要）](/ja/concept)　／　[はじめての方（クイックスタート）](/ja/quickstart)　／　[管理者向けの設定](/ja/system_setting)　／　[API](/ja/api)・[プラグイン](/ja/plugin)

## 主な機能
名前を押すと、その機能の説明を開きます。右の印は、使える版です（「標準」は前の版からある機能です）。

### データベースの基本

**🗂️ [テーブルと列](/ja/table)**　`標準`  
データを入れる表（テーブル）と、その項目（列）を画面で作ります。文字・数字・日付・選択肢・ファイルなど、多くの種類があります。

**🔗 [リレーション（テーブルのつながり）](/ja/relation)**　`標準`  
「会社」と「担当者」のように、テーブルどうしをつなぎます。1 対多も多対多もできます。

**📝 [フォーム（入力の画面）](/ja/form)**　`標準`  
入力の画面の並びや見出しを決めます。人や場面によって、画面を切り替えられます。

**📋 [ビュー（一覧・集計・カレンダー・カンバン・ガント）](/ja/view)**　`7.0`  
同じデータを、いろいろな形で見ます。カンバンとガントチャートは 7.0 から使えます。

**🧰 [データ一覧の操作ツール](/ja/data_grid_tools)**　`7.1`  
列の表示・固定・グループ化、その場での編集、Excel のようなキーボード操作、まとめての操作ができます。

**🎨 [表示プリセット](/ja/cell_style_preset)**　`7.0`  
セルの色・形・アイコンに名前を付けて保存し、いくつもの一覧で使い回します。

**📊 [ダッシュボード](/ja/dashboard)**　`標準`  
グラフ・一覧・カレンダーをホームに並べます。グラフを押して絞り込むこともできます。

**🔍 [検索](/ja/search)・[全文検索（Meilisearch）](/ja/additional_meilisearch)**　`7.0`　`かんたん導入 7.2.2`  
すべてのテーブルを、ことばで探します。データが多いときは、Meilisearch を使うと速くなります。

**📥 [データの取り込み・書き出し](/ja/data_import_export)**　`標準`  
Excel や CSV から、データをまとめて入れます。一覧をファイルに書き出すこともできます。

### 仕事を回す

**✅ [ワークフロー（申請と承認）](/ja/workflow_setting)**　`7.0`  
申請 → 承認 → 差し戻しの流れを作ります。7.0 から、[図で流れを作れます](/ja/workflow_design)。

**🔔 [通知（メール・Slack・Teams・LINE）](/ja/notify)**　`標準`  
データが変わったとき・期限が近いとき・承認したときに知らせます。[LINE 連携](/ja/line) は 7.1 から。

**🌐 [公開フォーム](/ja/publicform)**　`標準`  
ログインしない社外の人にも、入力してもらえるフォームを作ります。

**👥 [権限・組織](/ja/permission)**　`標準`  
だれが、どのテーブルやデータを見られるか・直せるかを、[役割グループ](/ja/role_group) と [組織](/ja/organization) で決めます。

### 機能を広げる（プラグインなど）

**🔌 [プラグイン](/ja/plugin)**　`標準`  
ボタン・画面・一覧・バッチ・API などを、自分で足せます。Exment をいちばん自由に広げる方法です。[作り方](/ja/plugin_quickstart) もあります。

**📦 [公式プラグイン（プロジェクト管理・サポートデスク・グループウェア）](/ja/plugin_official)**　`NEW（7.2.1）`  
[プロジェクト管理](/ja/plugin_pm)・[サポートデスク](/ja/plugin_support_desk)・[グループウェア](/ja/plugin_groupware) が、7.2.1 から Exment と一緒に届きます。「機能の管理」でオンにするだけで使えます。

**🧩 [スタジオ（画面とスマホのアプリを作る）](/ja/studio)**　`NEW（7.2.1）`  
部品を並べるだけで、テーブルと入力の画面・一覧を作れます。作った画面は、スマホのアプリでも使えます。

**📁 [ファイル共有](/ja/file_server)**　`NEW（7.2.1）`  
チームごとの場所に、フォルダーとファイルを置いて共有します。前の版に戻すことや、共有リンクもできます。

**🤖 [API キー](/ja/api_key)・[MCP（AI からつなぐ）](/ja/mcp)**　`NEW（7.2.1）`  
ユーザーが自分で API キーを作れます。Claude などの AI から、その人の権限のまま Exment のデータを読めます。

### 管理する

**⚙️ [機能の管理](/ja/feature)**　`NEW（7.2.1）`  
新しい機能とプラグインを、使うかどうか・だれが使えるかを、1 つの画面で決めます。

**🚀 [チューニング](/ja/tuning)**　`NEW（7.2.1）`  
設定すると速くなる項目と、今の状態を一覧で見ます。いくつかは、この画面のボタンで変えられます。

**🛡️ [セキュリティ（2 段階認証・IP の制限・セキュリティチェック）](/ja/security_check)**　`NEW（7.2.1）`  
[2 段階認証](/ja/login_2factor)・[IP フィルター](/ja/additional_ip_filter) に加えて、7.2.1 からは、あぶない設定がないかを画面で確かめられます。

**💾 [バックアップ・リストア](/ja/backup)**　`標準`  
データとファイルを保存して、あとで元に戻せます。決まった時間に自動でも保存できます。

**🌏 [ユーザーごとの言語とタイムゾーン](/ja/user_locale)**　`NEW（7.2.4）`  
ユーザーが、画面の言語とタイムゾーンを自分で選べます。

## やりたいことから探す

| やりたいこと | 見るページ |
|---|---|
| インストールして使い始める | [はじめに](/ja/quickstart) |
| 使い始める前に設定すること | [初期設定](/ja/first_setting) |
| 表（テーブル）と項目（列）を作る | [テーブル](/ja/table)・[列](/ja/column) |
| 入力の画面を整える | [フォーム](/ja/form) |
| Excel や CSV のデータを入れる | [データのインポート](/ja/data_import_export?id=データインポート) |
| 一覧・カンバン・ガント・カレンダーで見る | [ビュー](/ja/view) |
| グラフや集計をホームに並べる | [ダッシュボード](/ja/dashboard) |
| データを探す | [検索](/ja/search) |
| 申請と承認を回す | [ワークフロー](/ja/workflow_setting)・[申請パック](/ja/template?id=同梱テンプレート「申請パック」) |
| 変わったら知らせる | [通知](/ja/notify)・[LINE 連携](/ja/line) |
| 社外の人に入力してもらう | [公開フォーム](/ja/publicform) |
| ユーザーと組織を登録する | [ユーザー](/ja/user)・[組織](/ja/organization) |
| だれが何を見られるか決める | [権限の概要](/ja/permission)・[役割グループ](/ja/role_group) |
| ログインのしかたを決める（SSO・2 段階認証） | [ログイン設定](/ja/login_setting)・[2 段階認証](/ja/login_2factor) |
| ファイルをチームで共有する | [ファイル共有](/ja/file_server) |
| 使う機能を選ぶ | [機能の管理](/ja/feature) |
| ほかのシステムとつなぐ | [API](/ja/api)・[API キー](/ja/api_key) |
| AI（Claude など）からデータを読む | [MCP](/ja/mcp) |
| 機能を自分で足す | [プラグイン](/ja/plugin)・[作り方](/ja/plugin_quickstart) |
| 消したデータを元に戻す | [削除済データ](/ja/deleted_data) |
| バックアップする | [バックアップ・リストア](/ja/backup) |
| 画面がおそいとき | [チューニング](/ja/tuning) |
| 新しい版にする | [アップデート](/ja/update) |
| うまく動かないとき | [トラブルシューティング](/ja/troubleshooting) |

## Exmentとは
### Excel とバラバラのファイルから、卒業しよう。
Exment（エクスメント）は、**ノーコードで自社の業務アプリを作れる、無料のオープンソース Web データベース**です。顧客・案件・申請・タスクを 1 か所に集めて、チームで回せます。

- **ノーコードで、すぐ形に**：テーブル・フォーム・一覧・カンバン・ガントチャート・集計を、画面の設定だけで作れます。
- **申請から承認まで、チームで回る**：ワークフロー・通知・公開フォーム・API がそろっています。
- **無料。人数が増えても料金は同じ**：オープンソース（GPL）なので、ユーザー数で料金が増えません。
- **自社サーバーでも、クラウドでも**：自社のサーバー・レンタルサーバー・AWS・Azure などで動き、データを自社で持てます。

## まずは触ってみる
- **デモを触ってみる**：プロジェクト管理・商談・ワークフロー・公開フォームを、ログインしてすぐに試せます。ログインの情報は <a href="https://exment.net/demo-env/" target="_blank">デモサイト一覧</a> にあります。
- **無料で始める**：インストールの手順は [はじめに](/ja/quickstart) から。
- **できることを見る**：<a href="https://exment.net/functions/" target="_blank">機能・スクリーンショット</a>／<a href="https://exment.net/whats-new/" target="_blank">What's new</a>（版ごとの新しい機能）／[リリースノート](/ja/release_note)
- **相談する**：<a href="https://exment.net/assets/exment-flyer.pdf" target="_blank">資料（PDF）</a>／<a href="https://exment.net/inquiry/" target="_blank">お問い合わせ</a>（導入・乗り換えのご相談）

<a href="https://exment.net" target="_blank">Exment公式サイト</a>

## 本マニュアルについて
このマニュアルは、いつも最新版の Exment に合わせて書いています。
あとのバージョンで追加された機能やコマンドでも、どのバージョンから使えるかを書いていないことがあります。あらかじめご了承ください。


## マニュアルメニュー
「<span style="color:red;">*</span>」の付いたメニューは、特に大事な内容です。

<div class="container-fluid" style="margin-bottom:2em;">
    <div>
        <h4>1. はじめに</h4>
        <div class="row">
            <div class="col-sm-6 tile tile">
                <a href="#/ja/concept">
                    <div class="tile-inner">
                        <h5>Exmentのコンセプト</h5>
                        <p>Exmentの考え方やコンセプトをまとめております。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/start_flow">
                    <div class="tile-inner">
                        <h5>業務開始までの流れ</h5>
                        <p>Exmentを使用して業務を開始するまでの、標準的なステップをまとめております。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>2. インストール・初期設定</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/quickstart">
                    <div class="tile-inner important-topic">
                        <h5>はじめに</h5>
                        <p>Exmentの利用を開始するために、はじめに確認が必要となる手順の概要をまとめています。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/server">
                    <div class="tile-inner important-topic">
                        <h5>サーバー設定</h5>
                        <p>Exmentをインストールするための、Webサーバー・データベースの設定を行います。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/quickstart_easy">
                    <div class="tile-inner important-topic">
                        <h5>Exmentアプリケーションインストール手順</h5>
                        <p>Exmentを開始するために必要となるインストール手順です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/first_setting">
                    <div class="tile-inner important-topic">
                        <h5>初期設定</h5>
                        <p>インストール後、最初の管理者ログインID設定など、初期設定の手順になります。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/update">
                    <div class="tile-inner important-topic">
                        <h5>アップデート</h5>
                        <p>Exmentのアップデート手順になります。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/quickstart_more">
                    <div class="tile-inner">
                        <h5>追加設定</h5>
                        <p>「/admin」パス変更や、タスクスケジュール設定など、Exmentの追加設定を行う場合の手順です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/mailsend_setting">
                    <div class="tile-inner">
                        <h5>メール送信設定</h5>
                        <p>ユーザーにメールを送信する場合の手順です。テストメールの送信手順も記載しています。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>3. ログイン設定</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/login_setting">
                    <div class="tile-inner">
                        <h5>ログイン設定</h5>
                        <p>Exmentにログインを行う時の、各種ログイン設定を行います。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/login_sso">
                    <div class="tile-inner">
                        <h5>SSO認証設定</h5>
                        <p>SSO認証の、管理者側の設定方法です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/login_2factor_setting">
                    <div class="tile-inner">
                        <h5>2段階認証設定</h5>
                        <p>2段階認証の、管理者側の設定方法です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/login_2factor">
                    <div class="tile-inner">
                        <h5>ログイン(2段階認証)</h5>
                        <p>2段階認証を使用してのログイン手順を記載しております。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>4. テーブル設定</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/table">
                    <div class="tile-inner important-topic">
                        <h5>テーブル設定</h5>
                        <p>Exmentのもっとも基本となる設定です。データを保存するための、カスタムテーブルの設定手順です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/column">
                    <div class="tile-inner important-topic">
                        <h5>カスタム列設定</h5>
                        <p>カスタムテーブルに属する、カスタム列の設定です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/relation">
                    <div class="tile-inner">
                        <h5>リレーション設定</h5>
                        <p>テーブルとテーブルを関係させる、リレーションの設定です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/form">
                    <div class="tile-inner">
                        <h5>カスタムフォーム設定</h5>
                        <p>データ登録画面で使用する、フォーム項目を管理します。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/view">
                    <div class="tile-inner important-topic">
                        <h5>カスタムビュー設定</h5>
                        <p>データ一覧画面で使用する、ビュー項目を管理します。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/operation">
                    <div class="tile-inner">
                        <h5>データ更新イベント設定</h5>
                        <p>データの新規作成時や更新時、ボタンをクリック時などに、列の値を更新します。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>5. データ管理</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/data">
                    <div class="tile-inner important-topic">
                        <h5>データ</h5>
                        <p>作成したテーブルに、データを一覧・新規追加・編集・表示・削除するための手順です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/data_grid">
                    <div class="tile-inner important-topic">
                        <h5>データ一覧</h5>
                        <p>登録したデータを一覧表示します。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/data_form">
                    <div class="tile-inner important-topic">
                        <h5>データフォーム（データ詳細）</h5>
                        <p>対象のテーブルに、データを登録・編集します。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/data_import_export">
                    <div class="tile-inner">
                        <h5>データインポート・エクスポート</h5>
                        <p>対象のテーブルに、CSV・Excelファイルから、データを一括で登録・更新・削除します。また、対象のテーブルのデータを、CSV・Excelファイルに出力します。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/data_cmd_import_export">
                    <div class="tile-inner">
                        <h5>データインポート・エクスポート(コマンド)</h5>
                        <p>データのインポート・エクスポートを、コマンドから実行します。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/data_bulk_insert">
                    <div class="tile-inner">
                        <h5>データインポート(大量データ)</h5>
                        <p>対象のテーブルに、CSVデータを一括で登録します。大量データに対応しております。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/search">
                    <div class="tile-inner">
                        <h5>データ検索</h5>
                        <p>登録したデータを検索するための手順です。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>6. ユーザー・組織・役割権限</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/permission">
                    <div class="tile-inner important-topic">
                        <h5>役割・権限の概要</h5>
                        <p>Exmentにおける、役割・権限の概要のご説明です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/user">
                    <div class="tile-inner important-topic">
                        <h5>ユーザー・ログインユーザー管理</h5>
                        <p>ユーザー情報の管理や、システムにログインをするための設定方法の手順です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/organization">
                    <div class="tile-inner important-topic">
                        <h5>組織管理</h5>
                        <p>ユーザーが所属する組織の設定方法の手順です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/role_group">
                    <div class="tile-inner">
                        <h5>役割グループ・権限</h5>
                        <p>特定のデータやページを、特定のユーザーのみが管理できるようにするための設定です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/multiuser">
                    <div class="tile-inner">
                        <h5>外部ポータルサイト向け設定</h5>
                        <p>データ一覧画面や編集画面で、ユーザー・組織の表示時、「ログインユーザーが所属する組織や、その所属ユーザーのみ表示させる」という設定を行いたい場合に、推奨する内容です。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>7. ワークフロー</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/workflow_setting">
                    <div class="tile-inner important-topic">
                        <h5>ワークフロー設定例</h5>
                        <p>ワークフローの設定例を記載しています。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/workflow_example">
                    <div class="tile-inner">
                        <h5>ワークフロー設定</h5>
                        <p>管理者による、ワークフローの設定を行います。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/workflow_execution">
                    <div class="tile-inner">
                        <h5>ワークフロー実行</h5>
                        <p>各ユーザーが、ワークフローを実行するための手順です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/workflow_task">
                    <div class="tile-inner">
                        <h5>未処理タスク</h5>
                        <p>自分がアクションを実行する必要があるワークフローのデータを、すべてのテーブルからまとめて確認します。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>8. 公開フォーム</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/publicform">
                    <div class="tile-inner">
                        <h5>公開フォーム</h5>
                        <p>一般ユーザー（ログインしていないユーザー）がデータを入力できる、公開フォームを設定します。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>9. その他標準機能</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/template">
                    <div class="tile-inner">
                        <h5>テンプレート</h5>
                        <p>カスタムテーブル、列などの情報を、インポートまたはエクスポートします。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/backup">
                    <div class="tile-inner">
                        <h5>バックアップ・リストア</h5>
                        <p>保存しているデータやデータベース情報を、バックアップ・リストアします。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/menu">
                    <div class="tile-inner">
                        <h5>メニュー</h5>
                        <p>左メニューに表示される項目を管理します。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/dashboard">
                    <div class="tile-inner">
                        <h5>ダッシュボード</h5>
                        <p>ログイン時に最初に表示される、TOPページの内容を管理します。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/mail">
                    <div class="tile-inner">
                        <h5>通知テンプレート</h5>
                        <p>ユーザーにメールを送る場合の、件名や本文の設定を行います。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/notify">
                    <div class="tile-inner">
                        <h5>通知</h5>
                        <p>データの更新時や、ボタンをクリックしてのメール送信を行うための設定手順です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/line">
                    <div class="tile-inner">
                        <h5>LINE連携</h5>
                        <p>LINE公式アカウントと連携し、通知の受信やワークフローのアクションの実行をLINEで行います。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/safety_check">
                    <div class="tile-inner">
                        <h5>安否確認</h5>
                        <p>地震などの緊急時に、従業員の安否をLINEとメールで確認します。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/logs">
                    <div class="tile-inner">
                        <h5>ログ</h5>
                        <p>Exmentの各種ログについて記載します。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>10. 機能拡張</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/api">
                    <div class="tile-inner">
                        <h5>API</h5>
                        <p>他のシステムと連携するためのAPIの使用方法です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/plugin">
                    <div class="tile-inner">
                        <h5>プラグイン</h5>
                        <p>独自に開発したプラグインの管理方法です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/plugin_quickstart">
                    <div class="tile-inner">
                        <h5>プラグイン作成方法</h5>
                        <p>プラグインの作成方法を、種類ごとに記載しております。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>11. リファレンス</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ja/params">
                    <div class="tile-inner">
                        <h5>パラメータ変数</h5>
                        <p>自動採番やドキュメント出力などで、パラメータを値に置き換える場合の変数一覧です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="https://exment.net/reference/ja/webapi.html">
                    <div class="tile-inner">
                        <h5>APIリファレンス</h5>
                        <p>WebAPIのリファレンスです。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/func_reference">
                    <div class="tile-inner">
                        <h5>関数リファレンス</h5>
                        <p>カスタムテーブル・カスタム列・カスタムデータなどのクラス・関数のリファレンスです。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/column_reference">
                    <div class="tile-inner">
                        <h5>カスタム列リファレンス</h5>
                        <p>カスタム列の仕様明細、ならびにプラグインで列の値の取得・セットを行う場合のリファレンスです。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/plugin_reference">
                    <div class="tile-inner">
                        <h5>プラグインリファレンス</h5>
                        <p>独自プラグインを開発する場合に使用するクラス・関数のリファレンスです。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/config">
                    <div class="tile-inner">
                        <h5>設定値一覧</h5>
                        <p>Exmentで設定できる設定値一覧です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/command">
                    <div class="tile-inner">
                        <h5>コマンド一覧</h5>
                        <p>Exmentで実行できるコマンド一覧です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/release_note">
                    <div class="tile-inner">
                        <h5>リリースノート</h5>
                        <p>過去のリリース履歴です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/patch_weakness">
                    <div class="tile-inner">
                        <h5>パッチ・脆弱性リスト</h5>
                        <p>手動での対応が必要な過去の不具合、過去に発生した脆弱性の一覧です。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/troubleshooting">
                    <div class="tile-inner">
                        <h5>トラブルシューティング</h5>
                        <p>Exmentでのトラブル解決法や、Exmentの技術的なよくある質問に回答しております。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/license">
                    <div class="tile-inner">
                        <h5>ライセンス</h5>
                        <p>Exmentで使用しているオープンソースライブラリです。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ja/develop_memo">
                    <div class="tile-inner">
                        <h5>開発メモ</h5>
                        <p>細かい仕様などの雑多なまとめになります。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
