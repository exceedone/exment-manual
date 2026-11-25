# MCP server (use from AI)
AI such as Claude can read Exment data with the user's own permissions. Exment has an MCP (Model Context Protocol) server.

※This feature is available in Exment v7.2.1 or later.  
※It is off at first. A system administrator turns on "MCP" in "Settings: System" > "[Feature Management](/feature)" and chooses the role groups that may use it.  
※It **only reads**.

## Connecting
- Address: `https://(Exment URL)/api/mcp` (`/admin/api/mcp` on a site with "/admin")
- Sign-in: send an [API key](/api_key) (or an OAuth access token) as `Authorization: Bearer ...`

Example (Claude Code):
~~~
claude mcp add --transport http exment https://(Exment URL)/api/mcp --header "Authorization: Bearer exk_xxxxxxxx"
~~~

## Tools
| Tool | What it does |
|---|---|
| `list_tables` | The tables you can see |
| `get_table` | The columns and more of a table |
| `search_data` | Search records (without words, the newest first) |
| `get_data` | One record |
| `list_attachments` | The list of attachments (names and such only) |
| `get_workflow_status` | The workflow status |
| `list_organization_users` | The users of an organization (v7.2.6 or later) |
| `list_user_organizations` | The organizations of a user (v7.2.6 or later) |
| `list_role_groups` | The role groups (v7.2.6 or later) |
| `get_role_group` | A role group: permissions, users and organizations (v7.2.6 or later) |

The tools of organizations and role groups follow the rule of the [API for members](/api_members): the feature is on, the user is a system administrator or may manage role groups, and the scopes `user_org_read` / `role_group_read`. **They only read**: adding or removing members is the API only. Lists are paged with `limit` and `offset` (`total` and `next_offset` in the answer).

## What it returns
- **Only what the user of the key or token may see.** Table and record permissions, the key's scopes (`table_read`, `value_read`, `workflow_read`) and the key's tables apply as for the API.
- Rows per call: `EXMENT_MCP_MAX_ROWS` in `.env` (default 50, at most 100). Calls per user per minute: `EXMENT_MCP_CALLS_PER_MINUTE` (default 60).
- Each tool call goes to the operation log (method `MCP`).
- The API IP filter applies as well.

## Related
- [API keys](/api_key)
- [Feature Management](/feature)
- [API setting](/api)
