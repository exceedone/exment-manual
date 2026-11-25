# Máy chủ MCP (dùng từ AI)
AI như Claude có thể đọc dữ liệu của Exment bằng đúng quyền của người dùng. Exment có sẵn máy chủ MCP (Model Context Protocol).

※Tính năng này dùng được từ Exment v7.2.1.  
※Ban đầu là "Không sử dụng". Quản trị viên hệ thống hãy vào "Cài đặt: Hệ thống" → "[Quản lý tính năng](/vi/feature)", đặt "MCP (kết nối từ AI)" thành sử dụng và chọn các nhóm vai trò được dùng.  
※Chỉ làm được **việc đọc**.

## Cách kết nối
- Địa chỉ: `https://(URL của Exment)/api/mcp` (với site có "/admin" trong URL là `/admin/api/mcp`)
- Đăng nhập: gửi [khóa API](/vi/api_key) (hoặc access token của OAuth) bằng `Authorization: Bearer ...`

Ví dụ (Claude Code):
~~~
claude mcp add --transport http exment https://(URL của Exment)/api/mcp --header "Authorization: Bearer exk_xxxxxxxx"
~~~

## Các công cụ dùng được
| Công cụ | Nội dung |
|---|---|
| `list_tables` | Danh sách các bảng xem được |
| `get_table` | Các cột, v.v. của bảng |
| `search_data` | Tìm dữ liệu (bỏ trống từ khóa thì theo thứ tự mới nhất) |
| `get_data` | 1 dữ liệu |
| `list_attachments` | Danh sách tệp đính kèm (chỉ tên, v.v.) |
| `get_workflow_status` | Trạng thái của quy trình làm việc |

## Nội dung trả về
- **Chỉ trả về những gì người dùng của khóa hoặc token xem được**. Quyền với bảng và dữ liệu, phạm vi của khóa (`table_read`, `value_read`, `workflow_read`) và các bảng đã chọn cho khóa đều có hiệu lực giống như API.
- Số dữ liệu trả về mỗi lần là `EXMENT_MCP_MAX_ROWS` trong `.env` (mặc định 50, tối đa 100). Số lần gọi mỗi phút của một người là `EXMENT_MCP_CALLS_PER_MINUTE` (mặc định 60).
- Công cụ đã dùng được ghi vào nhật ký thao tác (phương thức `MCP`).
- Giới hạn IP của API cũng vẫn có hiệu lực.

## Mục liên quan
- [Khóa API](/vi/api_key)
- [Quản lý tính năng](/vi/feature)
- [Cài đặt API](/vi/api)
