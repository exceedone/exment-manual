# カスタムデータのリフレッシュ
Exmentのカスタムデータのリフレッシュを行うことができます。  
以下のような用途で、使用することができます。  

- 環境検証後、登録データをすべて削除し、再度検証を行いたい。  
- テスト環境から本番環境へ移行後、本盤環境のデータをすべて削除し、運用開始する。

すべてのカスタムテーブル内のデータを一括でリフレッシュするコマンドと、指定したテーブルのデータのみリフレッシュするコマンドがあります。  

## 全テーブルのデータ
すべてのテーブルを対象に、データのリフレッシュを行います。  
コマンドを実行することで、下記のデータをすべて削除し、idの連番も1からになります。


### 削除されるデータ(内部テーブルも含む)
- アクセスログ
- Eメールアドレスの認証テーブル
- 通知バーのデータ
- 更新履歴
- ワークフローの作業ユーザー対象
- ワークフローの実行ステータス
- カスタムデータの共有
- n:nのリレーションデータ(組織-ユーザーを除く)
- カスタムデータ（ユーザー、組織、通知テンプレートを除く）
- カスタムデータの添付ファイル（ユーザー、組織、通知テンプレートを除く）

### 削除されないデータ
- システム設定
- カスタムテーブルの設定値
- ワークフロー設定
- その他のシステム関連設定値
- ログイン情報
- ユーザー情報、組織情報、通知テンプレートのデータ
- 組織-ユーザーの所属情報

### 実行方法
- 以下のコマンドを実行してください。

~~~
php artisan exment:refreshdata
~~~

- <span class="red bold">※このコマンドを実行する前に、データのバックアップを実行することをおすすめします。</span>


## 指定のカスタムテーブルのデータ
指定したカスタムテーブルを対象に、データのリフレッシュを行います。  
すべてを一括削除するわけではなく、状況によって削除方法・削除内容を制御します。  
※ユーザー、組織、通知テンプレートのデータは、リフレッシュできません。

### すべて削除し、id連番が1になるデータ
- 指定したカスタムテーブル内のデータ
- 指定したカスタムテーブルが、1:nの親側のリレーションに設定されている場合、子側のカスタムテーブル内のデータ
- 指定したカスタムテーブルが、n:nの親側・子側のリレーションに設定されている場合、n:nのリレーションデータ情報。※リレーション先のカスタムテーブル内のデータそのものは、削除しません。

### 削除対象のテーブルに関連するデータのみ削除(内部テーブルも含む)
- 通知バーのデータ
- 更新履歴
- ワークフローの作業ユーザー対象
- ワークフローの実行ステータス
- カスタムデータの共有
- カスタムデータの添付ファイル、コメント

### 値を空にするように更新
- 削除対象のテーブルが、他のカスタムテーブルのカスタム列「選択肢 (他のテーブルの値一覧から選択)」に含まれていた場合、そのカスタムテーブル内のデータに対し、参照先の値が空になるよう、一括で更新します。


### 実行方法

- 以下のコマンドを実行してください。

~~~
php artisan exment:refreshtable {テーブル名。複数の場合は""で囲んでカンマ区切り}

# 例：1つのテーブルを対象に実行
php artisan exment:refreshtable information

# 例：複数のテーブルを対象に実行
php artisan exment:refreshtable "table1,table2,table3"
~~~

- <span class="red bold">※このコマンドを実行する前に、データのバックアップを実行することをおすすめします。</span>