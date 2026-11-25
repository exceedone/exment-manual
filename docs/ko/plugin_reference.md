# 플러그인 레퍼런스
플러그인을 개발하는 분을 위한 페이지입니다.  
플러그인의 종류별로, 상속할 클래스와 그 클래스에서 쓸 수 있는 함수·속성을 정리했습니다.

- 사용자 정의 테이블·사용자 정의 열·사용자 정의 데이터의 함수는 [함수 레퍼런스](/ko/func_reference)를 확인해 주십시오.
- 플러그인(CRUD 페이지)의 자세한 설명은 [플러그인 레퍼런스(CRUD 페이지)](/ko/plugin_reference_crud)를 확인해 주십시오.
- 관리 화면 라이브러리의 클래스는 Exment v7.0.0 이후의 네임스페이스("ExmentAdminCore\Admin")로 적혀 있습니다. v6.x 이전을 이용하는 경우에는 "Encore\Admin"으로 바꿔 읽어 주십시오. 자세한 내용은 [업데이트 절차 v7.0.0(영어)](/update/v7_0_0)를 확인해 주십시오.



## PluginBase / 플러그인 공통 클래스

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| plugin | Plugin | 플러그인의 Eloquent 인스턴스 |
| pluginOptions | PluginOptionBase | 플러그인의 각종 속성을 담는 클래스 인스턴스(PluginOptionBase를 상속) |
| useCustomOption | bool | 플러그인 고유의 설정을 사용할지 여부. 초기값은 false |

※ 예전에는 플러그인의 종류별로 추상 클래스에 속성을 직접 정의했습니다. 하지만 이 방식에서는 사용자가 직접 정의한 속성과 이름이 충돌할 수 있습니다.  
그래서 v4.2.2 이후에 추가하는 속성은 pluginOptions 안에 정의하기로 했습니다.  "$this->pluginOptions->속성명"으로 접근할 수 있습니다. 또한 기존 속성은 호환성을 유지하기 위해 지금까지와 같이 쓸 수 있습니다.

### 함수 목록

#### setCustomOptionForm
플러그인 고유의 설정을 정의합니다. 자세한 내용은 [여기](/ko/plugin_quickstart)를 참조해 주십시오.  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | 관리 화면 라이브러리(exment-admin-core, v6.x 이전은 laravel-admin)의 폼 인스턴스 |

##### 반환값
없음

##### 사용 예
[여기](/ko/plugin_quickstart)를 참조해 주십시오.

---



## PluginApiBase
플러그인(API)의 추상 클래스입니다. API 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_api)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Controllers\ApiTrait

##### 속성
없음

### 함수 목록

#### getRouteUri
고유 API의 엔드포인트를 가져옵니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $endpoint | string | 추가할 엔드포인트 URL. 초기값은 null |


##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 고유 API의 엔드포인트 |


---




## PluginBatchBase
플러그인(배치)의 추상 클래스입니다. 배치 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_batch)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 속성

##### PluginOptionBatch(PluginOptionBase를 상속)
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| command_options | array | 배치에 전달된 명령줄 인수 |

### 함수 목록

#### execute
배치를 실행합니다. 실행할 처리를 이 함수 안에 적어 주십시오.

##### 인수
없음

##### 반환값
없음

---




## PluginButtonBase
플러그인(버튼)의 추상 클래스입니다. 버튼 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_button)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginButtonTrait
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 사용자 정의 테이블의 인스턴스 |
| custom_value | CustomValue | 상세 화면에서 버튼을 눌렀을 때, 그 페이지의 사용자 정의 데이터의 Eloquent 인스턴스 |
| selected_custom_values | array | 목록 화면에서 버튼을 눌렀을 때, 선택한 사용자 정의 데이터의 Eloquent 인스턴스 배열 |


### 함수 목록

#### execute
버튼을 눌렀을 때의 처리를 실행합니다. 실행할 처리를 이 함수 안에 적어 주십시오.

##### 인수
없음

##### 반환값
없음

---

#### render
버튼을 직접 그립니다.  
특별한 모양으로 만들거나 고유의 스크립트를 넣을 때는 이 함수 안에 적어 주십시오.

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string,Renderable | 직접 그린 버튼 |


---



## PluginDashboardBase
플러그인(대시보드)의 추상 클래스입니다. 대시보드 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_dashboard)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| dashboard_box | DashboardBox | 배치한 대시보드 Box의 인스턴스 |


### 함수 목록

#### header
대시보드 BOX의 헤더 부분의 HTML을 반환합니다.  
헤더 부분에 HTML을 출력하려면, 상속한 플러그인 파일에서 이 함수 안에 HTML을 반환하는 처리를 추가해 주십시오.

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 헤더 부분의 HTML |

---


#### body
대시보드 BOX의 본체 부분의 HTML을 반환합니다.  
본체 부분에 HTML을 출력하려면, 상속한 플러그인 파일에서 이 함수 안에 HTML을 반환하는 처리를 추가해 주십시오.

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 본체 부분의 HTML |

---


#### footer
대시보드 BOX의 푸터 부분의 HTML을 반환합니다.  
푸터 부분에 HTML을 출력하려면, 상속한 플러그인 파일에서 이 함수 안에 HTML을 반환하는 처리를 추가해 주십시오.

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 푸터 부분의 HTML |

---

#### getDashboardUri
각 대시보드 BOX의 엔드포인트를 가져옵니다.  
대시보드 BOX 안에서 값을 GET, POST, PUT 등으로 주고받을 때는, 이 함수를 써서 URI 부분을 가져와 주십시오.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $endpoint | string | 추가할 엔드포인트 URL. 초기값은 null |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 대시보드 BOX까지의 엔드포인트 |


---



## PluginDocumentBase
플러그인(문서)의 추상 클래스입니다. 문서 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_document)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 사용자 정의 테이블의 인스턴스 |
| custom_value | CustomValue | 사용자 정의 데이터의 인스턴스 |
| document_value | CustomValue | 출력한 문서 데이터의 인스턴스(executed 함수 안에서만 참조 가능) |


### 함수 목록

#### (protected)executing
문서를 출력하기 전에 호출되는 함수입니다.  
실행 전에 사용자 정의 데이터에 값을 저장하고 싶을 때 등, 개별 처리가 필요하면 이 함수를 써 주십시오.

##### 인수
없음

##### 반환값
없음

---

#### (protected)executed
문서를 출력한 뒤에 호출되는 함수입니다.  
개별 처리가 필요하면 이 함수를 써 주십시오.

##### 인수
없음

##### 반환값
없음

---




## PluginEventBase
플러그인(이벤트)의 추상 클래스입니다. 이벤트 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_event)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginEventTrait

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 사용자 정의 테이블의 인스턴스 |
| custom_value | CustomValue | 사용자 정의 데이터의 Eloquent 인스턴스(사용자 정의 데이터와 관계없는 이벤트일 때는 null) |
| isCreate | bool | 새로 만드는 데이터인지 여부 |
| isDelete | bool | 삭제된 데이터인지 여부 |

##### PluginOptionEvent(PluginOptionBase를 상속)
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| is_modal | bool | 이벤트가 발생한 페이지가 모달 폼인지 여부 |
| event_type | PluginEventType | 이벤트의 종류<br>(loading: 로드 시, saving: 저장 전, saved: 저장 후, workflow_action_executing: 워크플로 실행 직전, workflow_action_executed: 워크플로 실행 직후, notify_executing: 알림 실행 직전, notify_executed: 알림 실행 후) |
| page_type | PluginPageType | 이벤트가 발생한 페이지의 종류<br>(list: 목록 화면, create: 새로 만들기 화면, edit: 편집 화면, show: 상세 화면) |


### 함수 목록

#### execute
이벤트가 발생했을 때 실행할 처리를 이 함수 안에 적어 주십시오.

##### 인수
없음

##### 반환값
없음

---



## PluginExportBase
플러그인(내보내기)의 추상 클래스입니다. 내보내기 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_export)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 사용자 정의 테이블의 인스턴스 |


### 함수 목록

#### defaultProvider
기본 내보내기 프로바이더를 설정하는 함수입니다.  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| default_provider | ProviderBase | 내보내기 프로바이더의 인스턴스 |


##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| PluginExportBase | 이 클래스의 인스턴스 |

---

#### viewProvider
뷰 프로바이더를 설정하는 함수입니다.  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| view_provider | ProviderBase | 내보내기용 뷰 프로바이더의 인스턴스 |


##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| PluginExportBase | 이 클래스의 인스턴스 |

---


#### execute
내보내기 처리로 호출되는 함수입니다.  
이 함수에 내보내기 처리를 구현해 주십시오.

##### 인수
없음

##### 반환값
없음

---


#### getFileName
내보내기 처리의 결과로 다운로드되는 파일의 이름을 설정하는 함수입니다.  

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 내보내기 결과의 다운로드 파일 이름 |


---






## PluginImportBase
플러그인(가져오기)의 추상 클래스입니다. 가져오기 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_import)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 사용자 정의 테이블의 인스턴스 |
| file | File | 화면에서 가져온 파일 |


### 함수 목록

#### execute
가져오기 처리로 호출되는 함수입니다.  
이 함수에 가져오기 처리를 추가해 주십시오.

##### 인수
없음

##### 반환값
없음

---




## PluginPageBase
플러그인(페이지)의 추상 클래스입니다. 페이지 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_page)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| showHeader | bool | 페이지 위쪽의 헤더 부분에 아이콘과 제목을 표시할지 여부. true: 표시 / false: 숨김. 초기값은 true |

### 함수 목록

#### getRouteUri
고유 페이지의 엔드포인트를 가져옵니다.  
고유 페이지에서 GET, POST, PUT 등을 할 때는, 이 함수를 써서 URI 부분을 가져와 주십시오.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $endpoint | string | 추가할 엔드포인트 URL. 초기값은 null |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 고유 페이지의 엔드포인트 |

---



## PluginPublicBase
플러그인(스크립트, 스타일)의 추상 클래스입니다. 스크립트 플러그인이나 스타일 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [플러그인(스크립트)](/ko/plugin_quickstart_script) 또는 [플러그인(스타일)](/ko/plugin_quickstart_style)을 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| plugin | Plugin | 플러그인의 Eloquent 인스턴스 |

### 함수 목록

#### css
CSS 파일의 경로를 가져오는 함수입니다.  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| skipPath | bool | css 파일을 public 폴더 바로 아래에 두었다면 true로 합니다. (초기값은 false) |


##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| array | CSS 파일 경로의 배열 |

---

#### js
js 파일의 경로를 가져오는 함수입니다.  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| skipPath | bool | js 파일을 public 폴더 바로 아래에 두었다면 true로 합니다. (초기값은 false) |


##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| array | js 파일 경로의 배열 |


---



## PluginValidatorBase
플러그인(유효성 검사)의 추상 클래스입니다. 유효성 검사 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_validate)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 사용자 정의 테이블의 인스턴스 |
| original_value | CustomValue | 사용자 정의 데이터의 변경 전 인스턴스 |
| input_value | array | 화면 입력값을 담은 연관 배열(키: 열 이름, 값: 입력값) |
| called_type | ValidateCalledType | 호출한 쪽의 종류<br>(form: 폼, import: 가져오기, api: API) |
| messages | array | 오류 메시지를 담습니다<br>(키: 열 이름, 값: 오류 메시지 ※여러 개이면 배열) |


### 함수 목록

#### validate
유효성 검사를 실행합니다. 실행할 처리는 이 함수 안에 적어 주십시오.

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| boolean | 유효성 검사의 결과(true: 정상, false: 오류 있음) |

#### validateDestroy
사용자 정의 데이터를 삭제하기 전에 유효성 검사를 실행합니다. 실행할 처리는 이 함수 안에 적어 주십시오.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $custom_value | CustomValue | 사용자 정의 데이터의 인스턴스  |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| array | 유효성 검사의 결과와 메시지(true: 정상, false: 오류 있음) |

~~~ php
        [
            'status'  => false,
            'message' =>  '중요도가 높은 데이터는 삭제할 수 없습니다.',
        ]
~~~


---





## PluginViewBase
플러그인(뷰)의 추상 클래스입니다. 뷰 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_view)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 사용자 정의 테이블의 인스턴스 |
| custom_view | CustomView | 사용자 정의 뷰의 인스턴스 |
| useBox | bool | 목록에 버튼을 표시할지 여부 |
| useBoxButtons | array | 어떤 버튼을 표시할지<br>(newButton: 새로 만들기, menuButton: 메뉴, viewButton: 뷰) |


### 함수 목록

#### grid
목록 표시 처리로 호출되는 함수입니다.  

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string,Renderable | 그리드에 표시할 내용 |

---

#### setViewOptionForm
뷰 고유의 설정을 정의합니다. 자세한 내용은 [여기](/ko/plugin_quickstart)를 참조해 주십시오.  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | 관리 화면 라이브러리(exment-admin-core, v6.x 이전은 laravel-admin)의 폼 인스턴스 |

##### 반환값
없음

---






## PluginCrudBase
플러그인(CRUD 페이지)의 추상 클래스입니다. CRUD 페이지 플러그인을 개발할 때는 이 클래스를 상속해 주십시오.  
자세한 내용은 [여기](/ko/plugin_quickstart_crud)를 참조해 주십시오.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 속성
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| title | string | 플러그인의 각 페이지에 표시할 제목 |
| description  | string | 플러그인의 각 페이지에 표시할 설명문 |
| icon | string | 플러그인의 각 페이지에 표시할 아이콘 |


### 함수 목록(개발자가 구현해야 함)

#### getFieldDefinitions
열 정의를 연관 배열로 반환하는 함수입니다. 각 페이지에 표시할 항목의 정의를 적어 주십시오.

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| array | 각 페이지의 항목 정의를 연관 배열로 반환 |

##### 반환값-연관 배열의 정의
| 종류 | 설명 |
| ---- | ---- |
| key | 데이터 취득이나 HTML 각 요소의 name 등에 설정하는 항목 이름. 영숫자로 입력해 주십시오 |
| label | 목록 화면 등의 항목 이름에 쓰는 문구 |
| grid | 목록 화면에 표시할 항목에 설정. 표시 순서대로 정수를 적어 주십시오 |
| show | 상세 화면에 표시할 항목에 설정. 표시 순서대로 정수를 적어 주십시오 |
| create | 새로 만들기 화면에 표시할 항목에 설정. 표시 순서대로 정수를 적어 주십시오 |
| edit | 편집 화면에 표시할 항목에 설정. 표시 순서대로 정수를 적어 주십시오 |


##### 구현 예

``` php
/**
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => '도시 이름', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => '국가 코드', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => '인구', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }
```

#### getPaginate
데이터 목록을 페이지네이션 형식으로 가져오는 함수입니다.  
가져온 데이터를 LengthAwarePaginator 형식으로 반환해 주십시오.  
또한 목록의 각 요소는 연관 배열로 하고, 이 연관 배열의 키 값은 getFieldDefinitions에서 설정한 키 값과 같게 해 주십시오.  
※화면에서 검색을 하면 인수 $options에 값이 설정됩니다

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $options | array | 목록 화면에서 호출했을 때의 옵션 값을 설정 |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| LengthAwarePaginator | 가져온 데이터의 목록 |

##### 구현 예
[플러그인 레퍼런스(CRUD 페이지)](/ko/plugin_reference_crud)를 확인해 주십시오.






