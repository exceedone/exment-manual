# MCP 서버(AI에서 사용)
Claude 등의 AI에서 사용자의 권한 그대로 Exment의 데이터를 읽을 수 있습니다. Exment에 MCP(Model Context Protocol) 서버가 들어 있습니다.

※이 기능은 Exment v7.2.1 이상에서 사용할 수 있습니다.  
※처음에는 "사용 안 함"입니다. 시스템 관리자가 "설정: 시스템" → "[기능 관리](/ko/feature)"에서 "MCP(AI에서 연결)"을 사용하도록 설정하고, 사용할 수 있는 역할 그룹을 선택해 주십시오.  
※할 수 있는 것은 **읽기뿐**입니다.

## 연결 방법
- 주소: `https://(Exment의 URL)/api/mcp` ("/admin"이 붙어 있는 사이트에서는 `/admin/api/mcp`)
- 로그인: [API 키](/ko/api_key)(또는 OAuth 액세스 토큰)를 `Authorization: Bearer ...` 로 보냅니다

예(Claude Code):
~~~
claude mcp add --transport http exment https://(Exment의 URL)/api/mcp --header "Authorization: Bearer exk_xxxxxxxx"
~~~

## 사용할 수 있는 도구
| 도구 | 내용 |
|---|---|
| `list_tables` | 볼 수 있는 테이블 목록 |
| `get_table` | 테이블의 열 등 |
| `search_data` | 데이터 찾기(검색어를 생략하면 최신순) |
| `get_data` | 데이터 1건 |
| `list_attachments` | 첨부 파일 목록(이름 등만) |
| `get_workflow_status` | 워크플로의 상태 |

## 돌려주는 것
- **키나 토큰의 사용자가 볼 수 있는 것만** 돌려줍니다. 테이블과 데이터의 권한, 키의 범위(`table_read`·`value_read`·`workflow_read`), 키에 선택한 테이블이 API와 똑같이 적용됩니다.
- 한 번에 돌려주는 건수는 `.env` 의 `EXMENT_MCP_MAX_ROWS`(기본값 50, 최대 100), 1명의 1분당 횟수는 `EXMENT_MCP_CALLS_PER_MINUTE`(기본값 60)입니다.
- 사용한 도구는 작업 로그에 남습니다(메서드 `MCP`).
- API의 IP 제한도 그대로 적용됩니다.

## 관련 항목
- [API 키](/ko/api_key)
- [기능 관리](/ko/feature)
- [API 설정](/ko/api)
