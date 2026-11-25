# API で組織・役割グループのメンバーを変える
API で、**組織に所属するユーザー**と、**役割グループのユーザー・組織**を、読んだり、足したり、外したりできます。画面と同じことを、プログラムや AI から最後まで進められます。

※この機能は、Exment v7.2.6 以降で使えます。

## 使い始める
1. [機能の管理](/ja/feature)で「API で組織と役割グループのメンバーを変える」を「使う」にします。はじめは「使わない」です。
1. トークンか [API キー](/ja/api_key)に、次のスコープを付けます。

| スコープ | できること |
|---|---|
| `user_org_read` | 組織のユーザー・ユーザーの組織を読む |
| `user_org_write` | 上に加えて、組織にユーザーを足す・外す |
| `role_group_read` | 役割グループと、そのユーザー・組織を読む |
| `role_group_write` | 上に加えて、役割グループにユーザー・組織を足す・外す |

## 使える人
- システム管理者と、役割グループの権限「すべて」か「ユーザー・組織」を持つ人だけです。ほかの人は `403` になります。
- **システムの権限を持つ役割グループ**（システム管理者のグループ）は、システム管理者だけが変えられます。
- 呼び出しは、[操作ログ](/ja/log)に残ります。変えたあとは、画面で変えたときと同じく、権限のキャッシュを消します。足した人は、次の呼び出しから権限を持ちます。

## 組織のユーザー
| メソッド | URL | 中身 |
|---|---|---|
| GET | `/admin/api/organization/{組織の ID}/users` | 組織と、所属するユーザーの一覧 |
| POST | `/admin/api/organization/{組織の ID}/users` | ユーザーを足す（`{"users": [ユーザーの ID, ...]}`） |
| DELETE | `/admin/api/organization/{組織の ID}/users` | ユーザーを外す（`{"users": [ユーザーの ID, ...]}`） |
| GET | `/admin/api/user/{ユーザーの ID}/organizations` | ユーザーと、所属する組織の一覧 |

足す・外すは、変えたあとの一覧を返します。もう入っている人を足しても、2 回は入りません。

~~~
POST /admin/api/organization/2/users
{"users": [3, 5]}

{"organization": {"id": 2, "label": "開発部", "organization_code": "dev", "organization_name": "開発部"},
 "users": [{"id": 3, "label": "user2", "user_code": "user2", "user_name": "user2", "email": "user2@example.com"}, ...]}
~~~

## 役割グループ
| メソッド | URL | 中身 |
|---|---|---|
| GET | `/admin/api/role_group` | 役割グループの一覧（名前・説明・システムの権限か・ユーザーと組織の数） |
| GET | `/admin/api/role_group/{ID}` | 1 つの役割グループ（権限・ユーザー・組織） |
| POST | `/admin/api/role_group/{ID}/members` | ユーザー・組織を足す（`{"user": [..], "organization": [..]}`） |
| DELETE | `/admin/api/role_group/{ID}/members` | ユーザー・組織を外す（同じ形） |

`user` と `organization` は、どちらか片方だけでもかまいません。

## MCP から読む
AI からは、MCP サーバーのツール（`list_organization_users`・`list_user_organizations`・`list_role_groups`・`get_role_group`）で読めます。足す・外すツールはありません。詳細は[こちら](/ja/mcp)

## エラー
| HTTP | 中身 |
|---|---|
| 400 | ID の形が違う・ない ID がある・組織や役割グループがない（1 回に 1000 件まで） |
| 403 | 権限がない・スコープが足りない・システムの役割グループをシステム管理者以外が変えようとした・機能を使っていない |
