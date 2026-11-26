# MCP server (use from AI)
AI such as Claude can read Exment data with the user's own permissions. Exment has an MCP (Model Context Protocol) server.

※This feature is available in Exment v7.2.1 or later.  
※It is off at first. A system administrator sets "MCP (connect from an AI)" to be used in "Settings: System" > "[Feature Management](/feature)" and chooses the role groups that may use it.  
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

## What it returns
- It returns **only what the user of the key or token may see**. Table and record permissions, the key's scopes (`table_read`, `value_read`, `workflow_read`) and the key's tables apply as for the API.
- Rows per call: `EXMENT_MCP_MAX_ROWS` in `.env` (default 50, at most 100). Calls per user per minute: `EXMENT_MCP_CALLS_PER_MINUTE` (default 60).
- Each tool call goes to the operation log (method `MCP`). From v7.3.0, also in "The log of the calls" below.
- The API IP filter applies as well.

## The log of the calls (MCP log)
* This feature is available in Exment v7.3.0 and later.

The calls from AI (MCP) alone can be read on a page of the log management. The operation log (method `MCP`) keeps them as before too.

### Turning it on
It is off at first. A system administrator turns on "MCP log" in [Feature Management](/feature).

### Reading it
In "Settings: System" > "Log management", press "Open" of "MCP log". **Only the system administrators and the users of role groups with the "Audit" permission** can read it.

Each call keeps the following.

| Item | Content |
|---|---|
| Time, user, IP address | Who called (the IP address as "How IP addresses are kept" of the log management says) |
| Tool | The tool used (`search_data`, ...). For a call that is not a tool, its method (`initialize`, `ping`, ...) |
| Result | OK, tool error (no such data, no permission, ...), error (a JSON-RPC error and its code), refused |
| Reason | Why it failed or was refused (`rate_limited`: too many calls, `parse_error`: not JSON, `unsupported_version`: another MCP version, ...) |
| Time taken, answer size | Milliseconds, bytes |
| Arguments | Kept as the operation log keeps them. Passwords, tokens, secret keys and such are masked. While "Keep the input in the logs" of the log management is off, only the names of the items |

- It can be filtered by time, user, tool and result.
- Calls that are not signed in are not kept.
- Calls refused by the limits (the MCP calls per minute and the limit of the API) are kept once a minute per user.
- It is kept 90 days at first. A system administrator can change it at the bottom of the page (0: never deleted).

### The IT audit report
While the MCP log is used, the IT audit report has "MCP calls": the calls in the period, one row per user.

| Item | Content |
|---|---|
| User code, user name | Who called |
| Calls, errors, refused | Counts |
| Tools | The tools used |
| First, last | The first and last call in the period |

Only the counts and the tools, never the arguments. It can be downloaded as CSV like the other sections.

## Related
- [API keys](/api_key)
- [Feature Management](/feature)
- [API setting](/api)
