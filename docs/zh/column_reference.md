# 自定义列参考

## 前言
这是插件等定制中需要的、自定义列的内部规格。

- 自定义列的概要，请确认[自定义列](/zh/column)。
- 函数的整体概要，请确认[函数参考](/zh/func_reference)。


本参考中，按自定义列的类型记载以下内容。
- 数据库的类型　：　每种自定义列存放在数据库中的类型
- 值的获取　：　每种自定义列的 getValue 的返回值
- 值的设置　：　每种自定义列的 setValueStrictly，以及通过 API 设置的方法


## 每种自定义列存放在数据库中的类型 概要
说明从页面或 API 保存数据时，保存在数据库中的值。
※数据库中，所有自定义列的值都存放在 json 类型的列 "value" 中。这里说明在这个 json 类型的列 value 中，是以哪种类型存放的。


## 函数 getValue 的返回值 概要
要获取保存在数据中的值，使用函数 getValue。  

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// 获取“通知信息”表的 id1 的数据
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // 欢迎使用 Exment！
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // 普通 
```


要更改所获取的值的形式，在 getValue 的第 2 个参数中设置形式。  
getValue 返回的值，主要有以下 4 种。  

### pureValue
·和数据库中登记的值最接近的值。  
·在 getValue 的第 2 个参数中指定 "ValueType::PURE_VALUE" 时，以这种类型返回。  
·另外，[通过 API 获取数据](https://exment.net/reference/webapi.html)时，也以这个值获取。

※主要的使用位置：  
- [数据导出(普通)](/zh/data_import_export)
- [通过 API 获取数据](https://exment.net/reference/webapi.html)


### value
·和 pureValue 几乎相同的结果。但部分列类型会返回对象。  
·不指定 getValue 的第 2 个参数时、为 false 时，或者指定了 "ValueType::VALUE" 时，以这种类型返回。

※主要的使用位置：  
- 内部处理。


### text
·在页面或文件中作为文本(标题)输出时的字符串。  
·getValue 的第 2 个参数为 true 时，或者指定了 "ValueType::TEXT" 时，以这种类型返回。

※主要的使用位置：  
- [标题显示列](/zh/table)
- [数据导出(视图形式)](/zh/data_import_export)
- [参数变量](/zh/params)



### html
·在页面中作为 HTML 输出时的字符串、标签。  
·在 getValue 的第 2 个参数中指定 "ValueType::HTML" 时，以这种类型返回。

※主要的使用位置：  
- [数据列表](/zh/data_grid)
- [数据详情](/zh/data_details)
- [仪表板](/zh/dashboard)
- 其他在页面中显示的情况


## 用 setValueStrictly 设置的方法 概要
想给对象数据设置列的值时，使用函数 setValueStrictly。

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

////// 创建表 "foo" 的新数据用的对象
$value = CustomTable::getEloquent('foo')->getValueModel();
////// OR 获取表 "foo" 的 id1 的数据
//$value = CustomTable::getEloquent('foo')->getValueModel(1);

////// 设置值。 “自定义列名 => 值”的数组
$value->setValueStrictly(['value1' => '值1', 'value2' => 2]);
//更新并保存到数据库
$value->save();
```

如果不在 setValueStrictly 的数组中设置合适的值，就会发生 \Illuminate\Validation\ValidationException 错误(验证错误)。
这里按自定义列说明所设置的值的形式。


## 用 API 设置的方法 概要
记载了通过 [API](https://exment.net/reference/webapi.html) 发送值时，所设置的类型和形式。  


## 每种自定义列的规格详情

### text : 单行文本

#### 数据库的类型
string 类型

#### getValue - 获取数据时

- ##### pureValue,value,text,html
单行文本

#### setValueStrictly - 设置值时
以字符串形式设置

``` php
$value->setValueStrictly(['text' => '值1']);
```

#### API - 设置值时
以字符串形式设置

``` json
{
  "value":{
    "text": "值1" 
  }
}
```



### textarea : 多行文本

#### 数据库的类型
string 类型

#### getValue - 获取数据时

- ##### pureValue,value,text
多行文本

- ##### html
多行文本的 html 形式。但只有在数据列表页面中显示时，如果有 50 个字符以上，就显示到第 50 个字符，之后的部分替换为 "..."


#### setValueStrictly - 设置值时
以字符串形式设置。换行请设置换行符(\n、\r、\r\n 都可以)

``` php
$value->setValueStrictly(['textarea' => "这是值1。\n这是值2。\n这是值3。"]);
```

#### API - 设置值时
以字符串形式设置。换行请设置换行符(\n、\r、\r\n 都可以)

``` json
{
  "value":{
    "textarea": "这是值1。\n这是值2。\n这是值3。" 
  }
}
```

### editor : 文本编辑器

#### 数据库的类型
string 类型

#### getValue - 获取数据时

- ##### pureValue,value,text
文本编辑器

- ##### html
文本编辑器。但只有在数据列表页面中显示时，如果有 50 个字符以上，就在去掉标签之后显示到第 50 个字符，之后的部分替换为 "..."


#### setValueStrictly - 设置值时
以字符串形式设置。换行设置换行符(\n、\r、\r\n 都可以)

``` php
$value->setValueStrictly(['editor' => "这是值1。\n这是值2。\n这是值3。"]);
```

#### API - 设置值时
以字符串形式设置。换行请设置换行符(\n、\r、\r\n 都可以)

``` json
{
  "value":{
    "editor": "这是值1。\n这是值2。\n这是值3。" 
  }
}
```

### email : 电子邮件

#### 数据库的类型
string 类型

#### getValue - 获取数据时

- ##### pureValue,value,text,html
邮件地址

#### setValueStrictly - 设置值时
以字符串形式设置邮件地址

``` php
$value->setValueStrictly(['email' => 'foobar@foobar.kajitori.co.jp']);
```

#### API - 设置值时
以字符串形式设置邮件地址

``` json
{
  "value":{
    "email": "foobar@foobar.kajitori.co.jp" 
  }
}
```

### url :  URL

#### 数据库的类型
string 类型

#### getValue - 获取数据时

- ##### pureValue,value,text
URL 字符串

- ##### html
把链接目标设为 URL 字符串的 a 标签

#### setValueStrictly - 设置值时
以字符串形式设置 URL

``` php
$value->setValueStrictly(['url' => 'https://exment.net']);
```

#### API - 设置值时
以字符串形式设置 URL

``` json
{
  "value":{
    "url": "https://exment.net" 
  }
}
```

### integer : 整数

#### 数据库的类型
<span class="red">string 类型</span>  

> 按目前的规格，即使自定义列类型是“整数”，在数据库中也以 string 类型存放。


#### getValue - 获取数据时

- ##### pureValue,value
整数。不包含逗号。

- ##### text,html
整数。启用了“数值使用千位分隔符”选项时，包含逗号。

#### setValueStrictly - 设置值时
以整数类型、整数的字符串设置  
※即使包含逗号也可以设置。这时，保存到数据库时会自动去掉逗号。

``` php
// OK(1)
$value->setValueStrictly(['integer' => 1000]);
// OK(2)
$value->setValueStrictly(['integer' => '1000']);
// OK(3)
$value->setValueStrictly(['integer' => '1,000']);
```

#### API - 设置值时
以整数类型、整数的字符串设置  
※即使包含逗号也可以设置。这时，保存到数据库时会自动去掉逗号。

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


### decimal : 小数

#### 数据库的类型
<span class="red">string 类型</span>  

> 按目前的规格，即使自定义列类型是“小数”，在数据库中也以 string 类型存放。

#### getValue - 获取数据时

- ##### pureValue,value
小数。不包含逗号。

- ##### text,html
小数。启用了“数值使用千位分隔符”选项时，包含逗号。

#### setValueStrictly - 设置值时
以小数类型、小数的字符串设置  
※即使包含逗号也可以设置。这时，保存到数据库时会自动去掉逗号。

``` php
// OK(1)
$value->setValueStrictly(['decimal' => 1000.03]);
// OK(2)
$value->setValueStrictly(['decimal' => '1000.03']);
// OK(3)
$value->setValueStrictly(['decimal' => '1,000.03']);
```

#### API - 设置值时
以小数类型、小数的字符串设置  
※即使包含逗号也可以设置。这时，保存到数据库时会自动去掉逗号。

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

### currency : 货币

#### 数据库的类型
<span class="red">string 类型</span>  

> 按目前的规格，即使自定义列类型是“货币”，在数据库中也以 string 类型存放。

#### getValue - 获取数据时

- ##### pureValue,value
输入的金额。不包含逗号和货币单位。

- ##### text,html
输入的金额。启用了“数值使用千位分隔符”选项时，包含逗号。另外，包含所选的“货币显示格式”。

#### setValueStrictly - 设置值时
以数值类型、数值的字符串设置  
※即使包含逗号也可以设置。这时，保存到数据库时会自动去掉逗号。  
※目前不能包含货币单位来设置值。请在设置值之前去掉货币单位。

``` php
// OK(1)
$value->setValueStrictly(['currency' => 1000]);
// OK(2)
$value->setValueStrictly(['currency' => '1000']);
// OK(3)
$value->setValueStrictly(['currency' => '1,000']);
// NG
$value->setValueStrictly(['currency' => '1,000円']);
```

#### API - 设置值时
以数值类型、数值的字符串设置  
※即使包含逗号也可以设置。这时，保存到数据库时会自动去掉逗号。  
※目前不能包含货币单位来设置值。请在设置值之前去掉货币单位。

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
    "currency": "1,000円"
  }
}
```


### date : 日期

#### 数据库的类型
"2021-04-21" 形式的 string 类型

#### getValue - 获取数据时

- ##### pureValue,value
"yyyy-MM-dd" 形式的日期。  例： 2020-05-01

- ##### text,html
"yyyy-MM-dd" 形式的日期。  但如果指定了格式，就以该格式返回。


#### setValueStrictly - 设置值时
以日期字符串、Carbon 对象设置  
※日期字符串建议以 "yyyy-MM-dd" 形式设置。这里通过 Carbon 对象进行自动转换，目前没有确认过除此以外的形式的运行情况。

``` php
// OK(1)
$value->setValueStrictly(['date' => '2020-07-22']);
// OK(2)
$value->setValueStrictly(['date' => \Carbon\Carbon::now()]);
```

#### API - 设置值时
以日期字符串设置  
※日期字符串建议以 "yyyy-MM-dd" 形式设置。这里通过 Carbon 对象进行自动转换，目前没有确认过除此以外的形式的运行情况。

``` json
// OK
{
  "value":{
    "date": "2020-07-22"
  }
}
```

### time : 时间

#### 数据库的类型
"15:53:00" 形式的 string 类型

#### getValue - 获取数据时

- ##### pureValue,value
"HH:mm:ss" 形式的日期。  例： 21:31:00

- ##### text,html
"HH:mm:ss" 形式的日期。  

#### setValueStrictly - 设置值时
以时间字符串设置  
``` php
// OK(1)
$value->setValueStrictly(['time' => '08:00:00']);
// OK(2)
$value->setValueStrictly(['time' => '08:00']);
```

#### API - 设置值时
以时间字符串设置

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


### datetime : 日期和时间

#### 数据库的类型
"2021-04-21 12:24:00" 形式的 string 类型

#### getValue - 获取数据时

- ##### pureValue
"yyyy-MM-dd HH:mm:ss" 形式的日期。  例： 2020-05-01 21:31:00

- ##### value
Carbon 类型的对象

- ##### text,html
"yyyy-MM-dd HH:mm:ss" 形式的日期。  但如果指定了格式，就以该格式返回。


#### setValueStrictly - 设置值时
以日期时间字符串、Carbon 对象设置  
※日期时间字符串建议以 "yyyy-MM-dd HH:ii:ss" 形式设置。这里通过 Carbon 对象进行自动转换，目前没有确认过除此以外的形式的运行情况。

``` php
// OK(1)
$value->setValueStrictly(['datetime' => '2020-07-22 08:00:00']);
// OK(2)
$value->setValueStrictly(['datetime' => \Carbon\Carbon::now()]);
```

#### API - 设置值时
以日期时间字符串设置  
※日期时间字符串建议以 "yyyy-MM-dd HH:ii:ss" 形式设置。这里通过 Carbon 对象进行自动转换，目前没有确认过除此以外的形式的运行情况。

``` json
// OK
{
  "value":{
    "datetime": "2020-07-22 08:00:00"
  }
}
```

### select : 选项（固定值）

#### 数据库的类型
string 类型（可以多选时为 string 类型的数组）

#### getValue - 获取数据时

- ##### pureValue,value,text,html
选择的项目。


#### setValueStrictly - 设置值时
以选项的项目设置  

``` php
///// 选项设为“Orange”时
// OK
$value->setValueStrictly(['select' => 'Orange']);
```

※设置为允许多选时，以数组形式设置

``` php
// OK
$value->setValueStrictly(['selects' => ['Orange', 'Apple']]);
```

#### API - 设置值时
以选项的项目设置

``` json
// OK
{
  "value":{
    "select": "Orange"
  }
}
```

※设置为允许多选时，以数组形式设置

``` json
// OK
{
  "value":{
    "selects": ["Orange", "Apple"]
  }
}
```

### select_valtext : 选项（登记值和标签）

#### 数据库的类型
string 类型（可以多选时为 string 类型的数组）

#### getValue - 获取数据时

- ##### pureValue,value
所选项目的值。

- ##### text,html
所选项目的标签。

#### setValueStrictly - 设置值时
以选项的值或标签设置  

``` php
///// 选项的标签设为“Orange”、值设为“val1”时
// OK(1)
$value->setValueStrictly(['select_valtext' => 'val1']);
// OK(2)
$value->setValueStrictly(['select_valtext' => 'Orange']);
```

※设置为允许多选时，以数组形式设置

``` php
// OK
$value->setValueStrictly(['select_valtexts' => ['val1', 'val2']]);
```

#### API - 设置值时
以选项的值或标签设置  

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

※设置为允许多选时，以数组形式设置

``` json
// OK
{
  "value":{
    "select_valtexts": ["val1", "val2"]
  }
}
```

### select_table : 选项（从其他表中选择）

#### 数据库的类型
string 类型（可以多选时为 string 类型的数组）

#### getValue - 获取数据时

- ##### pureValue
所选数据的 id。

- ##### value
指定 id 的 CustomValue 对象。

- ##### text
指定 id 的 CustomValue 对象中设置的[标题显示列](/zh/table)的字符串。

- ##### html
用来以模态窗口打开指定 id 的数据的 a 标签。


#### setValueStrictly - 设置值时
把引用目标表的数据的 id 值，以整数类型或字符串设置  

``` php
// OK(1)
$value->setValueStrictly(['select_table' => 1]);
// OK(2)
$value->setValueStrictly(['select_table' => "3"]);
```

※设置为允许多选时，以数组形式设置

``` php
// OK
$value->setValueStrictly(['select_tables' => [1, 2, 3]]);
```

#### API - 设置值时
把引用目标表的数据的 id 值，以整数类型或字符串设置  

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

※设置为允许多选时，以数组形式设置

``` json
// OK
{
  "value":{
    "select_table2": ["3", "4", "6"]
  }
}
```

### user : 用户
和 select_table 相同。

### organization : 组织
和 select_table 相同。


### yesno : YES/NO

#### 数据库的类型
0 或 1 的 integer 类型

#### getValue - 获取数据时

- ##### pureValue,value
0(选择了 NO 时)或 1(选择了 YES 时)。

- ##### text,html
NO 或 YES。

#### setValueStrictly - 设置值时
设置 0,1,"0","1","YES","NO","yes","no",true,false 中的任意一个值

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

#### API - 设置值时
设置 0,1,"0","1","YES","NO","yes","no",true,false 中的任意一个值

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


### boolean : 二选一

#### 数据库的类型
string 类型

#### getValue - 获取数据时

- ##### pureValue,value
所选一侧的值。

- ##### text,html
所选一侧的显示标签。


#### setValueStrictly - 设置值时
设置在自定义列设置中登记的 2 个选项的值或标签的字符串

``` php
///// 选项 1 的标签设为“Orange”、值设为“val1”时
// OK(1)
$value->setValueStrictly(['boolean' => 'val1']);
// OK(2)
$value->setValueStrictly(['boolean' => 'Orange']);
```

#### API - 设置值时
设置在自定义列设置中登记的 2 个选项的值或标签的字符串

``` json
// OK
{
  "value":{
    "boolean": "val1"
  }
}
```

### file : 文件

#### 数据库的类型
string 类型（可以多选时为 string 类型的数组）

#### getValue - 获取数据时

- ##### pureValue,value
所保存文件的内部文件路径。

- ##### text
指向文件的链接的 URL。

- ##### html
指向文件的链接的 a 标签。标签的文字是上传的文件的文件名。


#### setValueStrictly - 设置值时
调整中


### image : 图片

#### 数据库的类型
string 类型（可以多选时为 string 类型的数组）

#### getValue - 获取数据时

- ##### pureValue,value
所保存文件的内部文件路径。

- ##### text
指向文件的链接的 URL。

- ##### html
指向文件的链接的 img 标签。

#### setValueStrictly - 设置值时
调整中
