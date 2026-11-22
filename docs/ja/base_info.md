# 基本情報
このシステムを使用する会社の、基本情報を管理します。
会社名、住所、ロゴなどを管理します。

## 画面表示
左メニューより、「基本情報」をクリックします。  
もしくは、以下のURLにアクセスしてください。  
http(s)://(ExmentのURL)/data/base_info  
システムで登録している情報が表示されます。  
![基本情報ー画面](img/base_info/base_info.png)

> ※URL は、「/admin」が付かない標準の設定（v7.2.1 以降に新しくインストールしたサイト）の場合です。`.env` の `ADMIN_ROUTE_PREFIX` に値がある場合（前の版で入れたサイトは「admin」）は、サイトの URL のあとにその値を足してください（例：`http(s)://(ExmentのURL)/admin/oauth/token`）。詳しくは[URLに含む「admin」の変更・削除](/ja/additional_prefix)をご覧ください。

## 編集
設定を入力し、保存を行ってください。
