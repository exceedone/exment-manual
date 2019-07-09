# ログイン(2段階認証)
2段階認証を使用して、Exmentにログインする方法を記載します。  
2段階認証のシステム初期設定は、管理者が行います。[こちら](/ja/login_2factor_setting)をご参照ください。

## 2段階認証の方式
現在サポートしている2段階認証の方式は、以下の2つです。  
どちらの方式を使用しているかどうかは、管理者にお問い合わせください。

- Eメール : ID/パスワードによるログイン後、登録しているメールアドレスに、認証コードのメールが送付されます。  
その認証コードをフォームに入力することで、ログインが完了されます。

- Google認証システム : ID/パスワードによるログイン後、Google認証システムを使用して、2段階認証を行います。

### 2段階認証手順(Eメール)

- ログイン画面で、ID/パスワードを入力し、ログインボタンをクリックします。
![システム設定画面](img/login/login_2factor11.png)  

- 2段階認証画面が表示され、認証コード入力欄が表示されます。
![システム設定画面](img/login/login_2factor12.png)  

- また、ログインを行ったユーザーのメールアドレスに、認証コードが送付されますので、確認します。
![システム設定画面](img/login/login_2factor13.png)  

## 前提事項
- Exmentでの2段階認証は、ログインユーザー個々による設定ではなく、システム全体で設定を行います。  
例えば、2段階認証の方式を「Google認証システム」に選択していた場合、全ユーザーがGoogle認証システムによる2段階認証を行うことになります。

- Exmentで2段階認証を行う場合、システムからメール送信が実行できることが必須になります。これは2段階認証の種類を「Google認証システム」に選択していた場合でも同様です。

- 2段階認証を設定し、認証方式を「Google認証システム」で設定していた場合は、ユーザーが初めてログインを行った時、登録しているメールアドレスに、Google認証システムの登録を行うためのメールを送信します。  
![システム設定画面](img/login/login_2factor5.png)  
送付されたメールアドレスのリンクをクリックすることで、各ユーザーが2段階認証の設定を行うことができます。  
1度設定を行うことで、2度目以降は初期設定は行わず、Google認証システムから認証コードを入力するのみの方式となります。  

## 設定方法
2段階認証の設定方法です。

- プロジェクトのフォルダより、「.env」ファイルを開き、以下のように追記を行ってください。  
※設定ファイルの編集方法について、詳細は[こちら](/ja/config)をご参照ください。

~~~
EXMENT_LOGIN_USE_2FACTOR=true
~~~

- 管理者アカウントで、システム設定画面に遷移します。

- まずはメール設定を行います。メール送信の設定値を記入してください。詳細は[システムメール設定](/ja/system_setting#システムメール設定)をご参照ください。  
設定が完了したら、1度「送信」をクリックし、保存します。  

- その後、システム設定画面下部の「2段階認証」を表示します。  
![システム設定画面](img/login/login_2factor1.png)  

- 「2段階認証を使用する」項目を、「YES」に設定します。  
YESに設定することで、残りの設定項目が表示されます。  
![システム設定画面](img/login/login_2factor2.png)  

- 「認証方式」項目で、2段階認証に使用する方式の、「Eメール」もしくは「Google認証システム」を選択します。  

- 「認証コード送信」ボタンをクリックすることで、現在ログインしているアカウントに、2段階認証を使用するための認証コードを送付します。  
その送付されたメール内に記載された認証コードを、「認証コード」項目に記入してください。
![システム設定画面](img/login/login_2factor3.png)  
![システム設定画面](img/login/login_2factor4.png)  

- その後、「送信」をクリックし、設定値を保存してください。