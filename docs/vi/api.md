# Cài đặt API
Từ hệ thống hoặc chương trình khác, bạn đọc và ghi được dữ liệu của Exment bằng API (lối vào để các chương trình trao đổi với nhau).
Trang này giải thích các thiết lập để dùng được API và cách xác thực (việc kiểm tra xem thực thi với tư cách ai).

Trình tự cho đến khi dùng được API như sau.

1. Đặt "Sử dụng API" thành YES trong cài đặt hệ thống ([Thay đổi cài đặt hệ thống](/vi/api?id=thay-đổi-cài-đặt-hệ-thống)).
2. Chọn 1 trong 3 hình thức xác thực và đăng ký ứng dụng API ([Cách xác thực API](/vi/api?id=cách-xác-thực-api)).
3. Lấy access token (mật mã có thời hạn, gửi kèm khi gọi API).
4. Gửi kèm access token và thực thi API ([Cách thực thi API](/vi/api?id=cách-thực-thi-api)).

Việc xác thực dùng tài khoản của Exment, theo phương thức gọi là OAuth.  
Exment xác thực bằng [laravel/passport](https://github.com/laravel/passport).  
Tham khảo: [Laravel 12.x Laravel Passport](https://readouble.com/laravel/12.x/ja/passport.html) (tiếng Nhật)  
Vì vậy, việc xác thực phụ thuộc vào laravel/passport, và tài liệu này giới thiệu 3 hình thức xác thực.

※Về "Khóa API" mà người dùng tự tạo và dùng (từ v7.2.1), vui lòng xem [Khóa API](/vi/api_key). Đó là tính năng khác với "API Key (hình thức khóa API)" của trang này.

## Thay đổi cài đặt hệ thống
Để dùng API trên Exment, hãy đổi "Sử dụng API" thành YES từ menu "Cài đặt quản trị > Cài đặt hệ thống".

> ※URL trên là của thiết lập chuẩn không có "/admin" (site mới cài từ v7.2.1). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (site cài bằng phiên bản trước là "admin"), hãy thêm giá trị đó vào sau URL của site (ví dụ: `http(s)://(URL của Exment)/admin/oauth/token`). Chi tiết vui lòng xem [Đổi hoặc bỏ "admin" trong URL](/vi/additional_prefix).

## Cách xác thực API
Có 3 hình thức xác thực. Hãy chọn hình thức hợp với cách dùng.

| Hình thức xác thực | Cách dùng phù hợp |
| --- | --- |
| 1. Đăng nhập trên màn hình | Khi thực thi API từ web |
| 2. Mật khẩu | Ứng dụng client khó gọi màn hình web |
| 3. Khóa API | Chạy batch |

1. **OAuth 2.0, Authorization Code Flow (hình thức đăng nhập trên màn hình)**  
Người dùng đăng nhập bằng trình duyệt và chấp thuận việc dùng ứng dụng thì dùng được API. Nên dùng khi thực thi API từ web.

1. **Password Grant Token (hình thức mật khẩu)**  
Đưa ID đăng nhập và mật khẩu vào request xác thực thì dùng được API. Nên dùng cho ứng dụng client khó gọi màn hình web.

1. **API Key (hình thức khóa API)**  
Khóa API được tạo khi tạo ứng dụng API. Sau đó, đưa khóa API vào request xác thực thì dùng được API. Nên dùng cho việc chạy batch.


### 1. OAuth 2.0, Authorization Code Flow (hình thức đăng nhập trên màn hình)
Từ dịch vụ web mới tạo (ví dụ: hệ thống kế toán), người dùng đăng nhập Exment rồi dùng được API. Trình tự như sau.

- Khi xác thực, trình duyệt web hiển thị màn hình nhập ID và mật khẩu của Exment.  

- Khi người dùng nhập ID và mật khẩu, thông báo chấp thuận ứng dụng được hiển thị.  

![Màn hình xác thực API](../img/api/authorize1.png)  

- Khi người dùng chấp thuận, trình duyệt quay về dịch vụ web (callback) và code được trả về.

※Tài liệu này ghi ví dụ khi xây dựng một dịch vụ web khác với Exment bằng Laravel.  
Cũng có thể xây dựng bằng ngôn ngữ hoặc framework khác.  

#### Cách thiết lập

##### Thiết lập trong trang Exment
- Quản trị viên hệ thống nhập URL sau.  
http(s)://(URL của Exment)/api_setting  
※Sau khi làm "Thay đổi cài đặt hệ thống" ở trên thì mở được.

- Từ v7.1.0, cũng mở được từ "Cài đặt quản trị" → "Cài đặt ứng dụng API" ở menu bên trái (khi "Sử dụng API" là YES).
- Ở v7.0 trở về trước, với thiết lập mặc định "Cài đặt ứng dụng API" không hiển thị trong menu. Để thêm vào menu, hãy mở trang "Cài đặt quản trị" > "Menu" và chọn loại menu "Menu hệ thống". "Cài đặt ứng dụng API" sẽ hiển thị ở mục đối tượng, hãy chọn rồi lưu.

![Màn hình xác thực API](../img/api/api_setting1.png)  

- Màn hình Cài đặt ứng dụng API được hiển thị, hãy bấm [Mới].  

- Nhập các mục cần thiết.  

    **Hình thức xác thực**  
	Chọn "Đăng nhập trên màn hình".  

	**Tên ứng dụng**  
	Hãy ghi một tên tùy ý.  

	**URL chuyển hướng**  
	Hãy ghi URL sẽ chuyển hướng tới khi người dùng hoàn tất xác thực trên màn hình.  

![Màn hình xác thực API](../img/api/api_setting2.png)  


- Sau khi lưu xong, Client ID và Client Secret cần cho xác thực được hiển thị, hãy sao chép.  
※Client Secret hiển thị khi bấm biểu tượng con mắt.  

![Màn hình xác thực API](../img/api/api_setting3.png)  

##### Phần cài đặt ở dịch vụ web tự phát triển
- Ở phía dịch vụ web, tạo endpoint để gọi màn hình xác thực của Exment.

~~~
http(s)://(URL của Exment)/oauth/authorize  GET
response_type: code
client_id: (Client ID đã sao chép)
redirect_uri: (callback URL đã nhập)
scope: (scope để truy cập. Danh sách ghi ở dưới. Nếu có nhiều thì cách nhau bằng dấu cách)

Ví dụ: http://localhost/oauth/authorize?response_type=code&client_id=aaaaaaaa-aaaa-aaaa-aaaaaaaa&redirect_uri=http://localhost/callback&scope=me value_read
~~~

- Ví dụ:
~~~ php
// Phần cài đặt ở phía dịch vụ web
Route::get('/redirect', function () {
    $query = http_build_query([
        'client_id' => '(Client ID đã sao chép)',
        'redirect_uri' => '(callback URL đã nhập)',
        'response_type' => 'code',
        'scope' => 'me',
    ]);

    return redirect('(URL của Exment)/oauth/authorize?'.$query);
}
~~~

- Ở phía dịch vụ web, tạo endpoint để lấy access token sau khi xác thực Exment hoàn tất.

~~~
http(s)://(URL của Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "(Client ID đã sao chép)",
    "client_secret": "(Client Secret đã sao chép)",
    "redirect_uri": "(callback URL đã nhập)",
    "code": "(code lấy từ URL được chuyển hướng tới)"
}
~~~

- Ví dụ:
~~~ php
// Phần cài đặt ở phía dịch vụ web. Endpoint là callback URL đã nhập
Route::get('/callback', function (Request $request) {
    $http = new GuzzleHttp\Client;

    $response = $http->post('(URL của Exment)/oauth/token', [
        'form_params' => [
            'grant_type' => 'authorization_code',
            'client_id' => '(Client ID đã sao chép)',
            'client_secret' => '(Client Secret đã sao chép)',
            'redirect_uri' => '(callback URL đã nhập)',
            'code' => $request->code,
        ],
    ]);

    $json = json_decode((string) $response->getBody(), true);
});
~~~

- Nhờ đó, một json chứa các thuộc tính access_token, refresh_token, expires_in được trả về trong response.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Dùng access token này để thực thi API.


### 2. Password Grant Token (hình thức mật khẩu)
Đưa ID đăng nhập và mật khẩu vào request xác thực thì dùng được API.

- Người dùng không cần nhập ID và mật khẩu trên màn hình, nên chạy được cả trong xử lý batch, v.v.  

- Cần đưa ID và mật khẩu của người dùng vào request xác thực.  

- Trong các loại SSO, hình thức này hỗ trợ LDAP. Không hỗ trợ xác thực OAuth và SAML.

※Tài liệu này ghi ví dụ khi xây dựng một dịch vụ web khác với Exment bằng Laravel.  
Cũng có thể xây dựng bằng ngôn ngữ hoặc framework khác.  

#### Cách thiết lập

##### Thiết lập trong trang Exment
- Quản trị viên hệ thống nhập URL sau.  
http(s)://(URL của Exment)/api_setting  
※Sau khi làm "Thay đổi cài đặt hệ thống" ở trên thì mở được.

- Từ v7.1.0, cũng mở được từ "Cài đặt quản trị" → "Cài đặt ứng dụng API" ở menu bên trái (khi "Sử dụng API" là YES).
- Ở v7.0 trở về trước, với thiết lập mặc định "Cài đặt ứng dụng API" không hiển thị trong menu. Để thêm vào menu, hãy mở trang "Cài đặt quản trị" > "Menu" và chọn loại menu "Menu hệ thống". "Cài đặt ứng dụng API" sẽ hiển thị ở mục đối tượng, hãy chọn rồi lưu.

![Màn hình xác thực API](../img/api/api_setting1.png)  

- Màn hình Cài đặt ứng dụng API được hiển thị, hãy bấm [Mới].  

- Nhập các mục cần thiết.  

    **Hình thức xác thực**  
	Chọn "Mật khẩu (Password Grant)".  

	**Tên ứng dụng**  
	Hãy ghi một tên tùy ý.

![Màn hình xác thực API](../img/api/api_setting4.png)  


- Sau khi lưu xong, Client ID và Client Secret cần cho xác thực được hiển thị, hãy sao chép.  
※Client Secret hiển thị khi bấm biểu tượng con mắt.  

![Màn hình xác thực API](../img/api/api_setting5.png)  


##### Phần cài đặt ở chương trình tự phát triển
- Ở phía gọi, tạo request để lấy access token.

~~~
http(s)://(URL của Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(Client ID đã sao chép)",
    "client_secret": "(Client Secret đã sao chép)",
    "username": "(ID người dùng hoặc địa chỉ email để đăng nhập)",
    "password": "(mật khẩu của người dùng đăng nhập)",
    "scope": "(scope để truy cập. Danh sách ghi ở dưới. Nếu có nhiều thì cách nhau bằng dấu cách)"
}
~~~

- Nhờ đó, một json chứa các thuộc tính access_token, refresh_token, expires_in được trả về trong response.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Dùng access token này để thực thi API.


##### Phần cài đặt ở chương trình tự phát triển (với xác thực LDAP)
- Với xác thực LDAP, hãy POST như sau.

~~~
http(s)://(URL của Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(Client ID đã sao chép)",
    "client_secret": "(Client Secret đã sao chép)",
	"login_type": "ldap",
	"provider_name": "('Tên LDAP (chữ và số)' đã nhập ở màn hình cài đặt đăng nhập)",
    "username": "(ID người dùng hoặc địa chỉ email để đăng nhập)",
    "password": "(mật khẩu của người dùng đăng nhập)",
    "scope": "(scope để truy cập. Danh sách ghi ở dưới. Nếu có nhiều thì cách nhau bằng dấu cách)"
}
~~~

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Dùng access token này để thực thi API.



### 3. API Key (hình thức khóa API)
Khóa API được tạo khi tạo ứng dụng API. Sau đó, đưa khóa API vào request xác thực thì dùng được API.

- Người dùng không cần nhập ID và mật khẩu trên màn hình.  
Cũng không cần đặt mật khẩu ở nơi thực thi. Khi phát triển xử lý batch, v.v. cũng không phải nhúng mật khẩu, nên giảm được rủi ro bảo mật.

- **Khi đăng ký ứng dụng API bằng thiết lập này, REST API được thực thi với tư cách người dùng đã tạo ứng dụng API.**  

※Tài liệu này ghi ví dụ khi xây dựng một dịch vụ web khác với Exment bằng Laravel.  
Cũng có thể xây dựng bằng ngôn ngữ hoặc framework khác.  

#### (Bổ sung) Thiết lập người dùng và nhóm vai trò nên dùng khi thiết lập bằng API Key

Khi đăng ký ứng dụng API bằng thiết lập này, REST API được thực thi với tư cách người dùng đã tạo ứng dụng API.  
Vì vậy, không nên để quản trị viên hệ thống đăng ký ứng dụng API.  
Nên thiết lập người dùng và nhóm vai trò theo các bước sau.  

- Tạo mới một [nhóm vai trò](/vi/role_group).
    - Thêm quyền "Quản lý ứng dụng API".
	- Thêm quyền với các bảng muốn thực thi bằng API.

- Thêm người dùng sẽ thực thi bằng API.
    - Ở nhóm vai trò, chọn nhóm vai trò đã tạo ở trên.

- Đăng nhập bằng người dùng đã tạo ở trên, mở màn hình Cài đặt ứng dụng API và đăng ký ứng dụng API.


#### Cách thiết lập

##### Thiết lập trong trang Exment
- Quản trị viên hệ thống nhập URL sau.  
http(s)://(URL của Exment)/api_setting  
※Sau khi làm "Thay đổi cài đặt hệ thống" ở trên thì mở được.

- Từ v7.1.0, cũng mở được từ "Cài đặt quản trị" → "Cài đặt ứng dụng API" ở menu bên trái (khi "Sử dụng API" là YES).
- Ở v7.0 trở về trước, với thiết lập mặc định "Cài đặt ứng dụng API" không hiển thị trong menu. Để thêm vào menu, hãy mở trang "Cài đặt quản trị" > "Menu" và chọn loại menu "Menu hệ thống". "Cài đặt ứng dụng API" sẽ hiển thị ở mục đối tượng, hãy chọn rồi lưu.

![Màn hình xác thực API](../img/api/api_setting1.png)  

- Màn hình Cài đặt ứng dụng API được hiển thị, hãy bấm [Mới].  

- Nhập các mục cần thiết.  

    **Hình thức xác thực**  
	Chọn "Khóa API".  

	**Tên ứng dụng**  
	Hãy ghi một tên tùy ý.

![Màn hình xác thực API](../img/api/api_setting4.png)  


- Sau khi lưu xong, Client ID, Client Secret và khóa API cần cho xác thực được hiển thị, hãy sao chép.  
※Client Secret và khóa API hiển thị khi bấm biểu tượng con mắt.  

![Màn hình xác thực API](../ja/img/api/api_setting6.png)  


##### Phần cài đặt ở chương trình tự phát triển
- Ở phía gọi, tạo request để lấy access token.

~~~
http(s)://(URL của Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "api_key",
    "client_id": "(Client ID đã sao chép)",
    "client_secret": "(Client Secret đã sao chép)",
    "api_key": "(khóa API đã sao chép)",
    "scope": "(scope để truy cập. Danh sách ghi ở dưới. Nếu có nhiều thì cách nhau bằng dấu cách)"
}
~~~

- Nhờ đó, một json chứa các thuộc tính access_token, refresh_token, expires_in được trả về trong response.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Dùng access token này để thực thi API.


## Cách thực thi API
Để thực thi API, thêm nội dung sau vào request header.  

~~~
Content-Type: application/json
Authorization: Bearer (access token đã lấy)
~~~

Ví dụ:
~~~
http://localhost/api/data/user GET
Giá trị header:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......
~~~

Kết quả:
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

> ※URL trên là của thiết lập chuẩn không có "/admin" (site mới cài từ v7.2.1). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (site cài bằng phiên bản trước là "admin"), hãy thêm giá trị đó vào sau URL của site (ví dụ: `http(s)://(URL của Exment)/admin/oauth/token`). Chi tiết vui lòng xem [Đổi hoặc bỏ "admin" trong URL](/vi/additional_prefix).

## Làm mới token
Access token hết hạn sau một khoảng thời gian nhất định và không dùng được nữa.  
Khi đó, có thể dùng refresh token (giá trị để lấy lại access token) để lấy access token lần nữa.  
Hãy thực hiện HTTP POST với nội dung sau.  

~~~
http(s)://(URL của Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "refresh_token",
    "client_id": "(Client ID đã sao chép)",
    "client_secret": "(Client Secret đã sao chép)",
    "refresh_token": "(refresh token đã lấy)"
}
~~~

Kết quả:
~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~


## (Tham khảo) Xác thực, lấy token và thực thi API trên màn hình
Đây là các bước thử từ xác thực đến thực thi API bằng trình duyệt và công cụ, trước khi viết chương trình.  
Hãy dùng để nắm trình tự cho đến khi lấy được access token.  

- Ở cài đặt API, tạo ứng dụng bằng "Đăng nhập trên màn hình".

- Truy cập URL sau.  
http(s)://(URL của Exment)/oauth/authorize?client_id=(Client ID đã sao chép)&redirect_uri=(callback URL đã nhập)&response_type=code&scope=me  

Ví dụ:  
http://localhost/oauth/authorize?client_id=1af52b10-BBBB-CCCC-XXXX-YYYYYYYY&redirect_uri=http%3a%2f%2flocalhost%2fauth%2fcallback&response_type=code&scope=me  


- Nhờ đó, một màn hình đơn giản để xác thực ứng dụng được hiển thị.  

![Màn hình xác thực API](../img/api/authorize1.png)  

Bấm "Cho phép".  

- Ở ô URL, query "code=xxxxx" đã được thêm vào.  
Hãy sao chép code này.  
Ví dụ:  auth/callback?code=def5020012c32121912561705255XXXXXXXX  

- Dùng công cụ gửi được POST, thực hiện giao tiếp HTTP sau.  

~~~
http(s)://(URL của Exment)/oauth/token  POST
grant_type: authorization_code
client_id: (Client ID đã sao chép)
client_secret: (Client Secret đã sao chép)
redirect_uri: (callback URL đã nhập)
code: (giá trị code đã lấy)
~~~

Ví dụ:  
~~~
http://localhost/oauth/token POST
grant_type: authorization_code
client_id: 1af52b10-BBBB-CCCC-XXXX-YYYYYYYY
client_secret: PKh1u3xxxx
redirect_uri: http://localhost/auth/callback
code: def5020012c32121912561705255XXXXXXXX
~~~

- Khi hoàn tất bình thường, response như sau được trả về.  
![Màn hình xác thực API](../img/api/authorize2.png)  
Lấy access_token từ giá trị json của response này.  

- Thêm access token này vào header của API rồi thực thi API.  

Ví dụ:  
~~~
http://localhost/api/data/user GET
Giá trị header:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......
~~~

Kết quả:  
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## Danh sách scope
Scope là giá trị quyết định "cho ứng dụng đó làm đến đâu bằng API".  
API thực thi được trong phạm vi các scope đã chỉ định khi lấy token.  
**※Bất kể thiết lập scope, API chỉ truy cập được những thông tin thuộc vai trò và quyền mà người dùng đăng nhập có.**  
Ví dụ, không lấy được thông tin của bảng không có quyền, và không cập nhật được dữ liệu tùy chỉnh không có quyền.  


| Tên tham số | Mô tả |
| ---- | ---- |
| me | Lấy được thông tin của người dùng đăng nhập. |
| system_read | Lấy được thông tin hệ thống. (Hiện chưa dùng. Ghi lại như từ dành riêng) |
| system_write | Lấy, thêm mới, cập nhật, xóa được thông tin hệ thống. (Hiện chưa dùng. Ghi lại như từ dành riêng) |
| table_read | Lấy được thông tin thiết lập của bảng tùy chỉnh. |
| table_write | Lấy, thêm mới, cập nhật, xóa được thông tin thiết lập của bảng tùy chỉnh. (Hiện chưa dùng. Ghi lại như từ dành riêng) |
| view_read | Lấy được thông tin thiết lập của view tùy chỉnh. |
| value_read | Lấy được thông tin của dữ liệu tùy chỉnh. |
| value_write | Lấy, thêm mới, cập nhật, xóa được thông tin của dữ liệu tùy chỉnh. |
| notify_read | Lấy được thông tin của thông báo. |
| notify_write | Thêm mới được thông báo. |
| workflow_read | Lấy được thông tin của quy trình làm việc. |
| workflow_execute | Thực thi được quy trình làm việc. |
| log | Lấy được nhật ký thao tác. |
| plugin | Dùng được API được thêm vào dưới dạng plugin. Chi tiết xem [tại đây](/vi/plugin_quickstart_api) |

※Khi chỉ định nhiều scope, hãy đặt vào tham số, cách nhau bằng dấu cách.  



## Danh sách mã lỗi (đang xác nhận)
Khi thực thi API xảy ra lỗi, mã lỗi được trả về.  
Dưới đây là danh sách mã lỗi và status code của HTTP response.  

| Mã lỗi của Exment | HTTP status code | Mô tả |
| ---- | ---- | ---- |
| 101 | 403 | Không có quyền truy cập endpoint hoặc bảng tùy chỉnh đó. Hãy xem lại quyền của người dùng thực thi. |
| 102 | 400 | Query string khi thực thi hoặc giá trị đã gửi có sai sót. Hãy xem lại giá trị. |
| 103 | 400 | Chủ yếu khi thêm hoặc cập nhật dữ liệu, giá trị đã gửi không qua được validation (kiểm tra). Hãy xem lại giá trị gửi. |
| 104 | 403 | Xảy ra khi do thiết lập mà không thực hiện được các hành động như tạo mới, cập nhật, xóa dữ liệu. |
| 105 | 403 | Dữ liệu không xóa được. |
| 106 | 403 | Scope khi xác thực API không đúng. Hãy xem lại giá trị scope. |
| 107 | 400 | Khi chỉ định id để lấy một dữ liệu cụ thể, giá trị đó không tồn tại. Hãy chỉ định id. |
| 108 | 401 | Access token khi xác thực API không đúng, hoặc đã hết hạn. Hãy xem lại access token. |
| 109 | 400 | Xảy ra khi tạo mới hoặc xóa dữ liệu mà request vượt quá số lượng làm được cùng lúc (chuẩn: 100). |
| 110 | 403 | Xảy ra khi cập nhật, v.v. với dữ liệu đã bị xóa. |
| 111 | 500 | Xảy ra khi thực thi plugin (API) mà plugin đã chỉ định không tồn tại. Hãy xem lại tên plugin. |
| 112 | 400 | Xảy ra ở API nhắm tới view, khi bảng và view không khớp nhau. |
| 113 | 400 | Xảy ra ở API nhắm tới view, khi chỉ định loại view không được hỗ trợ. |
| 201 | 403 | Xảy ra khi cập nhật, xóa, v.v. với dữ liệu đang bị khóa do trạng thái của quy trình làm việc. |
| 202 | 400 | Xảy ra khi thực thi API "giá trị thực thi hiện tại của quy trình làm việc" mà quy trình làm việc chưa được bắt đầu. |
| 203 | 400 | Xảy ra khi thực thi API "lấy danh sách người xử lý của một dữ liệu cụ thể" hoặc "lấy danh sách hành động tiếp theo thực thi được với một dữ liệu cụ thể" mà quy trình làm việc đã hoàn tất. |
| 204 | 400 | Xảy ra khi thực thi API "thực thi quy trình làm việc với một dữ liệu cụ thể" mà ID hành động đã chỉ định không thực thi được. |
| 205 | 400 | Xảy ra khi thực thi API "thực thi quy trình làm việc với một dữ liệu cụ thể" mà không tồn tại người xử lý tiếp theo. |
| 301 | 400 | Không thực thi được API do giới hạn IP. |
| 401 | 403 | Xảy ra ở API dành cho biểu mẫu công khai, khi bảng đối tượng không nằm trong biểu mẫu công khai. |
| 402 | 403 | Xảy ra khi định tạo mới dữ liệu thứ 2 trở đi cho bảng có thiết lập "Chỉ cho phép lưu một bản ghi". |

## Tài liệu tham chiếu WebAPI
Về tài liệu tham chiếu của API, vui lòng xem [API reference](https://exment.net/reference/ja/webapi.html).
