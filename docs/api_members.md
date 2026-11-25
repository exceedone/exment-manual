# API for the members of organizations and role groups
Read, add and remove **the users of an organization** and **the users and organizations of a role group** with the API: what the pages do, from a program or an AI.

* Available in Exment v7.2.6 or later.

## Turn it on
1. On [Feature management](/feature), set "API for the members of organizations and role groups" to "Use". It is off at first.
1. Give the token or the [API key](/api_key) these scopes:

| Scope | What it may do |
|---|---|
| `user_org_read` | Read the users of organizations and the organizations of users |
| `user_org_write` | Also add and remove the users of organizations |
| `role_group_read` | Read role groups with their users and organizations |
| `role_group_write` | Also add and remove the users and organizations of role groups |

## Who may use it
- System administrators, and users with the role group permission "all" or "users and organizations". Others get `403`.
- **A role group with the system permission** (the group of the system administrators) can be changed by system administrators only.
- The calls are in the [operation log](/log). After a change the caches of the permissions are cleared as on the pages: an added user has the permission from the next call.

## The users of an organization
| Method | URL | What |
|---|---|---|
| GET | `/admin/api/organization/{organization id}/users` | The organization and its users |
| POST | `/admin/api/organization/{organization id}/users` | Add users (`{"users": [user id, ...]}`) |
| DELETE | `/admin/api/organization/{organization id}/users` | Remove users (`{"users": [user id, ...]}`) |
| GET | `/admin/api/user/{user id}/organizations` | The user and the organizations of the user |

Adding and removing answer the list after the change. A user who is in already is not added twice.

## Role groups
| Method | URL | What |
|---|---|---|
| GET | `/admin/api/role_group` | The role groups (names, description, whether system, counts of users and organizations) |
| GET | `/admin/api/role_group/{id}` | One role group (permissions, users, organizations) |
| POST | `/admin/api/role_group/{id}/members` | Add users and organizations (`{"user": [..], "organization": [..]}`) |
| DELETE | `/admin/api/role_group/{id}/members` | Remove them (the same form) |

`user` or `organization` alone is fine.

## Reading from MCP
An AI can read them with the tools of the MCP server (`list_organization_users`, `list_user_organizations`, `list_role_groups`, `get_role_group`). There is no tool to add or remove members. See [MCP](/mcp)

## Errors
| HTTP | What |
|---|---|
| 400 | Wrong ids, ids not found, no such organization or role group (at most 1000 ids at once) |
| 403 | No permission, missing scope, a system role group changed by someone who is not a system administrator, the feature not used |
