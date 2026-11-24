# MCP サーバー（AI から使う）
Claude などの AI から、ユーザーの権限のまま Exment のデータを読めます。Exment に MCP（Model Context Protocol）のサーバーが入っています。

※この機能は、Exment v7.2.1 以降で使えます。  
※はじめは「使わない」です。システム管理者が「設定：システム」→「[機能の管理](/ja/feature)」で「MCP」を使う設定にし、使える役割グループを選んでください。  
※できるのは**読むことだけ**です。

## つなぎかた
- アドレス：`https://(ExmentのURL)/api/mcp`（「/admin」が付いているサイトでは `/admin/api/mcp`）
- ログイン：[API キー](/ja/api_key)（または OAuth のアクセストークン）を `Authorization: Bearer ...` で送ります

例（Claude Code）：
~~~
claude mcp add --transport http exment https://(ExmentのURL)/api/mcp --header "Authorization: Bearer exk_xxxxxxxx"
~~~

### 画面から設定する（v7.2.6 以降）
「[API キー](/ja/api_key)」の画面に「AI で使う（MCP）」の欄があります。

1. キーを作るときに、「できること」で **「MCP 用」** を選びます。MCP のツールが読む範囲（`table_read`・`value_read`・`workflow_read`）だけを持つキーになります。
2. 作った直後の画面に、**そのキーが入った設定**が出ます。Claude Code の 1 行と、Claude Desktop の `claude_desktop_config.json` に貼る内容です。キーと同じく、**このときだけ**表示します。ほかのときは、キーのかわりに `exk_...` と出します。
3. このサイトで MCP を使っていない（または自分は使えない）ときは、その旨を出します。

Claude Desktop の例（Node.js の `npx` で [mcp-remote](https://www.npmjs.com/package/mcp-remote) を使います）：
~~~
{
    "mcpServers": {
        "exment": {
            "command": "npx",
            "args": ["-y", "mcp-remote", "https://(ExmentのURL)/api/mcp", "--header", "Authorization:${EXMENT_AUTH}"],
            "env": { "EXMENT_AUTH": "Bearer exk_xxxxxxxx" }
        }
    }
}
~~~

### システム管理者：API 設定の画面（v7.2.6 以降）
「[API設定](/ja/api)」の画面の上に「MCP サーバー」の欄があります。

- MCP がオンかオフか（オフのときは「[機能の管理](/ja/feature)」へのリンク。API を使っていないときもオフです）
- MCP サーバーのアドレス
- ツールの一覧と、それぞれに要る範囲（スコープ）
- 最近 30 日に使った人（最後に使った日時・呼び出しの数。操作ログのメソッド `MCP` から）

## 使えるツール
| ツール | 内容 |
|---|---|
| `list_tables` | 見られるテーブルの一覧 |
| `get_table` | テーブルの列など |
| `search_data` | データを探す（言葉を省くと新しい順） |
| `get_data` | データ 1 件 |
| `list_attachments` | 添付ファイルの一覧（名前などだけ） |
| `get_workflow_status` | ワークフローの状態 |

## 返すもの
- **キーやトークンのユーザーが見られるものだけ**を返します。テーブルとデータの権限、キーの範囲（`table_read`・`value_read`・`workflow_read`）、キーに選んだテーブルが、API と同じように効きます。
- 1 回に返す件数は `.env` の `EXMENT_MCP_MAX_ROWS`（初め 50、最大 100）、1 人 1 分あたりの回数は `EXMENT_MCP_CALLS_PER_MINUTE`（初め 60）です。
- 使ったツールは、操作ログに残ります（メソッド `MCP`）。
- API の IP の制限も、そのまま効きます。

## 関連項目
- [API キー](/ja/api_key)
- [機能の管理](/ja/feature)
- [API設定](/ja/api)
