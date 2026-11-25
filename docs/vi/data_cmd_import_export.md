# Nhập / xuất dữ liệu (bằng lệnh)
Trang này giải thích cách nhập và xuất dữ liệu của bảng bằng lệnh trên máy chủ.

| Việc muốn làm | Lệnh | Nơi xem |
|---|---|---|
| Xuất dữ liệu ra tệp | `php artisan exment:export` | "Xuất dữ liệu" |
| Xuất dữ liệu, chia theo số lượng đã định | `php artisan exment:chunkexport` | "Xuất dữ liệu (chế độ chunk)" |
| Nhập dữ liệu từ tệp | `php artisan exment:import` | "Nhập dữ liệu" |
| Đưa tệp cùng lúc vào cột "Hình ảnh" và "Tệp" | `php artisan exment:file-import` | "Nhập dữ liệu - nhập tệp đính kèm của cột hình ảnh và cột tệp" |
| Đưa cùng lúc tệp đính kèm (document) của dữ liệu | `php artisan exment:document-import` | "Nhập dữ liệu - danh sách document (tệp đính kèm)" |

> Về tổng quan của nhập và xuất dữ liệu, vui lòng xem [Nhập / xuất dữ liệu](/vi/data_import_export).

## Xuất dữ liệu
Xuất (export) dữ liệu của bảng ra tệp bằng lệnh.  
Định dạng tệp là csv hoặc xlsx.  


### Cách thao tác

- Chạy lệnh sau ở dòng lệnh.

~~~
php artisan exment:export (tên bảng)

# Ví dụ
php artisan exment:export information
~~~

- Khi chạy lệnh này, dữ liệu csv được xuất vào thư mục "(thư mục gốc của Exment)/storage/app/export/(ngày giờ thực hiện: yyyyMMddHHiiss)".

### Tham số của lệnh

```
php artisan exment:export (tên bảng) {--action=default} {--type=all} {--page=1} {--count=} {--format=csv} {--view=} {--dirpath=} {--add_setting=0} {--add_relation=0} {--add_comment=0}
```

- ##### Tên bảng  
(Bắt buộc) Tên bảng (chữ và số) cần xuất.

- ##### action  
(Tùy chọn) Cách thực hiện xuất.
    - default : Xuất tất cả các cột hệ thống và cột tùy chỉnh. Giá trị mặc định.
    - view : Xuất theo dạng của view đã chỉ định.

- ##### type  
(Tùy chọn) Loại (số lượng) dữ liệu cần xuất.
    - all : Tất cả dữ liệu. Giá trị mặc định.
    - page : Trang đã chỉ định.

- ##### page    
(Tùy chọn) Số trang, khi type là page. Số nguyên. Nếu không chỉ định, trang 1 được xuất.

- ##### count    
(Tùy chọn) Số dữ liệu tối đa cần xuất, khi type là page. Nếu không chỉ định, là số dữ liệu được chỉ định ở view đó.

- ##### format  
(Tùy chọn) Định dạng tệp cần xuất.
    - csv : Định dạng CSV. Giá trị mặc định.
    - xlsx : Định dạng Xlsx (Excel).

- ##### view  
(Tùy chọn) View cần xuất. Chỉ định bằng id hoặc suuid. Nếu không thiết lập, xuất bằng view toàn bộ dữ liệu.

- ##### dirpath  
(Tùy chọn) Đường dẫn thư mục để xuất. Đường dẫn đầy đủ. Nếu không thiết lập, là (thư mục gốc của Exment)/storage/app/export/(ngày giờ thực hiện: yyyyMMddHHiiss).

- ##### add_relation  
(Tùy chọn) Có xuất cả dữ liệu quan hệ hay không. Giá trị mặc định là 0 (không xuất). Chỉ có hiệu lực với định dạng Xlsx và khi action là default.

- ##### add_setting  
(Tùy chọn) Có xuất cả dữ liệu thiết lập hay không. Giá trị mặc định là 0 (không xuất). Chỉ có hiệu lực với định dạng Xlsx và khi action là default.

- ##### add_comment  
(Tùy chọn) Có xuất cả bình luận của từng dữ liệu hay không. Giá trị mặc định là 0 (không xuất). Khi chỉ định 1, bình luận được xuất vào sheet (với định dạng CSV là tệp) "comment". Chỉ có hiệu lực khi action là default và bảng có "Sử dụng bình luận" là YES trong thiết lập bảng tùy chỉnh.

~~~
# Ví dụ: xuất với định dạng Xlsx, gồm cả bình luận
php artisan exment:export information --format=xlsx --add_comment=1
~~~




<h2 id="export_chunk"><a href="#/vi/data_cmd_import_export?id=export_chunk" data-id="export_chunk" class="anchor"><span>Xuất dữ liệu (chế độ chunk)</span></a></h2>

Dữ liệu được chia và xuất theo số lượng đã định (giá trị mặc định: 1000 dữ liệu). Khi xuất lượng lớn dữ liệu, có thể giảm số dòng của 1 tệp.  


### Cách thao tác

- Chạy lệnh sau ở dòng lệnh.

~~~
php artisan exment:chunkexport (tên bảng)

# Ví dụ
php artisan exment:chunkexport information
~~~

- Khi chạy lệnh này, dữ liệu csv được xuất vào thư mục "(thư mục gốc của Exment)/storage/app/export/(ngày giờ thực hiện: yyyyMMddHHiiss)".


### Tham số của lệnh

```
php artisan exment:chunkexport (tên bảng) {--action=default} {--start=1} {--end=1000} {--count=1000} {--seqlength=1} {--delimiter=} {--format=csv} {--view=} {--dirpath=}
```

- ##### Tên bảng  
(Bắt buộc) Tên bảng (chữ và số) cần xuất.

- ##### action  
(Tùy chọn) Cách thực hiện xuất.
    - default : Xuất tất cả các cột hệ thống và cột tùy chỉnh. Giá trị mặc định.
    - view : Xuất theo dạng của view đã chỉ định.

- ##### start  
(Tùy chọn) Số thứ tự tệp bắt đầu xuất. Khi việc xuất bị kết thúc giữa chừng, cũng có thể tiếp tục xuất từ số thứ tự đã chỉ định. Nếu không chỉ định, là 1.

- ##### end  
(Tùy chọn) Số thứ tự tệp kết thúc xuất. Nếu không chỉ định, là 1000.

- ##### count    
(Tùy chọn) Số dữ liệu tối đa xuất vào 1 tệp. Nếu không chỉ định, là 1000.

- ##### seqlength    
(Tùy chọn) Số chữ số của số thứ tự khi thêm số 0 ở đầu. Ví dụ, khi nhập "3", số thứ tự được xuất như "001", "002". Nếu không chỉ định, là 1.

- ##### delimiter    
(Tùy chọn) Ký tự đặt giữa tên bảng và số thứ tự trong tên tệp. Nếu không chỉ định, là "." (dấu chấm).

- ##### format  
(Tùy chọn) Định dạng tệp cần xuất.
    - csv : Định dạng CSV. Giá trị mặc định.
    - xlsx : Định dạng Xlsx (Excel).

- ##### view  
(Tùy chọn) View cần xuất. Chỉ định bằng id hoặc suuid. Nếu không thiết lập, xuất bằng view toàn bộ dữ liệu.

- ##### dirpath  
(Tùy chọn) Đường dẫn thư mục để xuất. Đường dẫn đầy đủ. Nếu không thiết lập, là (thư mục gốc của Exment)/storage/app/export/(ngày giờ thực hiện: yyyyMMddHHiiss).



### Quy cách xuất

- Tên tệp được xuất với số thứ tự, như **"(tên của bảng tùy chỉnh).số thứ tự.csv"** (ví dụ: client.1.csv).

```
#Ví dụ
client.1.csv
client.2.csv
client.3.csv

#Ví dụ (khi chỉ định seqlength=3)
client.001.csv
client.002.csv
client.003.csv
```

- Bất kể số lượng dữ liệu và tùy chọn count, số tệp xuất được trong 1 lần chạy là tối đa 1000 tệp.



## Nhập dữ liệu
Đưa dữ liệu cùng lúc vào bảng tùy chỉnh, từ các tệp đặt trong thư mục đã định.

- Tệp dùng được là tệp EXCEL hoặc tệp csv có cùng định dạng với nhập từ màn hình.  
- Cũng đưa vào được dữ liệu vượt quá 5000 dữ liệu, là mức bị giới hạn trên màn hình.  

### Lưu ý
- Không nhập được tệp CSV đã nén định dạng ZIP.  

- Việc kiểm tra lỗi giống với nhập từ màn hình được thực hiện. Vì vậy, khi đưa lượng lớn dữ liệu vào, có thể mất rất nhiều thời gian.  

- Dữ liệu được nhập mỗi lần 100 dữ liệu. Ví dụ, sau khi 100 dữ liệu đầu được đăng ký đúng, nếu 100 dữ liệu tiếp theo có sai sót thì việc xử lý tệp dừng tại đó. 100 dữ liệu đã đăng ký không đưa về như cũ được. Hãy xóa bằng tay, hoặc bỏ các dữ liệu đã đăng ký khỏi tệp, v.v.  

- <span class="red">Kể cả khi nhập bằng lệnh, dữ liệu có số lượng rất lớn có thể bị lỗi do thiếu bộ nhớ.</span>  
Hiện đang được cải thiện. Khi nhập lượng lớn dữ liệu, hãy dùng [Nạp hàng loạt dữ liệu lớn](/vi/data_bulk_insert).

- Khi nhập bằng csv, hiện chỉ nhập được dữ liệu của bảng đó. Khi cần nhập cả dữ liệu quan hệ, hãy nhập bằng xlsx.


### Chuẩn bị dữ liệu
Trước tiên, tạo tệp dùng để nhập. Chi tiết vui lòng xem [Xuất mẫu](/vi/data_import_export?id=xuất-mẫu).  

- Mã ký tự của tệp csv nhập được là <strong>UTF-8</strong>.  

- Tên tệp hãy đặt theo một trong các dạng sau.  
※Các tệp trong thư mục được nhập theo thứ tự tên. Vì vậy, khi thứ tự nhập là quan trọng, ví dụ khi nhập cùng lúc các dữ liệu có quan hệ, hãy thêm số thứ tự theo thứ tự nhập bằng cách 3.

    1. "(tên của bảng tùy chỉnh).csv"    ※Ví dụ: client.csv
    2. "(tên của bảng tùy chỉnh).(số thứ tự).csv"   ※Ví dụ: client.1.csv, client.002.csv
    3. "(số thứ tự).(tên của bảng tùy chỉnh).csv"   ※Ví dụ: 01.client.csv, 02.estimate.csv

- <span class="small">Trước v3.8.0, cũng nhập được với tên tệp "<span class="bold">số thứ tự<span class="red">#</span>(tên của bảng tùy chỉnh).csv</span>".  
Ở v3.8.0, do [thay đổi thư viện dùng khi nhập](/ja/update/v3_8) (tiếng Nhật), không còn nhập được với tên tệp này.  
Khi thêm số thứ tự để nhập, hãy đổi sang dạng "<span class="bold">số thứ tự<span class="red">.</span>(tên của bảng tùy chỉnh).csv</span>" rồi nhập.</span>

### Cách thao tác

- Tạo thư mục làm việc ở vị trí sau trên máy chủ. Tên thư mục nên là tên cho biết nội dung công việc lần này, hoặc ngày tháng, v.v.  

~~~
(thư mục gốc của dự án)/storage/app/import/(tên thư mục)
~~~

- Đặt các tệp csv hoặc tệp EXCEL đã tạo (có thể nhiều tệp) vào thư mục đó.

#### Ví dụ bố trí thư mục
![Thư mục làm việc dùng để nạp hàng loạt](../ja/img/import/folder1.png)  

- Chạy lệnh sau ở dòng lệnh.
~~~
php artisan exment:import {tên thư mục}
~~~

#### Ví dụ chạy lệnh
![Ví dụ chạy lệnh](../ja/img/import/cmd1.png)  


### Sau khi chạy xong
- Sau khi nhập xong, hãy xóa các tệp đã đặt trong thư mục "storage/app/import" nếu cần. (※Không tự động xóa.)


<h2 id="import_file"><a href="#/vi/data_cmd_import_export?id=import_file" data-id="import_file" class="anchor"><span>Nhập dữ liệu - nhập tệp đính kèm của cột hình ảnh và cột tệp</span></a></h2>
Có thể đăng ký cùng lúc tệp đính kèm vào các cột có loại cột tùy chỉnh là "Hình ảnh" hoặc "Tệp". Đó là phần màn hình dưới đây.  

![Nhập tệp](../ja/img/import/file_import1.png)  

### Quy cách
- Khi nhập tệp đính kèm mới vào cột tùy chỉnh đã có tệp đính kèm, tệp trước sẽ bị xóa.


### Chuẩn bị dữ liệu nhập

- Tạo thư mục làm việc ở vị trí sau trên máy chủ. Tên thư mục nên là tên cho biết nội dung công việc lần này, hoặc ngày tháng, v.v.  

~~~
(thư mục gốc của dự án)/storage/app/file-import/(tên thư mục)
~~~

- Trong thư mục đã tạo, tạo thư mục "files".

- Đặt tất cả các tệp đính kèm muốn nhập vào thư mục "files".

### Ghi thông tin nhập
- Tạo tệp dùng để nhập. Hãy tải tệp dùng để nhập từ liên kết sau.  
    - [Định dạng xlsx](https://exment.net/downloads/template/file_import_ja.xlsx)
    - [Định dạng csv](https://exment.net/downloads/template/file_import_ja.csv)

- Mã ký tự của tệp csv nhập được là <strong>UTF-8</strong>.  

- Tên tệp hãy đặt theo một trong các dạng sau.  
※Các tệp trong thư mục được nhập theo thứ tự tên. Vì vậy, khi thứ tự nhập là quan trọng, ví dụ khi nhập cùng lúc các dữ liệu có quan hệ, hãy thêm số thứ tự theo thứ tự nhập bằng cách 3.

    1. "(tên của bảng tùy chỉnh).csv"    ※Ví dụ: client.csv
    2. "(tên của bảng tùy chỉnh).(số thứ tự).csv"   ※Ví dụ: client.1.csv, client.002.csv
    3. "(số thứ tự).(tên của bảng tùy chỉnh).csv"   ※Ví dụ: 01.client.csv, 02.estimate.csv

- Với xlsx, tên tệp tùy ý. Hãy đặt tên sheet theo dạng sau.  

    1. "(tên của bảng tùy chỉnh)"    ※Ví dụ: client

- Ghi giá trị vào sheet. Hãy ghi theo "Danh sách các mục nhập" ở dưới.

- Đặt tệp dùng để nhập đã tạo vào "(thư mục gốc của dự án)/storage/app/file-import/(tên thư mục)".

#### Danh sách các mục nhập

![Nhập tệp](../ja/img/import/file_import2.png)  

##### id(ID)  
ID của dữ liệu tùy chỉnh là nơi nhập tệp đính kèm. Là số nguyên dương, được tự động đánh số liên tiếp khi đăng ký dữ liệu.  

##### column_name (tên cột)  
Tên chữ và số của cột tùy chỉnh là nơi nhập tệp đính kèm. (Ví dụ: estimate_file, avatar)  

##### file_name (tên tệp đính kèm)  
Hãy ghi tên của tệp đính kèm đã đặt trong thư mục "files".

##### display_file_name (tên tệp đính kèm (hiển thị trên màn hình))  
Tên tệp khi hiển thị tệp đính kèm trên màn hình và khi tải xuống. ※Không ghi cũng được. Khi không ghi, giá trị của file_name là tên tệp khi tải xuống.

### Cấu trúc thư mục trước khi nhập
Cấu trúc thư mục khi nhập như sau.

```
(thư mục gốc của dự án)/storage/app/file-import/(tên thư mục)
    - Tệp dùng để nhập (ví dụ: client.csv)
    - files
        - Tệp nhập (ví dụ: tệp đính kèm 1.pdf)
        - Tệp nhập (ví dụ: tệp đính kèm 2.pdf)
        - Tệp nhập (ví dụ: tệp đính kèm 3.jpg)
```

### Cách thao tác

- Chạy lệnh sau ở dòng lệnh.
~~~
php artisan exment:file-import {tên thư mục}
~~~

### Sau khi chạy xong
- Khi chạy xong, các tệp đính kèm đã đặt trong thư mục "storage/app/file-import" được sao chép đến nơi có thể tải xuống từ ứng dụng.  
Hãy xóa các tệp đã đặt trong thư mục "storage/app/file-import" nếu cần. (※Không tự động xóa.)



<h2 id="import_document"><a href="#/vi/data_cmd_import_export?id=import_document" data-id="import_document" class="anchor"><span>Nhập dữ liệu - danh sách document (tệp đính kèm)</span></a></h2>
Có thể đăng ký cùng lúc các tệp vào document (tệp đính kèm) của dữ liệu tùy chỉnh. Đó là phần màn hình dưới đây.  

![Nhập tệp](../ja/img/import/document_import1.png)  

### Quy cách
- Có thể thêm nhiều tệp đính kèm vào cùng một dữ liệu tùy chỉnh. Kể cả khi đã có tệp đính kèm, tệp trước không bị xóa.


### Chuẩn bị dữ liệu nhập

- Tạo thư mục làm việc ở vị trí sau trên máy chủ. Tên thư mục nên là tên cho biết nội dung công việc lần này, hoặc ngày tháng, v.v.  

~~~
(thư mục gốc của dự án)/storage/app/document-import/(tên thư mục)
~~~

- Trong thư mục đã tạo, tạo thư mục "documents".

- Đặt tất cả các tệp đính kèm muốn nhập vào thư mục "documents".

### Ghi thông tin nhập
- Tạo tệp dùng để nhập. Hãy tải tệp dùng để nhập từ liên kết sau.  
    - [Định dạng xlsx](https://exment.net/downloads/template/document_import_ja.xlsx)
    - [Định dạng csv](https://exment.net/downloads/template/document_import_ja.csv)

- Mã ký tự của tệp csv nhập được là <strong>UTF-8</strong>.  

- Tên tệp hãy đặt theo một trong các dạng sau.  
※Các tệp trong thư mục được nhập theo thứ tự tên. Vì vậy, khi thứ tự nhập là quan trọng, ví dụ khi nhập cùng lúc các dữ liệu có quan hệ, hãy thêm số thứ tự theo thứ tự nhập bằng cách 3.

    1. "(tên của bảng tùy chỉnh).csv"    ※Ví dụ: client.csv
    2. "(tên của bảng tùy chỉnh).(số thứ tự).csv"   ※Ví dụ: client.1.csv, client.002.csv
    3. "(số thứ tự).(tên của bảng tùy chỉnh).csv"   ※Ví dụ: 01.client.csv, 02.estimate.csv

- Với xlsx, tên tệp tùy ý. Hãy đặt tên sheet theo dạng sau.  

    1. "(tên của bảng tùy chỉnh)"    ※Ví dụ: client

- Ghi giá trị vào sheet. Hãy ghi theo "Danh sách các mục nhập" ở dưới.

- Đặt tệp dùng để nhập đã tạo vào "(thư mục gốc của dự án)/storage/app/document-import/(tên thư mục)".

#### Danh sách các mục nhập

![Nhập tệp](../ja/img/import/document_import2.png)  

##### id(ID)  
ID của dữ liệu tùy chỉnh là nơi nhập tệp đính kèm. Là số nguyên dương, được tự động đánh số liên tiếp khi đăng ký dữ liệu.  

##### file_name (tên tệp đính kèm)  
Hãy ghi tên của tệp đính kèm đã đặt trong thư mục "documents".

##### display_file_name (tên tệp đính kèm (hiển thị trên màn hình))  
Tên tệp khi hiển thị tệp đính kèm trên màn hình và khi tải xuống. ※Không ghi cũng được. Khi không ghi, giá trị của file_name là tên tệp khi tải xuống.

### Cấu trúc thư mục trước khi nhập
Cấu trúc thư mục khi nhập như sau.

```
(thư mục gốc của dự án)/storage/app/document-import/(tên thư mục)
    - Tệp dùng để nhập (ví dụ: client.csv)
    - documents
        - Tệp nhập (ví dụ: tệp đính kèm 1.pdf)
        - Tệp nhập (ví dụ: tệp đính kèm 2.pdf)
        - Tệp nhập (ví dụ: tệp đính kèm 3.jpg)
```

### Cách thao tác

- Chạy lệnh sau ở dòng lệnh.
~~~
php artisan exment:document-import {tên thư mục}
~~~

### Sau khi chạy xong
- Khi chạy xong, các tệp đính kèm đã đặt trong thư mục "storage/app/document-import" được sao chép đến nơi có thể tải xuống từ ứng dụng.  
Hãy xóa các tệp đã đặt trong thư mục "storage/app/document-import" nếu cần. (※Không tự động xóa.)
