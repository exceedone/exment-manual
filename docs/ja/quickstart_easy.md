# インストール手順(かんたんインストール)
Exmentを開始するために必要となる手順です。画面で設定を行い、インストールを行うことができます。  

> ※手動インストールや、バージョンを指定してのインストールを行う場合、[こちら](/ja/quickstart_manual)をご参照ください。

## 注意点
- インストール時にエラーが発生した場合、[トラブルシューティング](/ja/troubleshooting)をご参照ください。
- <span class="red bold">※現在、大変申し訳ございませんが、インストール手順やサーバー構築についての個別のお問い合わせは承っておりません。個別対応をご希望の場合、有償のサポートをご希望ください。</span>　　

## サーバー構築
サーバーの構築をまだ行っていない場合、Webサーバーやデータベースサーバーの構築を行ってください。  
構築方法は、[こちら](/ja/server)をご確認ください。


## Exmentアプリ設定
サーバー構築が完了したら、Exmentのアプリ設定を行います。

### zipダウンロード・展開
<script>
        //画面を開いた際に実行
        window.addEventListener('load', (event) => {
        var link = document.getElementById('link');
        //a要素のhref属性の値を取得する
        var oldHref = link.getAttribute('href');
        //現在時刻を設定（yyyyMMddHHmmss）
        function formatDate (date, format) {
        format = format.replace(/yyyy/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        return format;
        };
        var date = new Date
        //replaceでoldHrefを新しい値に置き換える
        var newHref = oldHref.replace(oldHref, 'https://exment.net/downloads/ja/exment.zip?ver='+ formatDate(date,'yyyyMMddHHmmss'));
        //置き換えた値をa要素のhref属性に設定する
        link.setAttribute('href', newHref);
      });
</script>

- 以下のURLより、zipファイルをダウンロードします。  
<a id="link" href="https://exment.net/" target="_blank">[Exment zipファイル]</a>        
- zipファイルを、PHP実行可能なパスに展開します。  
例1(XAMPP Windows)： C:\xampp\local\exment  
例2(XAMPP Mac)： /Applications/XAMPP/local/exment  
例3(XServer) : $HOME/domain.com.foobar/exment/  
  
- <span class="red bold">各サーバーの公開フォルダ(例linuxの場合 : /var/www/html)直下に、zipファイルをそのまま入れないでください。データベースの設定値や、メールのパスワードなどが記載された設置ファイルなどが外部公開され、致命的な情報流出に繋がります。</span>  


## 初期データのインストール
画面の手順に従い、Exmentのインストールを行います。  
※各設定画面の「リセット」をクリックすることで、言語とタイムゾーン設定から、再度インストールを行います。

### インストール画面にアクセス
まずは、Exmentページにアクセスして設定を行います。  
例 ： http(s)://(あなたのサイトURL)/admin  


### 言語とタイムゾーン設定
言語とタイムゾーン設定を行います。  
必要に応じて初期値から変更してください。  
![インストール画面_設定](img/quickstart/setting_windows1.png)  


### データベース設定
データベース設定を行います。  
ご利用の環境に応じて、以下の内容を変更してください。   
※データベース値が不明な場合は、主に[サーバー設定](/ja/server)の各種設定に記載しておりますので、再度ご確認ください。
~~~
データベースの種類
データベースのホスト名
データベースのポート番号
Exment用データベース名
Exment用データベースのユーザー名
Exment用データベースのパスワード
~~~  

![インストール画面_設定](img/quickstart/setting_windows2.png)  
  

### システム要件の確認
Exmentを実行するにあたり必要となる、サーバー設定を確認します。  
Webサーバーなどの環境設定値を確認し、非推奨、または問題のある設定があった場合、警告またはエラーを表示します。  
※エラーがあった場合、次の画面に進めません。  
※この画面の詳細は、[こちら](/ja/server#システム要件確認)をご確認ください。

![インストール画面_設定](img/quickstart/setting_windows4.png)  


### インストール実行
インストール実行をクリックしてください。  
![インストール画面_設定](img/quickstart/setting_windows3.png)  

### 設定完了
クイックスタートが完了したら、引き続き[初期設定](/ja/first_setting.md)を行ってください。  

## その他の追加設定
以上の作業で、Exmentを開始することは可能ですが、一部の機能を使うために、追加で設定が必要になる場合があります。  
以下のリンクをご確認ください。  
- [追加設定](/ja/quickstart_more)


[←インストール-概要へ戻る](/ja/quickstart)