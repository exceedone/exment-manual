# Tài liệu tham khảo cột tùy chỉnh

## Mở đầu
Đây là đặc tả nội bộ của cột tùy chỉnh, cần khi tùy biến, ví dụ khi làm plugin.

- Tổng quan về cột tùy chỉnh, vui lòng xem [Cột tùy chỉnh](/vi/column).
- Tổng quan chung về các hàm, vui lòng xem [Tài liệu tham khảo hàm](/vi/func_reference).


Tài liệu tham khảo này ghi các nội dung sau cho từng loại cột tùy chỉnh.
- Kiểu trong cơ sở dữ liệu : kiểu được lưu trong cơ sở dữ liệu, theo từng cột tùy chỉnh
- Lấy giá trị : giá trị trả về của getValue, theo từng cột tùy chỉnh
- Đặt giá trị : cách đặt bằng setValueStrictly và bằng API, theo từng cột tùy chỉnh


## Kiểu được lưu trong cơ sở dữ liệu theo từng cột tùy chỉnh: tổng quan
Phần này giải thích giá trị được lưu trong cơ sở dữ liệu khi lưu dữ liệu từ màn hình hoặc API.
Lưu ý: trong cơ sở dữ liệu, giá trị của mọi cột tùy chỉnh được lưu trong cột "value" kiểu json. Ở đây giải thích giá trị được lưu bằng kiểu nào bên trong cột value kiểu json đó.


## Giá trị trả về của hàm getValue: tổng quan
Để lấy giá trị đã lưu trong dữ liệu, dùng hàm getValue.  

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// Lấy dữ liệu có id 1 của bảng thông báo
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Chào mừng đến với Exment!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // Bình thường 
```


Để đổi dạng của giá trị lấy về, đặt dạng vào tham số thứ 2 của getValue.  
Giá trị getValue trả về chủ yếu có 4 loại sau.  

### pureValue
- Giá trị gần nhất với giá trị được đăng ký trong cơ sở dữ liệu.  
- Được trả về theo kiểu này khi chỉ định "ValueType::PURE_VALUE" ở tham số thứ 2 của getValue.  
- Ngoài ra, khi [lấy dữ liệu bằng API](https://exment.net/reference/ja/webapi.html), dữ liệu cũng được lấy bằng giá trị này.

Nơi dùng chính:  
- [Xuất dữ liệu (thông thường)](/vi/data_import_export)
- [Lấy dữ liệu bằng API](https://exment.net/reference/ja/webapi.html)


### value
- Kết quả gần giống pureValue. Tuy nhiên, với một số loại cột thì trả về đối tượng.  
- Được trả về theo kiểu này khi không chỉ định tham số thứ 2 của getValue, khi là false, hoặc khi chỉ định "ValueType::VALUE".

Nơi dùng chính:  
- Xử lý nội bộ.


### text
- Chuỗi khi xuất ra màn hình hoặc tệp dưới dạng văn bản (tiêu đề).  
- Được trả về theo kiểu này khi tham số thứ 2 của getValue là true, hoặc khi chỉ định "ValueType::TEXT".

Nơi dùng chính:  
- [Cột hiển thị tiêu đề](/vi/table?id=thiết-lập-cột-hiển-thị-tiêu-đề)
- [Xuất dữ liệu (dạng chế độ xem)](/vi/data_import_export)
- [Biến tham số](/vi/params)



### html
- Chuỗi, thẻ khi xuất ra màn hình dưới dạng HTML.  
- Được trả về theo kiểu này khi chỉ định "ValueType::HTML" ở tham số thứ 2 của getValue.

Nơi dùng chính:  
- [Danh sách dữ liệu](/vi/data_grid)
- [Chi tiết dữ liệu](/vi/data_details)
- [Dashboard](/vi/dashboard)
- Ngoài ra, khi hiển thị trên màn hình


## Cách đặt bằng setValueStrictly: tổng quan
Khi muốn đặt giá trị của cột vào dữ liệu đối tượng, dùng hàm setValueStrictly.

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

////// Tạo đối tượng cho dữ liệu mới của bảng "foo"
$value = CustomTable::getEloquent('foo')->getValueModel();
////// HOẶC lấy dữ liệu có id 1 của bảng "foo"
//$value = CustomTable::getEloquent('foo')->getValueModel(1);

////// Đặt giá trị. Mảng "tên cột tùy chỉnh => giá trị"
$value->setValueStrictly(['value1' => 'giá trị 1', 'value2' => 2]);
// Cập nhật và lưu vào cơ sở dữ liệu
$value->save();
```

Nếu không đặt giá trị phù hợp vào mảng của setValueStrictly, lỗi \Illuminate\Validation\ValidationException (lỗi validation) sẽ xảy ra.
Ở đây giải thích dạng của giá trị cần đặt, theo từng cột tùy chỉnh.


## Cách đặt bằng API: tổng quan
Phần này ghi về kiểu và dạng cần đặt khi gửi giá trị bằng [API](https://exment.net/reference/ja/webapi.html).  


## Đặc tả chi tiết theo từng cột tùy chỉnh

### text : Văn bản một dòng

#### Kiểu trong cơ sở dữ liệu
Kiểu string

#### getValue - khi lấy dữ liệu

- ##### pureValue,value,text,html
Văn bản một dòng

#### setValueStrictly - khi đặt giá trị
Đặt theo dạng chuỗi

``` php
$value->setValueStrictly(['text' => 'giá trị 1']);
```

#### API - khi đặt giá trị
Đặt theo dạng chuỗi

``` json
{
  "value":{
    "text": "giá trị 1" 
  }
}
```



### textarea : Văn bản nhiều dòng

#### Kiểu trong cơ sở dữ liệu
Kiểu string

#### getValue - khi lấy dữ liệu

- ##### pureValue,value,text
Văn bản nhiều dòng

- ##### html
Văn bản nhiều dòng ở dạng html. Tuy nhiên, chỉ khi hiển thị trên màn hình danh sách dữ liệu, nếu từ 50 ký tự trở lên thì hiển thị đến 50 ký tự và thay phần sau đó bằng "..."


#### setValueStrictly - khi đặt giá trị
Đặt theo dạng chuỗi. Chỗ xuống dòng phải đặt mã xuống dòng (\n, \r, \r\n đều được)

``` php
$value->setValueStrictly(['textarea' => "Đây là giá trị 1.\nĐây là giá trị 2.\nĐây là giá trị 3."]);
```

#### API - khi đặt giá trị
Đặt theo dạng chuỗi. Chỗ xuống dòng phải đặt mã xuống dòng (\n, \r, \r\n đều được)

``` json
{
  "value":{
    "textarea": "Đây là giá trị 1.\nĐây là giá trị 2.\nĐây là giá trị 3." 
  }
}
```

### editor : Trình soạn thảo văn bản

#### Kiểu trong cơ sở dữ liệu
Kiểu string

#### getValue - khi lấy dữ liệu

- ##### pureValue,value,text
Trình soạn thảo văn bản

- ##### html
Trình soạn thảo văn bản. Tuy nhiên, chỉ khi hiển thị trên màn hình danh sách dữ liệu, nếu từ 50 ký tự trở lên thì bỏ các thẻ rồi hiển thị đến 50 ký tự và thay phần sau đó bằng "..."


#### setValueStrictly - khi đặt giá trị
Đặt theo dạng chuỗi. Chỗ xuống dòng đặt mã xuống dòng (\n, \r, \r\n đều được)

``` php
$value->setValueStrictly(['editor' => "Đây là giá trị 1.\nĐây là giá trị 2.\nĐây là giá trị 3."]);
```

#### API - khi đặt giá trị
Đặt theo dạng chuỗi. Chỗ xuống dòng phải đặt mã xuống dòng (\n, \r, \r\n đều được)

``` json
{
  "value":{
    "editor": "Đây là giá trị 1.\nĐây là giá trị 2.\nĐây là giá trị 3." 
  }
}
```

### email : Email

#### Kiểu trong cơ sở dữ liệu
Kiểu string

#### getValue - khi lấy dữ liệu

- ##### pureValue,value,text,html
Địa chỉ email

#### setValueStrictly - khi đặt giá trị
Đặt địa chỉ email theo dạng chuỗi

``` php
$value->setValueStrictly(['email' => 'foobar@foobar.kajitori.co.jp']);
```

#### API - khi đặt giá trị
Đặt địa chỉ email theo dạng chuỗi

``` json
{
  "value":{
    "email": "foobar@foobar.kajitori.co.jp" 
  }
}
```

### url :  URL

#### Kiểu trong cơ sở dữ liệu
Kiểu string

#### getValue - khi lấy dữ liệu

- ##### pureValue,value,text
Chuỗi URL

- ##### html
Thẻ a có đích liên kết là chuỗi URL

#### setValueStrictly - khi đặt giá trị
Đặt URL theo dạng chuỗi

``` php
$value->setValueStrictly(['url' => 'https://exment.net']);
```

#### API - khi đặt giá trị
Đặt URL theo dạng chuỗi

``` json
{
  "value":{
    "url": "https://exment.net" 
  }
}
```

### integer : Số nguyên

#### Kiểu trong cơ sở dữ liệu
<span class="red">Kiểu string</span>  

> Theo đặc tả hiện tại, dù loại cột tùy chỉnh là "Số nguyên", trong cơ sở dữ liệu giá trị vẫn được lưu bằng kiểu string.


#### getValue - khi lấy dữ liệu

- ##### pureValue,value
Số nguyên. Không có dấu phẩy.

- ##### text,html
Số nguyên. Nếu đã bật tùy chọn "Hiển thị số có dấu phân cách hàng nghìn" thì có dấu phẩy.

#### setValueStrictly - khi đặt giá trị
Đặt bằng kiểu số nguyên hoặc chuỗi số nguyên  
Lưu ý: có dấu phẩy vẫn đặt được. Khi đó, dấu phẩy được tự động bỏ đi lúc lưu vào cơ sở dữ liệu.

``` php
// OK(1)
$value->setValueStrictly(['integer' => 1000]);
// OK(2)
$value->setValueStrictly(['integer' => '1000']);
// OK(3)
$value->setValueStrictly(['integer' => '1,000']);
```

#### API - khi đặt giá trị
Đặt bằng kiểu số nguyên hoặc chuỗi số nguyên  
Lưu ý: có dấu phẩy vẫn đặt được. Khi đó, dấu phẩy được tự động bỏ đi lúc lưu vào cơ sở dữ liệu.

``` json
// OK(1)
{
  "value":{
    "integer": 1000
  }
}
// OK(2)
{
  "value":{
    "integer": "1000"
  }
}
// OK(3)
{
  "value":{
    "integer": "1,000"
  }
}
```


### decimal : Số thập phân

#### Kiểu trong cơ sở dữ liệu
<span class="red">Kiểu string</span>  

> Theo đặc tả hiện tại, dù loại cột tùy chỉnh là "Số thập phân", trong cơ sở dữ liệu giá trị vẫn được lưu bằng kiểu string.

#### getValue - khi lấy dữ liệu

- ##### pureValue,value
Số thập phân. Không có dấu phẩy.

- ##### text,html
Số thập phân. Nếu đã bật tùy chọn "Hiển thị số có dấu phân cách hàng nghìn" thì có dấu phẩy.

#### setValueStrictly - khi đặt giá trị
Đặt bằng kiểu số thập phân hoặc chuỗi số thập phân  
Lưu ý: có dấu phẩy vẫn đặt được. Khi đó, dấu phẩy được tự động bỏ đi lúc lưu vào cơ sở dữ liệu.

``` php
// OK(1)
$value->setValueStrictly(['decimal' => 1000.03]);
// OK(2)
$value->setValueStrictly(['decimal' => '1000.03']);
// OK(3)
$value->setValueStrictly(['decimal' => '1,000.03']);
```

#### API - khi đặt giá trị
Đặt bằng kiểu số thập phân hoặc chuỗi số thập phân  
Lưu ý: có dấu phẩy vẫn đặt được. Khi đó, dấu phẩy được tự động bỏ đi lúc lưu vào cơ sở dữ liệu.

``` json
// OK(1)
{
  "value":{
    "decimal": 1000.03
  }
}
// OK(2)
{
  "value":{
    "decimal": "1000.03"
  }
}
// OK(3)
{
  "value":{
    "decimal": "1,000.03"
  }
}
```

### currency : Tiền tệ

#### Kiểu trong cơ sở dữ liệu
<span class="red">Kiểu string</span>  

> Theo đặc tả hiện tại, dù loại cột tùy chỉnh là "Tiền tệ", trong cơ sở dữ liệu giá trị vẫn được lưu bằng kiểu string.

#### getValue - khi lấy dữ liệu

- ##### pureValue,value
Số tiền đã nhập. Không có dấu phẩy và đơn vị tiền tệ.

- ##### text,html
Số tiền đã nhập. Nếu đã bật tùy chọn "Hiển thị số có dấu phân cách hàng nghìn" thì có dấu phẩy. Ngoài ra, có kèm "Định dạng tiền tệ" đã chọn.

#### setValueStrictly - khi đặt giá trị
Đặt bằng kiểu số hoặc chuỗi số  
Lưu ý: có dấu phẩy vẫn đặt được. Khi đó, dấu phẩy được tự động bỏ đi lúc lưu vào cơ sở dữ liệu.  
Lưu ý: hiện không thể đặt giá trị có kèm đơn vị tiền tệ. Vui lòng bỏ đơn vị tiền tệ trước khi đặt giá trị.

``` php
// OK(1)
$value->setValueStrictly(['currency' => 1000]);
// OK(2)
$value->setValueStrictly(['currency' => '1000']);
// OK(3)
$value->setValueStrictly(['currency' => '1,000']);
// NG
$value->setValueStrictly(['currency' => '1,000 yên']);
```

#### API - khi đặt giá trị
Đặt bằng kiểu số hoặc chuỗi số  
Lưu ý: có dấu phẩy vẫn đặt được. Khi đó, dấu phẩy được tự động bỏ đi lúc lưu vào cơ sở dữ liệu.  
Lưu ý: hiện không thể đặt giá trị có kèm đơn vị tiền tệ. Vui lòng bỏ đơn vị tiền tệ trước khi đặt giá trị.

``` json
// OK(1)
{
  "value":{
    "currency": 1000
  }
}
// OK(2)
{
  "value":{
    "currency": "1000"
  }
}
// OK(3)
{
  "value":{
    "currency": "1,000"
  }
}
// NG
{
  "value":{
    "currency": "1,000 yên"
  }
}
```


### date : Ngày

#### Kiểu trong cơ sở dữ liệu
Kiểu string có dạng "2021-04-21"

#### getValue - khi lấy dữ liệu

- ##### pureValue,value
Ngày có dạng "yyyy-MM-dd".  Ví dụ: 2020-05-01

- ##### text,html
Ngày có dạng "yyyy-MM-dd".  Tuy nhiên, nếu đã chỉ định định dạng thì trả về theo định dạng đó.


#### setValueStrictly - khi đặt giá trị
Đặt bằng chuỗi ngày hoặc đối tượng Carbon  
Lưu ý: nên đặt chuỗi ngày theo dạng "yyyy-MM-dd". Giá trị được chuyển đổi tự động bằng đối tượng Carbon, và hiện chưa kiểm tra hoạt động với các dạng khác dạng trên.

``` php
// OK(1)
$value->setValueStrictly(['date' => '2020-07-22']);
// OK(2)
$value->setValueStrictly(['date' => \Carbon\Carbon::now()]);
```

#### API - khi đặt giá trị
Đặt bằng chuỗi ngày  
Lưu ý: nên đặt chuỗi ngày theo dạng "yyyy-MM-dd". Giá trị được chuyển đổi tự động bằng đối tượng Carbon, và hiện chưa kiểm tra hoạt động với các dạng khác dạng trên.

``` json
// OK
{
  "value":{
    "date": "2020-07-22"
  }
}
```

### time : Giờ

#### Kiểu trong cơ sở dữ liệu
Kiểu string có dạng "15:53:00"

#### getValue - khi lấy dữ liệu

- ##### pureValue,value
Ngày có dạng "HH:mm:ss".  Ví dụ: 21:31:00

- ##### text,html
Ngày có dạng "HH:mm:ss".  

#### setValueStrictly - khi đặt giá trị
Đặt bằng chuỗi giờ  
``` php
// OK(1)
$value->setValueStrictly(['time' => '08:00:00']);
// OK(2)
$value->setValueStrictly(['time' => '08:00']);
```

#### API - khi đặt giá trị
Đặt bằng chuỗi giờ

``` json
// OK(1)
{
  "value":{
    "time": "08:00:00"
  }
}
// OK(2)
{
  "value":{
    "time": "08:00"
  }
}
```


### datetime : Ngày và giờ

#### Kiểu trong cơ sở dữ liệu
Kiểu string có dạng "2021-04-21 12:24:00"

#### getValue - khi lấy dữ liệu

- ##### pureValue
Ngày có dạng "yyyy-MM-dd HH:mm:ss".  Ví dụ: 2020-05-01 21:31:00

- ##### value
Đối tượng kiểu Carbon

- ##### text,html
Ngày có dạng "yyyy-MM-dd HH:mm:ss".  Tuy nhiên, nếu đã chỉ định định dạng thì trả về theo định dạng đó.


#### setValueStrictly - khi đặt giá trị
Đặt bằng chuỗi ngày giờ hoặc đối tượng Carbon  
Lưu ý: nên đặt chuỗi ngày giờ theo dạng "yyyy-MM-dd HH:ii:ss". Giá trị được chuyển đổi tự động bằng đối tượng Carbon, và hiện chưa kiểm tra hoạt động với các dạng khác dạng trên.

``` php
// OK(1)
$value->setValueStrictly(['datetime' => '2020-07-22 08:00:00']);
// OK(2)
$value->setValueStrictly(['datetime' => \Carbon\Carbon::now()]);
```

#### API - khi đặt giá trị
Đặt bằng chuỗi ngày giờ  
Lưu ý: nên đặt chuỗi ngày giờ theo dạng "yyyy-MM-dd HH:ii:ss". Giá trị được chuyển đổi tự động bằng đối tượng Carbon, và hiện chưa kiểm tra hoạt động với các dạng khác dạng trên.

``` json
// OK
{
  "value":{
    "datetime": "2020-07-22 08:00:00"
  }
}
```

### select : Lựa chọn (giá trị cố định)

#### Kiểu trong cơ sở dữ liệu
Kiểu string (khi cho phép chọn nhiều thì là mảng kiểu string)

#### getValue - khi lấy dữ liệu

- ##### pureValue,value,text,html
Mục đã chọn.


#### setValueStrictly - khi đặt giá trị
Đặt bằng mục của lựa chọn  

``` php
///// Khi lựa chọn là "Orange"
// OK
$value->setValueStrictly(['select' => 'Orange']);
```

Lưu ý: khi cài đặt cho phép chọn nhiều, đặt theo dạng mảng

``` php
// OK
$value->setValueStrictly(['selects' => ['Orange', 'Apple']]);
```

#### API - khi đặt giá trị
Đặt bằng mục của lựa chọn

``` json
// OK
{
  "value":{
    "select": "Orange"
  }
}
```

Lưu ý: khi cài đặt cho phép chọn nhiều, đặt theo dạng mảng

``` json
// OK
{
  "value":{
    "selects": ["Orange", "Apple"]
  }
}
```

### select_valtext : Lựa chọn (lưu giá trị và nhãn)

#### Kiểu trong cơ sở dữ liệu
Kiểu string (khi cho phép chọn nhiều thì là mảng kiểu string)

#### getValue - khi lấy dữ liệu

- ##### pureValue,value
Giá trị của mục đã chọn.

- ##### text,html
Nhãn của mục đã chọn.

#### setValueStrictly - khi đặt giá trị
Đặt bằng giá trị hoặc nhãn của lựa chọn  

``` php
///// Khi nhãn của lựa chọn là "Orange", giá trị là "val1"
// OK(1)
$value->setValueStrictly(['select_valtext' => 'val1']);
// OK(2)
$value->setValueStrictly(['select_valtext' => 'Orange']);
```

Lưu ý: khi cài đặt cho phép chọn nhiều, đặt theo dạng mảng

``` php
// OK
$value->setValueStrictly(['select_valtexts' => ['val1', 'val2']]);
```

#### API - khi đặt giá trị
Đặt bằng giá trị hoặc nhãn của lựa chọn  

``` json
// OK(1)
{
  "value":{
    "select_valtext": "val1"
  }
}
// OK(2)
{
  "value":{
    "select_valtext": "Orange"
  }
}
```

Lưu ý: khi cài đặt cho phép chọn nhiều, đặt theo dạng mảng

``` json
// OK
{
  "value":{
    "select_valtexts": ["val1", "val2"]
  }
}
```

### select_table : Lựa chọn (từ bảng khác)

#### Kiểu trong cơ sở dữ liệu
Kiểu string (khi cho phép chọn nhiều thì là mảng kiểu string)

#### getValue - khi lấy dữ liệu

- ##### pureValue
id của dữ liệu đã chọn.

- ##### value
Đối tượng CustomValue của id đã chỉ định.

- ##### text
Chuỗi của [cột hiển thị tiêu đề](/vi/table?id=thiết-lập-cột-hiển-thị-tiêu-đề) được đặt trong đối tượng CustomValue của id đã chỉ định.

- ##### html
Thẻ a để mở dữ liệu của id đã chỉ định trong modal.


#### setValueStrictly - khi đặt giá trị
Đặt giá trị id của dữ liệu trong bảng được tham chiếu, bằng kiểu số nguyên hoặc chuỗi  

``` php
// OK(1)
$value->setValueStrictly(['select_table' => 1]);
// OK(2)
$value->setValueStrictly(['select_table' => "3"]);
```

Lưu ý: khi cài đặt cho phép chọn nhiều, đặt theo dạng mảng

``` php
// OK
$value->setValueStrictly(['select_tables' => [1, 2, 3]]);
```

#### API - khi đặt giá trị
Đặt giá trị id của dữ liệu trong bảng được tham chiếu, bằng kiểu số nguyên hoặc chuỗi  

``` json
// OK(1)
{
  "value":{
    "select_table": 1
  }
}
// OK(2)
{
  "value":{
    "select_table": "3"
  }
}
```

Lưu ý: khi cài đặt cho phép chọn nhiều, đặt theo dạng mảng

``` json
// OK
{
  "value":{
    "select_table2": ["3", "4", "6"]
  }
}
```

### user : Người dùng
Giống với select_table.

### organization : Tổ chức
Giống với select_table.


### yesno : YES/NO

#### Kiểu trong cơ sở dữ liệu
Kiểu integer, là 0 hoặc 1

#### getValue - khi lấy dữ liệu

- ##### pureValue,value
0 (khi chọn NO) hoặc 1 (khi chọn YES).

- ##### text,html
NO hoặc YES.

#### setValueStrictly - khi đặt giá trị
Đặt một trong các giá trị 0,1,"0","1","YES","NO","yes","no",true,false

``` php
// OK(1)
$value->setValueStrictly(['yesno' => 1]);
// OK(2)
$value->setValueStrictly(['yesno' => "0"]);
// OK(3)
$value->setValueStrictly(['yesno' => "YES"]);
// OK(4)
$value->setValueStrictly(['yesno' => "no"]);;
// OK(5)
$value->setValueStrictly(['yesno' => false]);
```

#### API - khi đặt giá trị
Đặt một trong các giá trị 0,1,"0","1","YES","NO","yes","no",true,false

``` json
// OK(1)
{
  "value":{
    "yesno": 1
  }
}
// OK(2)
{
  "value":{
    "yesno": false
  }
}
```


### boolean : Lựa chọn 2 giá trị

#### Kiểu trong cơ sở dữ liệu
Kiểu string

#### getValue - khi lấy dữ liệu

- ##### pureValue,value
Giá trị của bên đã chọn.

- ##### text,html
Nhãn hiển thị của bên đã chọn.


#### setValueStrictly - khi đặt giá trị
Đặt chuỗi giá trị hoặc nhãn của 2 lựa chọn đã đăng ký trong cài đặt cột tùy chỉnh

``` php
///// Khi nhãn của lựa chọn 1 là "Orange", giá trị là "val1"
// OK(1)
$value->setValueStrictly(['boolean' => 'val1']);
// OK(2)
$value->setValueStrictly(['boolean' => 'Orange']);
```

#### API - khi đặt giá trị
Đặt chuỗi giá trị hoặc nhãn của 2 lựa chọn đã đăng ký trong cài đặt cột tùy chỉnh

``` json
// OK
{
  "value":{
    "boolean": "val1"
  }
}
```

### file : Tệp

#### Kiểu trong cơ sở dữ liệu
Kiểu string (khi cho phép chọn nhiều thì là mảng kiểu string)

#### getValue - khi lấy dữ liệu

- ##### pureValue,value
Đường dẫn tệp nội bộ của tệp đang lưu.

- ##### text
URL của liên kết đến tệp.

- ##### html
Thẻ a của liên kết đến tệp. Nhãn của thẻ là tên tệp của tệp đã tải lên.


#### setValueStrictly - khi đặt giá trị
Đang điều chỉnh


### image : Hình ảnh

#### Kiểu trong cơ sở dữ liệu
Kiểu string (khi cho phép chọn nhiều thì là mảng kiểu string)

#### getValue - khi lấy dữ liệu

- ##### pureValue,value
Đường dẫn tệp nội bộ của tệp đang lưu.

- ##### text
URL của liên kết đến tệp.

- ##### html
Thẻ img của liên kết đến tệp.

#### setValueStrictly - khi đặt giá trị
Đang điều chỉnh
