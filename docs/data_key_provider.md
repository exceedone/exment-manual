# Where the encryption keys are
* This feature is available in Exment v7.3.0 and later.

The keys of the [encrypted columns](/column) are in the server's `.env` (`DATA_ENCRYPTION_KEYS`) at first. The database or a backup alone cannot read the values, but a taken-over server gives the keys too.

The keys can be kept in a key service instead. Then the files of the server alone do not give the keys.

## The places
Choose with `EXMENT_DATA_KEY_PROVIDER` in `.env`.

| Value | Where | For |
|---|---|---|
| `env` (default) | `DATA_ENCRYPTION_KEYS` in `.env` | As before |
| `aws_kms` | AWS KMS (only wrapped keys on the server) | Servers on AWS |
| `aws_secrets_manager` | AWS Secrets Manager | Servers on AWS |
| `vault` | HashiCorp Vault Transit | Servers on premises |

### What each protects
| Taken | env | aws_kms, vault | aws_secrets_manager |
|---|---|---|---|
| The database or a backup only | Protected | Protected | Protected |
| The files of the server (`.env` too) | Not protected | Protected (a wrapped key alone does not open) | Protected |
| The running server itself | Not protected | Not protected (that server can open the keys) | Not protected |

- Against a taken-over server, encryption with keys held by the users (a later version) is needed.
- KMS and Vault record each opening of a key (CloudTrail on AWS), so an unusual use can be noticed.

## AWS KMS (aws_kms)
The data key (32 bytes) is wrapped by a KMS key and only the wrapped one is put in `.env` (envelope encryption). It cannot be opened without KMS.

1. Install the AWS SDK on the server: `composer require aws/aws-sdk-php`
2. Make a KMS key (symmetric, encrypt and decrypt) and turn on its automatic rotation.
3. Allow `kms:Decrypt` and `kms:GenerateDataKey` on that key to the IAM role of the server (EC2). No access key is put on the server.
4. Write in `.env`:
   ```
   EXMENT_DATA_KEY_PROVIDER=aws_kms
   EXMENT_DATA_KEY_KMS_KEY_ID=alias/exment
   EXMENT_DATA_KEY_AWS_REGION=ap-northeast-1
   EXMENT_DATA_KEY_CONTEXT=(the name of the site; the tenant on SaaS)
   ```
5. Run `php artisan exment:data-key generate`. It makes a data key with KMS and prints only the wrapped one. Put the `EXMENT_DATA_KEY_WRAPPED="k1:..."` it prints in `.env`.

- A key is opened with the encryption context `app=exment`, `key_id` and `site` (`EXMENT_DATA_KEY_CONTEXT`). A wrapped key copied to another site does not open. The IAM condition `kms:EncryptionContext:site` can keep the sites apart.
- `EXMENT_DATA_KEY_WRAPPED` is kept in a backup (only wrapped keys, which cannot be read without KMS).

## AWS Secrets Manager (aws_secrets_manager)
1. `composer require aws/aws-sdk-php`
2. Make a key with `php artisan exment:data-key generate` (with `EXMENT_DATA_KEY_PROVIDER=env`) and put it in a secret of Secrets Manager as `k1:...` (or the JSON `{"keys": "k1:..."}`).
3. Allow `secretsmanager:GetSecretValue` on that secret to the IAM role of the server.
4. Write in `.env`, and remove `DATA_ENCRYPTION_KEYS`:
   ```
   EXMENT_DATA_KEY_PROVIDER=aws_secrets_manager
   EXMENT_DATA_KEY_SECRET_ID=exment/data-keys
   ```

## HashiCorp Vault (vault)
1. Enable Transit in Vault and make a key (for example `vault write -f transit/keys/exment`).
2. Write in `.env`, with a token or AppRole:
   ```
   EXMENT_DATA_KEY_PROVIDER=vault
   EXMENT_DATA_KEY_VAULT_ADDR=https://vault.example.com:8200
   EXMENT_DATA_KEY_VAULT_KEY=exment
   DATA_KEY_VAULT_TOKEN=(token)
   # or AppRole
   EXMENT_DATA_KEY_VAULT_ROLE_ID=(role_id)
   DATA_KEY_VAULT_SECRET_ID=(secret_id)
   ```
3. Run `php artisan exment:data-key generate` and put the `EXMENT_DATA_KEY_WRAPPED="k1:vault:v1:..."` it prints in `.env`.

- The token and the secret_id are not named `EXMENT_*`, so a backup does not keep them.
- A Transit mount other than `transit`: `EXMENT_DATA_KEY_VAULT_MOUNT`; a namespace: `EXMENT_DATA_KEY_VAULT_NAMESPACE`.

## Rotating the keys
- The KMS key: use the automatic rotation of KMS. The wrapped keys made before still open. Nothing changes in Exment.
- The data key: make a new one with `php artisan exment:data-key generate`, put it first, and run `php artisan exment:data-key rotate`. The values of the encrypted columns and the secrets of the settings below are encrypted again with it. Remove an old key only when `php artisan exment:data-key status` shows 0 for it.

## When the key service is not reached
- Only the encrypted columns show "cannot be read now". The other pages and columns work as usual.
- A value of an encrypted column cannot be saved (it is never saved unencrypted).
- "Where the encryption keys are" of the [security check](/security_check) is NG. `php artisan exment:data-key status` shows it too.
- It goes back to normal once the service is reached.

## The keys are kept in memory only
- An opened key is kept for the request, and, with PHP's APCu, for `EXMENT_DATA_KEY_CACHE_SECONDS` seconds (300 at first), encrypted with APP_KEY. Never in a file, the database or Redis.
- Without APCu, the key service is called for each request that uses an encrypted column (mind the cost and the speed of KMS).

## Secrets that use the same keys
When there are keys (`DATA_ENCRYPTION_KEYS`, or a key service chosen), these secrets are encrypted with the same keys; without them, with APP_KEY as before:
- The secrets of the connections of the data sync
- The client secret and the refresh token of mail OAuth
- The client secret and the private key of LINE WORKS

Values saved before are still read, and saved again the new way on their next save (or by `exment:data-key rotate`).

## Related
- [Custom columns](/column)
- [Security check](/security_check)
