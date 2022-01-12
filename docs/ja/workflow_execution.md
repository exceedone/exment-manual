# ワークフロー実行
管理者が設定したワークフローを、各ユーザーが実行するための手順です。
あらかじめ、管理者が[ワークフロー設定](/ja/workflow_example)を行う必要があります。

## ワークフロー実施
- 各ユーザーがデータを参照時、現在のステータスと、次にアクションを行う作業ユーザー・組織が表示されます。
![ワークフロー画面](img/workflow/workflow_data2.png)  


- ログインユーザーに次のアクションを行う権限がある場合、アクションボタンがページ右上に表示されます。  
![ワークフロー画面](img/workflow/workflow_data1.png)  


- ボタンをクリックすることで、アクションの実行確認ダイアログが表示されます。  
![ワークフロー画面](img/workflow/workflow_data3.png)  

   - <span class="heading_smaller_than_h5">アクション名</span>  
   今回実行するアクションの名称が表示されます。  

   - <span class="heading_smaller_than_h5">ステータス</span>  
   このアクションを実行する前後のステータスが表示されます。  

   - <span class="heading_smaller_than_h5">次の作業ユーザー</span>  
   このアクション実行後の、作業ユーザー・組織が表示されます。  

   - <span class="heading_smaller_than_h5">コメント</span>  
   アクション実施時のコメントを入力してください。  

- 内容に問題なければ、［送信］をクリックすることで、アクションが実行されます。

- アクションが実行されると、「現在のステータス」や「現在の作業ユーザー」が変更されます。  
※この時、ワークフロー設定によって「現在のステータス」に鍵マークが表示されることがあります。その場合、データはロックされ、編集や削除ができなくなります。

![ワークフロー画面](img/workflow/workflow_data4.png)  

## ワークフローのデータのリセット

進行中のワークフローのデータをリセットすることができます。なんらかの理由で、ワークフローが進行不可能になった場合に実行してください。  
コマンド実行が必要です。プロジェクトのルートディレクトリで、以下のコマンドを実行してください。

~~~
php artisan exment:workflow-clear (テーブル名) (ID)

# 実行例 テーブル名"estimate"、 ID"6"のデータのワークフロー進行をリセットする場合
php artisan exment:workflow-clear estimate 6

# 実行例 テーブル名"syusseki"、 ID"600"のデータのワークフロー進行をリセットする場合
php artisan exment:workflow-clear syusseki 600
~~~
