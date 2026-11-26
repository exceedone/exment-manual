# 暗号化の鍵の置き場所
※この機能は、Exment v7.3.0 以降で使えます。

[暗号化して保存した列](/ja/column)の鍵は、初めはサーバーの `.env`（`DATA_ENCRYPTION_KEYS`）に置きます。データベースやバックアップだけを盗まれても読めませんが、サーバーそのものを乗っとられると、鍵も読まれます。

鍵を、鍵の専用のサービスに置くこともできます。サーバーのファイルを盗まれても、鍵そのものは取り出せなくなります。

## 選べる置き場所
`.env` の `EXMENT_DATA_KEY_PROVIDER` で選びます。

| 値 | 置き場所 | 向いているところ |
|---|---|---|
| `env`（初期値） | `.env` の `DATA_ENCRYPTION_KEYS` | 今までどおり |
| `aws_kms` | AWS KMS（包んだ鍵だけをサーバーに置く） | AWS の上のサーバー |
| `aws_secrets_manager` | AWS Secrets Manager | AWS の上のサーバー |
| `vault` | HashiCorp Vault の Transit | 自社のサーバー（オンプレミス） |

### それぞれで守れるもの
| 盗まれたもの | env | aws_kms・vault | aws_secrets_manager |
|---|---|---|---|
| データベース・バックアップだけ | 守れる | 守れる | 守れる |
| サーバーのファイル（`.env` も） | 守れない | 守れる（包んだ鍵だけでは開けない） | 守れる |
| サーバーそのもの（乗っとられて動いている） | 守れない | 守れない（そのサーバーは鍵を開けられる） | 守れない |

- サーバーを乗っとられても読まれないようにするには、利用者が鍵を持つ暗号化（今後の版）が要ります。
- KMS・Vault では、鍵を開くたびに記録が残ります（AWS は CloudTrail）。おかしな使い方に気づけます。

## AWS KMS（aws_kms）
データの鍵（32 バイト）を KMS の鍵で包み、包んだものだけを `.env` に置きます（エンベロープ暗号化）。包んだものだけでは、KMS なしでは開けません。

1. サーバーに AWS SDK を入れます：`composer require aws/aws-sdk-php`
2. KMS に鍵（対称・暗号化と復号）を作り、キーの自動ローテーションを有効にします。
3. サーバー（EC2）の IAM ロールに、その鍵の `kms:Decrypt` と `kms:GenerateDataKey` を許します。アクセスキーは置きません。
4. `.env` に書きます。
   ```
   EXMENT_DATA_KEY_PROVIDER=aws_kms
   EXMENT_DATA_KEY_KMS_KEY_ID=alias/exment
   EXMENT_DATA_KEY_AWS_REGION=ap-northeast-1
   EXMENT_DATA_KEY_CONTEXT=（サイトの名前。SaaS ではテナント）
   ```
5. `php artisan exment:data-key generate` を実行します。KMS でデータの鍵を作り、包んだものだけを出します。出てきた `EXMENT_DATA_KEY_WRAPPED="k1:..."` を `.env` に入れます。

- 鍵を開くときは、暗号化のコンテキスト `app=exment`・`key_id`・`site`（`EXMENT_DATA_KEY_CONTEXT`）を付けます。ほかのサイトに包んだ鍵を写しても、開けません。IAM の条件 `kms:EncryptionContext:site` で、サイトごとに分けられます。
- `EXMENT_DATA_KEY_WRAPPED` はバックアップに入ります（包んだ鍵だけなので、KMS なしでは読めません）。

## AWS Secrets Manager（aws_secrets_manager）
1. `composer require aws/aws-sdk-php`
2. `php artisan exment:data-key generate`（`EXMENT_DATA_KEY_PROVIDER=env` のまま）で鍵を作り、Secrets Manager のシークレットに `k1:...` の形で入れます（JSON の `{"keys": "k1:..."}` でもよい）。
3. サーバーの IAM ロールに、そのシークレットの `secretsmanager:GetSecretValue` を許します。
4. `.env` に書きます。`DATA_ENCRYPTION_KEYS` は消します。
   ```
   EXMENT_DATA_KEY_PROVIDER=aws_secrets_manager
   EXMENT_DATA_KEY_SECRET_ID=exment/data-keys
   ```

## HashiCorp Vault（vault）
1. Vault で Transit を有効にし、鍵を作ります（例：`vault write -f transit/keys/exment`）。
2. `.env` に書きます。トークンか AppRole のどちらかです。
   ```
   EXMENT_DATA_KEY_PROVIDER=vault
   EXMENT_DATA_KEY_VAULT_ADDR=https://vault.example.co.jp:8200
   EXMENT_DATA_KEY_VAULT_KEY=exment
   DATA_KEY_VAULT_TOKEN=（トークン）
   # または AppRole
   EXMENT_DATA_KEY_VAULT_ROLE_ID=（role_id）
   DATA_KEY_VAULT_SECRET_ID=（secret_id）
   ```
3. `php artisan exment:data-key generate` を実行し、出てきた `EXMENT_DATA_KEY_WRAPPED="k1:vault:v1:..."` を `.env` に入れます。

- トークンと secret_id は、名前が `EXMENT_` で始まらないので、バックアップに入りません。
- Transit の mount が `transit` でないときは `EXMENT_DATA_KEY_VAULT_MOUNT`、名前空間は `EXMENT_DATA_KEY_VAULT_NAMESPACE` です。

## 鍵の入れ替え
- KMS の鍵：KMS の自動ローテーションを使います。前の包んだ鍵も、そのまま開けます。Exment の設定は変えません。
- データの鍵：`php artisan exment:data-key generate` で新しい鍵を作り、先頭に入れてから、`php artisan exment:data-key rotate` を実行します。暗号化した列の値と、下の設定の秘密を、新しい鍵で暗号化し直します。古い鍵は、`php artisan exment:data-key status` で数が 0 になってから消します。

## 鍵のサービスにつながらないとき
- 暗号化した列だけ「今は読めません」と出ます。ほかの画面・列は、ふつうに使えます。
- 暗号化した列の値は保存できません（暗号化しないまま保存することはありません）。
- 「[セキュリティチェック](/ja/security_check)」の「暗号化の鍵の置き場所」が NG になります。`php artisan exment:data-key status` でも確かめられます。
- つながると、もとに戻ります。

## 鍵は、メモリーにだけ置きます
- 開いた鍵は、そのリクエストの間と、PHP の APCu があれば `EXMENT_DATA_KEY_CACHE_SECONDS` 秒（初めは 300 秒）だけ、メモリーに置きます。APCu には APP_KEY で暗号化して入れます。ファイル・データベース・Redis には置きません。
- APCu がないときは、暗号化した列を使うリクエストのたびに、鍵のサービスを呼びます（KMS の料金と速さに気をつけてください）。

## 同じ鍵を使う秘密
鍵がある（`DATA_ENCRYPTION_KEYS` か、鍵のサービスを選んでいる）とき、次の秘密も同じ鍵で暗号化します。ないときは、今までどおり APP_KEY で暗号化します。
- データの同期の接続の秘密
- メールの OAuth のクライアントシークレット・リフレッシュトークン
- LINE WORKS のクライアントシークレット・秘密鍵

前に保存した値も読めます。次に保存したとき（または `exment:data-key rotate`）に、新しい形で保存し直します。

## 関連項目
- [カスタム列](/ja/column)
- [セキュリティチェック](/ja/security_check)
