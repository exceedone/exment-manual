# 사용자 정의 열 레퍼런스

## 시작하기 전에
플러그인 등의 커스터마이즈에서 필요한, 사용자 정의 열의 내부 사양입니다.

- 사용자 정의 열의 개요는 [사용자 정의 열](/ko/column)을 확인해 주십시오.
- 함수의 전체적인 개요는 [함수 레퍼런스](/ko/func_reference)를 확인해 주십시오.


이 레퍼런스에서는 사용자 정의 열의 종류별로 아래의 내용을 적습니다.
- 데이터베이스의 형　:　사용자 정의 열별로, 데이터베이스에 저장되는 형
- 값 가져오기　:　사용자 정의 열별 getValue의 반환값
- 값 설정　:　사용자 정의 열별 setValueStrictly 및 API로 설정하는 방법


## 사용자 정의 열별로, 데이터베이스에 저장되는 형 개요
화면이나 API에서 데이터를 저장했을 때, 데이터베이스에 저장되는 값을 설명합니다.
※데이터베이스에서는 모든 사용자 정의 열의 값을 json형의 열 "value"에 저장합니다. 여기서는 그 json형의 열 value 안에 어떤 형으로 저장되는지를 설명합니다.


## 함수 getValue의 반환값 개요
데이터에 저장된 값을 가져오려면 함수 getValue를 사용합니다.  

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// 공지사항 테이블의 id 1인 데이터를 가져오기
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Exment에 오신 것을 환영합니다!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // 보통 
```


가져오는 값의 형식을 바꾸려면 getValue의 두 번째 인수에 형식을 지정합니다.  
getValue로 반환되는 값은 주로 아래의 4종류입니다.  

### pureValue
- 데이터베이스에 등록되어 있는 값에 가장 가까운 값.  
- getValue의 두 번째 인수로 "ValueType::PURE_VALUE"를 지정한 경우에 이 형으로 반환된다.  
- 또한 [API로 데이터 가져오기](https://exment.net/reference/webapi.html)를 한 경우에도 이 값으로 가져온다.

※주로 쓰이는 곳:  
- [데이터 내보내기(보통)](/ko/data_import_export)
- [API로 데이터 가져오기](https://exment.net/reference/webapi.html)


### value
- pureValue와 거의 같은 결과. 다만 일부 열 종류에서는 객체를 반환한다.  
- getValue의 두 번째 인수를 지정하지 않은 경우, false인 경우, 또는 "ValueType::VALUE"를 지정한 경우에 이 형으로 반환된다.

※주로 쓰이는 곳:  
- 내부 처리.


### text
- 화면이나 파일에 텍스트(제목)로 출력하는 경우의 문자열.  
- getValue의 두 번째 인수가 true인 경우, 또는 "ValueType::TEXT"를 지정한 경우에 이 형으로 반환된다.

※주로 쓰이는 곳:  
- [제목 표시 열](/ko/table)
- [데이터 내보내기(뷰 형식)](/ko/data_import_export)
- [매개변수 변수](/ko/params)



### html
- 화면에 HTML로 출력하는 경우의 문자열, 태그.  
- getValue의 두 번째 인수로 "ValueType::HTML"을 지정한 경우에 이 형으로 반환된다.

※주로 쓰이는 곳:  
- [데이터 목록](/ko/data_grid)
- [데이터 상세](/ko/data_details)
- [대시보드](/ko/dashboard)
- 그 밖에 화면에 표시하는 경우


## setValueStrictly로 설정하는 방법 개요
대상 데이터에 열의 값을 설정하려면 함수 setValueStrictly를 사용합니다.

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

////// 테이블 "foo"의 새 데이터용 객체를 만들기
$value = CustomTable::getEloquent('foo')->getValueModel();
////// OR 테이블 "foo"의 id 1인 데이터를 가져오기
//$value = CustomTable::getEloquent('foo')->getValueModel(1);

////// 값 설정. "사용자 정의 열 이름 => 값"의 배열
$value->setValueStrictly(['value1' => '값1', 'value2' => 2]);
//갱신하여 데이터베이스에 저장
$value->save();
```

setValueStrictly의 배열에 알맞은 값을 설정하지 않으면 \Illuminate\Validation\ValidationException 오류(유효성 검사 오류)가 발생합니다.
여기서는 사용자 정의 열별로, 설정하는 값의 형식을 설명합니다.


## API로 설정하는 방법 개요
[API](https://exment.net/reference/webapi.html)로 값을 보내는 경우에 설정하는 형이나 형식에 대해 적었습니다.  


## 사용자 정의 열별 사양 상세

### text : 한 줄 텍스트

#### 데이터베이스의 형
string형

#### getValue - 데이터를 가져올 때

- ##### pureValue,value,text,html
한 줄 텍스트

#### setValueStrictly - 값을 설정할 때
문자열 형식으로 설정

``` php
$value->setValueStrictly(['text' => '값1']);
```

#### API - 값을 설정할 때
문자열 형식으로 설정

``` json
{
  "value":{
    "text": "값1" 
  }
}
```



### textarea : 여러 줄 텍스트

#### 데이터베이스의 형
string형

#### getValue - 데이터를 가져올 때

- ##### pureValue,value,text
여러 줄 텍스트

- ##### html
여러 줄 텍스트의 html 형식. 다만 데이터 목록 화면에 표시할 때만, 50자 이상이면 50자까지 표시하고 그 뒤를 "..."로 바꾼다


#### setValueStrictly - 값을 설정할 때
문자열 형식으로 설정. 줄 바꿈은 줄 바꿈 코드를 설정할 것(\n, \r, \r\n 모두 가능)

``` php
$value->setValueStrictly(['textarea' => "값1입니다.\n값2입니다.\n값3입니다."]);
```

#### API - 값을 설정할 때
문자열 형식으로 설정. 줄 바꿈은 줄 바꿈 코드를 설정할 것(\n, \r, \r\n 모두 가능)

``` json
{
  "value":{
    "textarea": "값1입니다.\n값2입니다.\n값3입니다." 
  }
}
```

### editor : 텍스트 편집기

#### 데이터베이스의 형
string형

#### getValue - 데이터를 가져올 때

- ##### pureValue,value,text
텍스트 편집기

- ##### html
텍스트 편집기. 다만 데이터 목록 화면에 표시할 때만, 50자 이상이면 태그를 없앤 다음 50자까지 표시하고 그 뒤를 "..."로 바꾼다


#### setValueStrictly - 값을 설정할 때
문자열 형식으로 설정. 줄 바꿈은 줄 바꿈 코드를 설정한다(\n, \r, \r\n 모두 가능)

``` php
$value->setValueStrictly(['editor' => "값1입니다.\n값2입니다.\n값3입니다."]);
```

#### API - 값을 설정할 때
문자열 형식으로 설정. 줄 바꿈은 줄 바꿈 코드를 설정할 것(\n, \r, \r\n 모두 가능)

``` json
{
  "value":{
    "editor": "값1입니다.\n값2입니다.\n값3입니다." 
  }
}
```

### email : 이메일

#### 데이터베이스의 형
string형

#### getValue - 데이터를 가져올 때

- ##### pureValue,value,text,html
이메일 주소

#### setValueStrictly - 값을 설정할 때
문자열 형식으로 이메일 주소를 설정

``` php
$value->setValueStrictly(['email' => 'foobar@foobar.kajitori.co.jp']);
```

#### API - 값을 설정할 때
문자열 형식으로 이메일 주소를 설정

``` json
{
  "value":{
    "email": "foobar@foobar.kajitori.co.jp" 
  }
}
```

### url :  URL

#### 데이터베이스의 형
string형

#### getValue - 데이터를 가져올 때

- ##### pureValue,value,text
URL 문자열

- ##### html
링크 대상을 URL 문자열로 설정한 a 태그

#### setValueStrictly - 값을 설정할 때
문자열 형식으로 URL을 설정

``` php
$value->setValueStrictly(['url' => 'https://exment.net']);
```

#### API - 값을 설정할 때
문자열 형식으로 URL을 설정

``` json
{
  "value":{
    "url": "https://exment.net" 
  }
}
```

### integer : 정수

#### 데이터베이스의 형
<span class="red">string형</span>  

> 지금의 사양에서는 사용자 정의 열 종류가 "정수"여도, 데이터베이스에는 string형으로 저장합니다.


#### getValue - 데이터를 가져올 때

- ##### pureValue,value
정수. 쉼표를 포함하지 않는다.

- ##### text,html
정수. "숫자 쉼표 구분" 옵션을 켠 경우, 쉼표를 포함한다.

#### setValueStrictly - 값을 설정할 때
정수형, 정수의 문자열로 설정  
※쉼표가 들어 있어도 설정할 수 있습니다. 그 경우, 데이터베이스에 저장할 때 쉼표를 자동으로 없앱니다.

``` php
// OK(1)
$value->setValueStrictly(['integer' => 1000]);
// OK(2)
$value->setValueStrictly(['integer' => '1000']);
// OK(3)
$value->setValueStrictly(['integer' => '1,000']);
```

#### API - 값을 설정할 때
정수형, 정수의 문자열로 설정  
※쉼표가 들어 있어도 설정할 수 있습니다. 그 경우, 데이터베이스에 저장할 때 쉼표를 자동으로 없앱니다.

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


### decimal : 소수

#### 데이터베이스의 형
<span class="red">string형</span>  

> 지금의 사양에서는 사용자 정의 열 종류가 "소수"여도, 데이터베이스에는 string형으로 저장합니다.

#### getValue - 데이터를 가져올 때

- ##### pureValue,value
소수. 쉼표를 포함하지 않는다.

- ##### text,html
소수. "숫자 쉼표 구분" 옵션을 켠 경우, 쉼표를 포함한다.

#### setValueStrictly - 값을 설정할 때
소수형, 소수의 문자열로 설정  
※쉼표가 들어 있어도 설정할 수 있습니다. 그 경우, 데이터베이스에 저장할 때 쉼표를 자동으로 없앱니다.

``` php
// OK(1)
$value->setValueStrictly(['decimal' => 1000.03]);
// OK(2)
$value->setValueStrictly(['decimal' => '1000.03']);
// OK(3)
$value->setValueStrictly(['decimal' => '1,000.03']);
```

#### API - 값을 설정할 때
소수형, 소수의 문자열로 설정  
※쉼표가 들어 있어도 설정할 수 있습니다. 그 경우, 데이터베이스에 저장할 때 쉼표를 자동으로 없앱니다.

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

### currency : 통화

#### 데이터베이스의 형
<span class="red">string형</span>  

> 지금의 사양에서는 사용자 정의 열 종류가 "통화"여도, 데이터베이스에는 string형으로 저장합니다.

#### getValue - 데이터를 가져올 때

- ##### pureValue,value
입력한 금액. 쉼표와 통화 단위를 포함하지 않는다.

- ##### text,html
입력한 금액. "숫자 쉼표 구분" 옵션을 켠 경우, 쉼표를 포함한다. 또한 선택한 "통화 표시 형식"을 포함한다.

#### setValueStrictly - 값을 설정할 때
숫자형, 숫자의 문자열로 설정  
※쉼표가 들어 있어도 설정할 수 있습니다. 그 경우, 데이터베이스에 저장할 때 쉼표를 자동으로 없앱니다.  
※지금은 통화 단위를 포함하여 값을 설정할 수 없습니다. 값을 설정하기 전에 통화 단위를 없애 주십시오.

``` php
// OK(1)
$value->setValueStrictly(['currency' => 1000]);
// OK(2)
$value->setValueStrictly(['currency' => '1000']);
// OK(3)
$value->setValueStrictly(['currency' => '1,000']);
// NG
$value->setValueStrictly(['currency' => '1,000원']);
```

#### API - 값을 설정할 때
숫자형, 숫자의 문자열로 설정  
※쉼표가 들어 있어도 설정할 수 있습니다. 그 경우, 데이터베이스에 저장할 때 쉼표를 자동으로 없앱니다.  
※지금은 통화 단위를 포함하여 값을 설정할 수 없습니다. 값을 설정하기 전에 통화 단위를 없애 주십시오.

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
    "currency": "1,000원"
  }
}
```


### date : 날짜

#### 데이터베이스의 형
"2021-04-21" 형식의 string형

#### getValue - 데이터를 가져올 때

- ##### pureValue,value
"yyyy-MM-dd" 형식의 날짜.  예: 2020-05-01

- ##### text,html
"yyyy-MM-dd" 형식의 날짜.  다만 형식을 지정했으면 그 형식으로 반환.


#### setValueStrictly - 값을 설정할 때
날짜 문자열, Carbon 객체로 설정  
※날짜 문자열은 "yyyy-MM-dd" 형식으로 설정할 것을 권장합니다. Carbon 객체로 자동 변환을 하고 있으며, 그 밖의 형식의 동작 확인은 지금 하고 있지 않습니다.

``` php
// OK(1)
$value->setValueStrictly(['date' => '2020-07-22']);
// OK(2)
$value->setValueStrictly(['date' => \Carbon\Carbon::now()]);
```

#### API - 값을 설정할 때
날짜 문자열로 설정  
※날짜 문자열은 "yyyy-MM-dd" 형식으로 설정할 것을 권장합니다. Carbon 객체로 자동 변환을 하고 있으며, 그 밖의 형식의 동작 확인은 지금 하고 있지 않습니다.

``` json
// OK
{
  "value":{
    "date": "2020-07-22"
  }
}
```

### time : 시각

#### 데이터베이스의 형
"15:53:00" 형식의 string형

#### getValue - 데이터를 가져올 때

- ##### pureValue,value
"HH:mm:ss" 형식의 날짜.  예: 21:31:00

- ##### text,html
"HH:mm:ss" 형식의 날짜.  

#### setValueStrictly - 값을 설정할 때
시각 문자열로 설정  
``` php
// OK(1)
$value->setValueStrictly(['time' => '08:00:00']);
// OK(2)
$value->setValueStrictly(['time' => '08:00']);
```

#### API - 값을 설정할 때
시각 문자열로 설정

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


### datetime : 날짜 및 시각

#### 데이터베이스의 형
"2021-04-21 12:24:00" 형식의 string형

#### getValue - 데이터를 가져올 때

- ##### pureValue
"yyyy-MM-dd HH:mm:ss" 형식의 날짜.  예: 2020-05-01 21:31:00

- ##### value
Carbon형 객체

- ##### text,html
"yyyy-MM-dd HH:mm:ss" 형식의 날짜.  다만 형식을 지정했으면 그 형식으로 반환.


#### setValueStrictly - 값을 설정할 때
날짜 및 시각 문자열, Carbon 객체로 설정  
※날짜 및 시각 문자열은 "yyyy-MM-dd HH:ii:ss" 형식으로 설정할 것을 권장합니다. Carbon 객체로 자동 변환을 하고 있으며, 그 밖의 형식의 동작 확인은 지금 하고 있지 않습니다.

``` php
// OK(1)
$value->setValueStrictly(['datetime' => '2020-07-22 08:00:00']);
// OK(2)
$value->setValueStrictly(['datetime' => \Carbon\Carbon::now()]);
```

#### API - 값을 설정할 때
날짜 및 시각 문자열로 설정  
※날짜 및 시각 문자열은 "yyyy-MM-dd HH:ii:ss" 형식으로 설정할 것을 권장합니다. Carbon 객체로 자동 변환을 하고 있으며, 그 밖의 형식의 동작 확인은 지금 하고 있지 않습니다.

``` json
// OK
{
  "value":{
    "datetime": "2020-07-22 08:00:00"
  }
}
```

### select : 선택 (고정 값)

#### 데이터베이스의 형
string형(다중 선택이 가능한 경우는 string형의 배열)

#### getValue - 데이터를 가져올 때

- ##### pureValue,value,text,html
선택한 항목.


#### setValueStrictly - 값을 설정할 때
선택지의 항목으로 설정  

``` php
///// 선택지를 "Orange"로 한 경우
// OK
$value->setValueStrictly(['select' => 'Orange']);
```

※다중 선택을 허용하는 설정인 경우, 배열 형식으로 설정

``` php
// OK
$value->setValueStrictly(['selects' => ['Orange', 'Apple']]);
```

#### API - 값을 설정할 때
선택지의 항목으로 설정

``` json
// OK
{
  "value":{
    "select": "Orange"
  }
}
```

※다중 선택을 허용하는 설정인 경우, 배열 형식으로 설정

``` json
// OK
{
  "value":{
    "selects": ["Orange", "Apple"]
  }
}
```

### select_valtext : 선택 (값과 표시명 저장)

#### 데이터베이스의 형
string형(다중 선택이 가능한 경우는 string형의 배열)

#### getValue - 데이터를 가져올 때

- ##### pureValue,value
선택한 항목의 값.

- ##### text,html
선택한 항목의 표시명.

#### setValueStrictly - 값을 설정할 때
선택지의 값 또는 표시명으로 설정  

``` php
///// 선택지의 표시명을 "Orange", 값을 "val1"로 한 경우
// OK(1)
$value->setValueStrictly(['select_valtext' => 'val1']);
// OK(2)
$value->setValueStrictly(['select_valtext' => 'Orange']);
```

※다중 선택을 허용하는 설정인 경우, 배열 형식으로 설정

``` php
// OK
$value->setValueStrictly(['select_valtexts' => ['val1', 'val2']]);
```

#### API - 값을 설정할 때
선택지의 값 또는 표시명으로 설정  

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

※다중 선택을 허용하는 설정인 경우, 배열 형식으로 설정

``` json
// OK
{
  "value":{
    "select_valtexts": ["val1", "val2"]
  }
}
```

### select_table : 선택 (테이블에서)

#### 데이터베이스의 형
string형(다중 선택이 가능한 경우는 string형의 배열)

#### getValue - 데이터를 가져올 때

- ##### pureValue
선택한 데이터의 id.

- ##### value
지정한 id의 CustomValue 객체.

- ##### text
지정한 id의 CustomValue 객체에 설정되어 있는 [제목 표시 열](/ko/table)의 문자열.

- ##### html
지정한 id의 데이터를 모달로 열기 위한 a 태그.


#### setValueStrictly - 값을 설정할 때
참조하는 테이블의 데이터 id 값을 정수형 또는 문자열로 설정  

``` php
// OK(1)
$value->setValueStrictly(['select_table' => 1]);
// OK(2)
$value->setValueStrictly(['select_table' => "3"]);
```

※다중 선택을 허용하는 설정인 경우, 배열 형식으로 설정

``` php
// OK
$value->setValueStrictly(['select_tables' => [1, 2, 3]]);
```

#### API - 값을 설정할 때
참조하는 테이블의 데이터 id 값을 정수형 또는 문자열로 설정  

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

※다중 선택을 허용하는 설정인 경우, 배열 형식으로 설정

``` json
// OK
{
  "value":{
    "select_table2": ["3", "4", "6"]
  }
}
```

### user : 사용자
select_table과 같습니다.

### organization : 조직
select_table과 같습니다.


### yesno : YES/NO

#### 데이터베이스의 형
0 또는 1의 integer형

#### getValue - 데이터를 가져올 때

- ##### pureValue,value
0(NO를 선택한 경우) 또는 1(YES를 선택한 경우).

- ##### text,html
NO 또는 YES.

#### setValueStrictly - 값을 설정할 때
0,1,"0","1","YES","NO","yes","no",true,false 중 하나의 값을 설정

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

#### API - 값을 설정할 때
0,1,"0","1","YES","NO","yes","no",true,false 중 하나의 값을 설정

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


### boolean : 2개 값 선택

#### 데이터베이스의 형
string형

#### getValue - 데이터를 가져올 때

- ##### pureValue,value
선택한 쪽의 값.

- ##### text,html
선택한 쪽의 표시명.


#### setValueStrictly - 값을 설정할 때
사용자 정의 열 설정에서 등록한, 2개의 선택의 값 또는 표시명의 문자열을 설정

``` php
///// 선택지 1의 표시명을 "Orange", 값을 "val1"로 한 경우
// OK(1)
$value->setValueStrictly(['boolean' => 'val1']);
// OK(2)
$value->setValueStrictly(['boolean' => 'Orange']);
```

#### API - 값을 설정할 때
사용자 정의 열 설정에서 등록한, 2개의 선택의 값 또는 표시명의 문자열을 설정

``` json
// OK
{
  "value":{
    "boolean": "val1"
  }
}
```

### file : 파일

#### 데이터베이스의 형
string형(다중 선택이 가능한 경우는 string형의 배열)

#### getValue - 데이터를 가져올 때

- ##### pureValue,value
저장한 파일의 내부 파일 경로.

- ##### text
파일의 링크 대상 URL.

- ##### html
파일의 링크 대상으로 가는 a 태그. 태그의 표시 문구는 업로드한 파일의 파일 이름.


#### setValueStrictly - 값을 설정할 때
조정 중


### image : 이미지

#### 데이터베이스의 형
string형(다중 선택이 가능한 경우는 string형의 배열)

#### getValue - 데이터를 가져올 때

- ##### pureValue,value
저장한 파일의 내부 파일 경로.

- ##### text
파일의 링크 대상 URL.

- ##### html
파일의 링크 대상으로 가는 img 태그.

#### setValueStrictly - 값을 설정할 때
조정 중
