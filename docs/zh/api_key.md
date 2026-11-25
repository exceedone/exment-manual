# API 密钥
用户可以自己创建 API 密钥，让程序或 AI 以自己的权限调用 Exment 的 API。发送时用 `Authorization: Bearer exk_...` 代替 OAuth 的访问令牌。

※此功能可在 Exment v7.2.1 及以上版本中使用。  
※初始为“不使用”。请由系统管理员在“设置：系统”→“[功能管理](/zh/feature)”中把“用户的 API 密钥”设为使用，并选择可以使用的角色组。  
※OAuth 的访问令牌（[API 设置](/zh/api)）可以照常使用。

## 创建自己的密钥
从右上角用户菜单的“设置”页面中的“API 密钥”打开（URL 为 `/auth/api_keys`）。系统管理员也可以从“API 设置”的列表打开。

![API 密钥（日语界面）](../ja/img/api_key/api_key_mine.png)

| 项目 | 内容 |
|---|---|
| 名称 | 能看出密钥用途的名称 |
| 可执行的操作 | “只读”（me、table_read、view_read、value_read、workflow_read、notify_read），或者自选范围 |
| 表 | 可查看的所有表，或者仅所选的表。选择表后，只能调用这些表的 API 和自己的信息（me） |
| 允许的 IP 地址 | 每行一个（也可以填范围）。为空时，可以从任何地址访问（站点整体的 API IP 限制仍然有效） |
| 截止日期 | 7、30、90（初始值）、180、365 天 |
| 客户端证书 | 填入证书的 SHA-256 指纹后，只有带上该证书时才能使用（证书由前端的 Web 服务器验证） |
| 当前密码 | 创建时输入当前的密码 |

- **密钥只在创建时显示 1 次**。请记下来，不要交给他人。之后无法再次查看。
- 密钥能做的事，**仅限于该用户在页面上能做的事当中，为密钥选择的范围**。
- 每人最多可以有 10 个可用的密钥。
- 列表中会显示最后使用的时间、IP 和次数。不再需要的密钥，请在列表中停用。

## 使用密钥
~~~
curl -H "Authorization: Bearer exk_xxxxxxxx" https://(Exment的URL)/api/data/(表名)
~~~

※在带有“/admin”的站点上，地址是 `https://(Exment的URL)/admin/api/...`（[URL 中包含的“admin”](/zh/additional_prefix)）。

在以下情况下密钥将无法使用：过了截止日期、被停用、用户或登录被删除、被移出可使用的角色组、与允许的 IP 或证书不符、调用了所选表以外的内容（不会返回原因）。

## 系统管理员：所有密钥
在“API 密钥”的管理页面（URL 为 `/api_keys`）中，可以查看本站点用户创建的 API 密钥，并立即停用 1 个密钥，或者停用某个用户的全部密钥。

![API 密钥的管理（日语界面）](../ja/img/api_key/api_key_admin.png)

- 对于 SSO 用户，即使在 IdP 中停用，密钥在到期或在此处停用之前仍可使用。有人离职时，请使用“停用此用户的全部密钥”。
- 在 `.env` 中设置 `ADMIN_API_KEY_REQUIRE_CLIENT_CERT=true`，可以要求所有密钥都使用客户端证书。位于负载均衡器等的后面时，设置 `ADMIN_TRUST_PROXY_IPS` 后，会用真实的 IP 进行比较。

## 相关项目
- [MCP 服务器（从 AI 使用）](/zh/mcp)
- [API 设置](/zh/api)
- [功能管理](/zh/feature)
