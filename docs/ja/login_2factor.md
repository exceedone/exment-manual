# ログイン(2段階認証)
2段階認証を使用して、Exmentにログインする方法を記載します。  
2段階認証のシステム初期設定は、管理者が行います。[こちら](/ja/login_2factor_setting)をご参照ください。

## 2段階認証の方式
現在サポートしている2段階認証の方式は、以下の2つです。  
どちらの方式を使用しているかどうかは、管理者にお問い合わせください。

##### Eメール
ID/パスワードによるログイン後、登録しているメールアドレスに、認証コードのメールが送付されます。  
その認証コードをフォームに入力することで、ログインが完了されます。

##### Google認証システム
ID/パスワードによるログイン後、Google認証システムを使用して、2段階認証を行います。

### 2段階認証手順(Eメール)

- ログイン画面で、ID/パスワードを入力し、［ログイン］ボタンをクリックします。
![システム設定画面](img/login/login_2factor11.png)  

- 2段階認証画面が表示され、認証コード入力欄が表示されます。
![システム設定画面](img/login/login_2factor12.png)  

- また、ログインを行ったユーザーのメールアドレスに、認証コードが送付されますので、確認します。
![システム設定画面](img/login/login_2factor13.png)  

### 2段階認証手順(Google認証システム)

- ログイン画面で、ID/パスワードを入力し、［ログイン］ボタンをクリックします。
![システム設定画面](img/login/login_2factor11.png)  

- 2段階認証画面が表示され、認証コード入力欄が表示されます。
![システム設定画面](img/login/login_2factor15.png)  

- はじめてログインを行う場合、まずはGoogle認証システムの設定が必要です。  
［送信］ボタンをクリックすることで、登録しているメールアドレスに、Google認証システムの登録を行うためのメールを送信します。
![システム設定画面](img/login/login_2factor5.png)  

- ログインを行ったユーザーのメールアドレスに、Google認証システム登録用のURLが送付されますので、クリックします。  
![システム設定画面](img/login/login_2factor6.png)  

- 送付されたURLをクリックすると、２段階認証システムをインストールする画面に移行します。step1～3を行ってください。  
認証コード入力を正しく行い送信すると、２段階認証でのログインが完了します。

![システム設定画面](img/login/login_2factor7.png)  

> ２段階認証にて、認証コードの入力を一定回数以上間違えると、認証を行った通信からのログインがブロックされます。ご注意ください。