# 基本情報
このシステムを使用する会社の、基本情報を管理します。
会社名、住所、ロゴなどを管理します。

## 画面表示
左メニューより、「基本情報」をクリックします。  
もしくは、以下のURLにアクセスしてください。  
http(s)://(ExmentのURL)/admin/data/base_info  
システムで登録している情報が表示されます。  
![基本情報ー画面](img/base_info/base_info.png)

> ※URL の「admin」は、標準の設定の場合です。`.env` の `ADMIN_ROUTE_PREFIX` で変更・削除している場合は、「admin」をその値に読み替えてください（削除している場合は「/admin」を除きます。例：`http(s)://(ExmentのURL)/oauth/token`）。詳しくは[URLに含む「admin」の変更・削除](/ja/additional_prefix)をご覧ください。

## 編集
設定を入力し、保存を行ってください。
