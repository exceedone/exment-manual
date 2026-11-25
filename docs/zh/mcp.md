# MCP 服务器（从 AI 使用）
Claude 等 AI 可以保持用户的权限，读取 Exment 的数据。Exment 内置了 MCP（Model Context Protocol）服务器。

※此功能可在 Exment v7.2.1 及以上版本中使用。  
※初始为“不使用”。请由系统管理员在“设置：系统”→“[功能管理](/zh/feature)”中把“MCP（从 AI 连接）”设为使用，并选择可以使用的角色组。  
※能做的**只有读取**。

## 连接方法
- 地址：`https://(Exment的URL)/api/mcp`（在带有“/admin”的站点上为 `/admin/api/mcp`）
- 登录：用 `Authorization: Bearer ...` 发送 [API 密钥](/zh/api_key)（或 OAuth 的访问令牌）

示例（Claude Code）：
~~~
claude mcp add --transport http exment https://(Exment的URL)/api/mcp --header "Authorization: Bearer exk_xxxxxxxx"
~~~

## 可以使用的工具
| 工具 | 内容 |
|---|---|
| `list_tables` | 可查看的表的列表 |
| `get_table` | 表的列等 |
| `search_data` | 搜索数据（不填关键词时按从新到旧的顺序） |
| `get_data` | 1 条数据 |
| `list_attachments` | 附件的列表（只有名称等） |
| `get_workflow_status` | 工作流的状态 |

## 返回的内容
- **只返回密钥或令牌的用户可以查看的内容**。表和数据的权限、密钥的范围（`table_read`、`value_read`、`workflow_read`）、为密钥选择的表，都和 API 一样有效。
- 1 次返回的条数由 `.env` 的 `EXMENT_MCP_MAX_ROWS` 决定（初始值 50，最大 100），每人每分钟的次数由 `EXMENT_MCP_CALLS_PER_MINUTE` 决定（初始值 60）。
- 使用过的工具会记录在操作日志中（方法为 `MCP`）。
- API 的 IP 限制也照样有效。

## 相关项目
- [API 密钥](/zh/api_key)
- [功能管理](/zh/feature)
- [API 设置](/zh/api)
