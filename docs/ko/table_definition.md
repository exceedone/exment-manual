# DB 테이블 정의
Exment가 쓰는 데이터베이스의 테이블 정의입니다. 개발하는 분이나 데이터베이스를 직접 살펴보는 분을 위한 페이지입니다.  
테이블별로 열의 정의(테이블 정의)와 INDEX 정보를 실었습니다. "각종 옵션 설정"은 options 열 등에 들어가는 키의 목록입니다.

※수시로 유지 보수하고 있습니다.

## admin_menu
사이드바에 표시하는 메뉴를 관리하는 테이블입니다.  
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| parent_id| 0| NO| int(11)| | | 상위 계층의 ID|
| order| 0| NO| int(11)| | | 정렬 순서|
| title| | NO| varchar(50)| | | 메뉴 표시 이름|
| icon| | NO| varchar(50)| | | 아이콘|
| uri| NULL| YES| varchar(2000)| | | URI|
| options| NULL| YES| longtext| | | 각종 옵션|
| permission| NULL| YES| varchar(255)| | | (사용하지 않음)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| menu_type| | NO| varchar(255)| | | 메뉴 종류|
| menu_name| NULL| YES| varchar(255)| | | 메뉴 이름|
| menu_target| NULL| YES| varchar(255)| | | 대상|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## admin_operation_log
작업 로그를 저장하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| user_id| | NO| int(11)| MUL| | 사용자 ID|
| path| | NO| varchar(255)| | | 접근한 경로|
| method| | NO| varchar(10)| | | 실행 메서드|
| ip| | NO| varchar(255)| | | IP 주소|
| input| | NO| text| | | 입력 정보·쿼리|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| admin_operation_log_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## conditions
각종 조건을 저장하는 Polymorphic 테이블입니다. 폼 우선순위 설정, 일괄 업데이트 설정, 워크플로 액션 등의 조건을 저장합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| morph_type| | NO| varchar(255)| MUL| | Polymorphic 키(종류)|
| morph_id| | NO| int(10) unsigned| | | Polymorphic 키(ID)|
| condition_type| | NO| int(11)| | | 조건 항목의 종류(*)|
| condition_key| | NO| int(11)| | | 검색 조건의 종류 키|
| target_column_id| NULL| YES| int(11)| | | 조건 항목의 ID|
| condition_value| NULL| YES| varchar(1024)| | | 조건 값|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

*) 0: 사용자 정의 열, 1: 시스템 열, 2: 부모 ID, 3: 워크플로, 4: 기타 조건

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| conditions_morph_type_morph_id_index| morph_type,morph_id| | |
| PRIMARY| id| UNIQUE| |

## custom_columns
사용자 정의 열을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_table_id| | NO| int(10) unsigned| MUL| | 사용자 정의 테이블의 ID|
| column_name| | NO| varchar(255)| MUL| | 열 이름(영숫자)|
| column_view_name| | NO| varchar(255)| | | 열 표시 이름|
| column_type| | NO| varchar(255)| MUL| | 열 종류|
| description| NULL| YES| varchar(1000)| | | 설명|
| system_flg| 0| NO| tinyint(1)| | | 시스템 관리 플래그|
| order| 0| NO| int(11)| | | 정렬 순서|
| options| NULL| YES| longtext| | | 각종 옵션(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_columns_column_name_index| column_name| | |
| custom_columns_column_type_index| column_type| | |
| custom_columns_custom_table_id_foreign| custom_table_id| | |
| custom_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 대상이 되는 열 종류 |코멘트 | 
|---|---|---|
| required| 공통| 1: 필수| 
| index_enabled| 공통| 1: 검색 인덱스| 
| freeword_search| 검색 인덱스 열만| 1: 자유어 검색 대상| 
| unique| 공통| 1: 유니크(고유)| 
| init_only| 공통| 1: 한 번만 입력| 
| placeholder| 공통| 플레이스홀더| 
| help| 공통| 도움말| 
| min_width| 공통| 열 너비(최솟값)| 
| max_width| 공통| 열 너비(최댓값)| 
| default| 공통(파일·이미지는 제외)| 초기값| 
| string_length| 텍스트 항목| 최대 글자 수| 
| available_characters| 한 줄 텍스트| 사용 가능 문자| 
| suggest_input| 한 줄 텍스트| 1: 추천 입력을 한다| 
| regex_validate| 한 줄 텍스트| 정규 표현식(전문가 모드일 때만 표시)| 
| rows| 여러 줄 텍스트| 높이(줄 수)| 
| number_min| 숫자 항목| 최솟값| 
| number_max| 숫자 항목| 최댓값| 
| number_format| 숫자 항목| 숫자 쉼표 문자열| 
| calc_formula| 숫자 항목| 계산식| 
| updown_button| 정수| 1: +- 버튼을 표시한다| 
| decimal_digit| 소수, 통화| 소수점 이하 자릿수| 
| percent_format| 소수| 퍼센트 표시| 
| currency_symbol| 통화| 통화의 표시 형식| 
| default_type| 날짜 관련 항목, 사용자| 초기값 종류| 
| datetime_now_saving| 날짜 관련 항목| 1: 저장할 때 실행 일시를 등록| 
| datetime_now_creating| 날짜 관련 항목| 1: 만들 때 실행 일시를 등록| 
| auto_number_type| 자동 번호| 채번 종류| 
| auto_number_format| 자동 번호| 채번 포맷| 
| select_item| 선택 (고정 값)| 선택지| 
| select_item_valtext| 선택 (값과 표시명 저장)| 선택지| 
| check_radio_enabled| 선택 (고정 값), 선택 (값과 표시명 저장)| 1: 라디오 버튼·체크박스 형식으로 표시| 
| free_input| 선택 (고정 값)| 1: 자유롭게 입력할 수 있게 한다| 
| select_target_table| 선택 (테이블에서)| 대상 테이블| 
| select_target_view| 선택 (테이블에서), 사용자, 조직| 필터 조건 뷰| 
| select_import_column_id| 선택 (테이블에서), 사용자, 조직| 가져오기 때의 키 열| 
| select_export_column_id| 선택 (테이블에서), 사용자, 조직| 내보내기 때의 키 열| 
| select_load_ajax| 선택 (테이블에서), 사용자, 조직| 1: 선택지를 그때마다 검색한다| 
| checkbox_enabled| YES/NO| 1: 체크박스 형식으로 표시| 
| required_yes| YES/NO| 1: YES 필수| 
| true_value| 2개 값 선택| 선택지 1일 때의 값| 
| true_label| 2개 값 선택| 선택지 1일 때의 표시| 
| false_value| 2개 값 선택| 선택지 2일 때의 값| 
| false_label| 2개 값 선택| 선택지 2일 때의 표시| 
| multiple_enabled| 파일 항목, 선택 항목, 사용자, 조직| 1: 다중 선택을 허용한다| 
| accept_extensions| 파일 항목| 업로드를 허용하는 확장자| 
| showing_all_user_organizations| 사용자, 조직| 권한이 없는 사용자·조직도 표시한다| 


## custom_column_multisettings
사용자 정의 테이블에 관련된 여러 설정(제목 표시 열 설정, 복합 고유 키 설정, 두 열 비교, 데이터 자동 공유 설정 etc)을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_table_id| | NO| int(10) unsigned| | | 사용자 정의 테이블의 ID|
| multisetting_type| 1| NO| int(11)| | | 설정의 종류(*)|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| priority| 0| NO| int(10) unsigned| | | 정렬 순서·우선순위|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

*) 1: 복합 고유 키 설정, 2: 제목 표시 열 설정, 3: 두 열 비교, 4: 데이터 자동 공유 설정

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_column_multisettings_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 대상이 되는 설정 |코멘트 | 
|---|---|---|
| unique1_id| 복합 고유 키 설정| 복합 고유 키 1| 
| unique2_id| 복합 고유 키 설정| 복합 고유 키 2| 
| unique3_id| 복합 고유 키 설정| 복합 고유 키 3| 
| table_label_id| 제목 표시 열 설정| 대상 열의 ID| 
| compare_column1_id| 두 열 비교| 검증 열(A)| 
| compare_column2_id| 두 열 비교| 비교 열(B)| 
| compare_type| 두 열 비교| 조건| 
| share_trigger_type| 데이터 자동 공유 설정| 트리거(1: 새로 만들 때, 2: 업데이트할 때)| 
| share_column_id| 데이터 자동 공유 설정| 대상 열의 ID| 
| share_permission| 데이터 자동 공유 설정| 대상 권한(1: 편집, 2: 열람)| 

## custom_copies
데이터 복사 설정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| from_custom_table_id| | NO| int(10) unsigned| MUL| | 복사 원본 테이블의 ID|
| to_custom_table_id| | NO| int(10) unsigned| MUL| | 복사 대상 테이블의 ID|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_copies_from_custom_table_id_foreign| from_custom_table_id| | |
| custom_copies_suuid_index| suuid| | |
| custom_copies_to_custom_table_id_foreign| to_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| label| 버튼의 라벨| 
| icon| 버튼의 아이콘| 
| button_class| 버튼의 HTML class| 
| child_copy| 자식 테이블 설정| 

## custom_copy_columns
데이터 복사 설정의 자식 테이블. 대상이 되는 사용자 정의 열을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| custom_copy_id| | NO| int(10) unsigned| MUL| | 데이터 복사 설정의 ID|
| from_column_type| NULL| YES| int(11)| | | 복사 원본 사용자 정의 열의 종류|
| from_column_table_id| NULL| YES| int(10) unsigned| | | 복사 원본 사용자 정의 열의 테이블 ID|
| from_column_target_id| NULL| YES| int(11)| | | 복사 원본 사용자 정의 열의 ID|
| to_column_type| 0| NO| int(11)| | | 복사 대상 사용자 정의 열의 종류|
| to_column_table_id| | NO| int(10) unsigned| | | 복사 대상 사용자 정의 열의 테이블 ID|
| to_column_target_id| | NO| int(11)| | | 복사 대상 사용자 정의 열의 ID|
| copy_column_type| 0| NO| int(11)| | | 0: 복사 열 설정, 1: 입력 대화 상자 설정|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_copy_columns_custom_copy_id_foreign| custom_copy_id| | |
| PRIMARY| id| UNIQUE| |

## custom_forms
사용자 정의 폼을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_table_id| | NO| int(10) unsigned| MUL| | 사용자 정의 테이블의 ID|
| form_view_name| | NO| varchar(256)| | | 폼 표시 이름|
| default_flg| 0| NO| tinyint(1)| | | 1: 기본 폼|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_forms_custom_table_id_foreign| custom_table_id| | |
| custom_forms_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| form_label_type| 제목 표시 방법| 
| show_grid_type| 상세 화면 표시 방법| 

## custom_form_blocks
사용자 정의 폼의 자식 테이블. 폼 블록을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| custom_form_id| | NO| int(10) unsigned| MUL| | 사용자 정의 폼의 ID|
| form_block_view_name| NULL| YES| varchar(255)| | | 폼 블록 이름|
| form_block_type| | NO| int(11)| | | 폼 블록의 종류(*)|
| form_block_target_table_id| NULL| YES| int(10) unsigned| MUL| | 대상 사용자 정의 테이블의 ID|
| available| 0| NO| tinyint(1)| | | 1: 사용한다|
| options| NULL| YES| longtext| | | 각종 옵션 설정|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

*) 0: 기본, 1: 자식 테이블(1대다), 2: 자식 테이블(다대다)

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_form_blocks_custom_form_id_foreign| custom_form_id| | |
| custom_form_blocks_form_block_target_table_id_foreign| form_block_target_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_form_columns
폼 블록의 자식 테이블. 블록 안의 폼 항목을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| NULL| YES| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_form_block_id| | NO| int(10) unsigned| MUL| | 폼 블록의 ID|
| form_column_type| | NO| int(11)| | | 폼 항목의 종류(*)|
| form_column_target_id| NULL| YES| int(11)| | | 폼 항목의 ID|
| row_no| 1| NO| int(11)| | | 배치 위치(행 No)|
| column_no| 1| NO| int(11)| | | 배치 위치(열 No)|
| width| NULL| YES| int(11)| | | 열 너비|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| order| 0| NO| int(11)| | | 표시 순서|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

*) 0: 사용자 정의 열, 1: 시스템 열, 99: 기타 항목

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_form_columns_custom_form_block_id_foreign| custom_form_block_id| | |
| custom_form_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 대상 항목 | 코멘트 | 
|---|---|---|
| form_column_view_name| 사용자 정의 열| 필드 표시 이름| 
| field_label_type| 사용자 정의 열| 제목 표시 방법| 
| field_showing_type| 사용자 정의 열| 필드 종류| 
| required| 사용자 정의 열| 1: 필수 항목| 
| default_type| 사용자 정의 열| 초기값 종류| 
| default| 사용자 정의 열| 초기값| 
| help| 사용자 정의 열| 도움말| 
| changedata_target_column_id| 사용자 정의 열| 데이터 연동 설정(대상 열의 ID)| 
| changedata_column_id| 사용자 정의 열| 데이터 연동 설정(링크 열의 ID)| 
| relation_filter_target_column_id| 사용자 정의 열| 관계 필터(대상 열의 ID)| 
| html| HTML, 확장 HTML| HTML| 
| text| 제목, 설명문| 텍스트| 
| append_hr| 제목| 1: 구분선을 긋는다| 
| image_aslink| 이미지| 1: 이미지를 링크로 표시| 

## custom_form_priorities
사용자 정의 폼의 표시 우선순위를 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| custom_form_id| | NO| int(10) unsigned| | | 사용자 정의 폼의 ID|
| order| 0| NO| int(10) unsigned| | | 우선순위 판정 순서|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| condition_join| 조건의 결합(and,or)| 

## custom_operations
일괄 업데이트 설정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_table_id| | NO| int(10) unsigned| | | 사용자 정의 테이블의 ID|
| operation_type| NULL| YES| varchar(255)| | | 업데이트 타이밍|
| operation_name| | NO| varchar(40)| | | 처리의 이름|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_operations_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| button_label| 버튼의 라벨| 
| button_icon| 버튼의 아이콘| 
| button_class| 버튼의 HTML class| 
| condition_join| 조건의 결합(and,or)| 

## custom_operation_columns
일괄 업데이트 설정의 자식 테이블. 대상 열과 업데이트 내용을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| custom_operation_id| | NO| int(10) unsigned| MUL| | 일괄 업데이트 설정의 ID|
| view_column_type| 0| NO| int(11)| | | 0: 사용자 정의 열<br>1: 시스템 열|
| view_column_target_id| | NO| int(11)| | | 대상 열의 ID|
| update_value_text| | NO| varchar(1024)| | | 업데이트 값|
| operation_column_type| 0| NO| int(11)| | | 0: 업데이트 열 설정, 1: 입력 대화 상자 설정|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_operation_columns_custom_operation_id_foreign| custom_operation_id| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| operation_update_type| 업데이트의 종류(default: 고정값, system: 시스템 값)| 

## custom_relations
사용자 정의 테이블 사이의 관계 설정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| parent_custom_table_id| | NO| int(10) unsigned| MUL| | 부모 테이블의 ID|
| child_custom_table_id| | NO| int(10) unsigned| MUL| | 자식 테이블의 ID|
| relation_type| 0| NO| int(11)| | | 1: 1대다<br>2: 다대다|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_relations_child_custom_table_id_foreign| child_custom_table_id| | |
| custom_relations_parent_custom_table_id_foreign| parent_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| parent_import_column_id| 가져오기 때의 키 열의 ID| 
| parent_export_column_id| 내보내기 때의 키 열의 ID| 

## custom_relation_values
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| parent_id| | NO| int(10) unsigned| MUL| | |
| child_id| | NO| int(10) unsigned| MUL| | |

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_relation_values_child_id_index| child_id| | |
| custom_relation_values_parent_id_index| parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_tables
사용자 정의 테이블을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| table_name| | NO| varchar(256)| | | 테이블 이름(영숫자)|
| table_view_name| | NO| varchar(256)| | | 테이블 표시 이름|
| description| NULL| YES| varchar(1000)| | | 설명|
| system_flg| 0| NO| tinyint(1)| | | 1: 시스템 테이블|
| showlist_flg| 1| NO| tinyint(1)| | | 1: 목록에 표시한다|
| order| 0| NO| int(11)| | | 표시 순서|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_tables_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| color| 색| 
| icon| 아이콘| 
| search_enabled| 1: 검색 가능| 
| use_label_id_flg| ID를 라벨에 사용한다| 
| one_record_flg| 1: 1건만 등록 가능| 
| attachment_flg| 1: 첨부 파일을 사용한다| 
| comment_flg| 1: 댓글을 사용한다| 
| revision_flg| 1: 데이터 변경 이력을 사용한다| 
| revision_count| 변경 이력 버전 수| 
| all_user_editable_flg| 1: 모든 사용자가 편집 가능| 
| all_user_viewable_flg| 1: 모든 사용자가 열람 가능| 
| all_user_accessable_flg| 1: 모든 사용자가 참조 가능| 

## custom_value_authoritables
데이터별 권한 설정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| parent_type| NULL| YES| varchar(255)| MUL| | 대상 테이블의 영숫자 이름|
| parent_id| NULL| YES| bigint(20) unsigned| | | 대상 데이터의 ID|
| authoritable_type| | NO| varchar(255)| MUL| | 권한의 종류|
| authoritable_user_org_type| | NO| varchar(255)| MUL| | 권한 부여 대상(사용자 or 조직)|
| authoritable_target_id| NULL| YES| int(11)| MUL| | 권한 부여 대상의 ID|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_value_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| custom_value_authoritables_authoritable_type_index| authoritable_type| | |
| custom_value_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| custom_value_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_views
사용자 정의 뷰를 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_table_id| | NO| int(10) unsigned| MUL| | 사용자 정의 테이블의 ID|
| view_type| 0| NO| int(11)| | | 0: 시스템 뷰<br>1: 사용자 뷰|
| view_kind_type| 0| NO| int(11)| | | 뷰의 종류(*)|
| view_view_name| | NO| varchar(40)| | | 뷰 표시 이름|
| default_flg| 0| NO| tinyint(1)| | | 1: 기본 뷰|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| custom_options| NULL| YES| longtext| | | 플러그인에서 쓰는 옵션 설정|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

*) 0: 목록 뷰, 1: 집계 뷰, 2: 캘린더 뷰, 3: 조건 뷰, 4: 플러그인, 9: 전체 데이터 뷰

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_views_custom_table_id_foreign| custom_table_id| | |
| custom_views_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| use_view_infobox| 1: 뷰의 정보 상자를 사용한다| 
| view_infobox_title| 정보 상자-제목| 
| view_infobox| 정보 상자-본문| 
| pager_count| 표시 건수| 
| condition_join| 조건의 결합(and,or)| 

## custom_view_columns
사용자 정의 뷰의 자식 테이블. 표시 열을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_view_id| | NO| int(10) unsigned| MUL| | 사용자 정의 뷰의 ID|
| view_column_type| 0| NO| int(11)| | | 0: 사용자 정의 열<br>1: 시스템 열|
| view_column_table_id| | NO| int(10) unsigned| | | 열의 테이블 ID|
| view_column_target_id| NULL| YES| int(11)| | | 열의 ID|
| order| 0| NO| int(10) unsigned| | | 표시 순서|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|
| view_column_name| NULL| YES| varchar(40)| | | 별칭 표시 이름|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_view_columns_custom_view_id_foreign| custom_view_id| | |
| custom_view_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 뷰의 종류 | 코멘트 | 
|---|---|---|
| view_pivot_column_id| 공통| 참조 키 열의 ID| 
| view_pivot_table_id| 공통| 참조 키 열의 테이블 ID| 
| view_group_condition| 집계 뷰| 열 타입| 
| sort_order| 집계 뷰| 정렬| 
| sort_type| 집계 뷰| 정렬 순서(1: 오름차순, -1: 내림차순)| 
| color| 캘린더 뷰| 표시 색| 
| font_color| 캘린더 뷰| 글자색| 
| end_date_target| 캘린더 뷰| 종료일의 열 ID| 
| end_date_type| 캘린더 뷰| 종료일의 열 종류| 

## custom_view_filters
사용자 정의 뷰의 자식 테이블. 데이터 표시 조건을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| NULL| YES| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_view_id| | NO| int(10) unsigned| MUL| | 사용자 정의 뷰의 ID|
| view_column_type| 0| NO| int(11)| | | 0: 사용자 정의 열<br>1: 시스템 열|
| view_column_table_id| | NO| int(10) unsigned| | | 열의 테이블 ID|
| view_column_target_id| NULL| YES| int(11)| | | 열의 ID|
| view_filter_condition| | NO| int(11)| | | 검색 조건의 종류|
| view_filter_condition_value_text| NULL| YES| varchar(1024)| | | 조건 값|
| view_filter_condition_value_table_id| NULL| YES| int(10) unsigned| | | 조건 값의 테이블 ID|
| view_filter_condition_value_id| NULL| YES| int(10) unsigned| | | 조건 값의 열 ID|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_view_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| view_pivot_column_id| 참조 키 열의 ID| 
| view_pivot_table_id| 참조 키 열의 테이블 ID| 

## custom_view_grid_filters
사용자 정의 뷰의 자식 테이블. 뷰의 "필터" 항목 지정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_view_id| | NO| int(10) unsigned| MUL| | 사용자 정의 뷰의 ID|
| view_column_type| 0| NO| int(11)| | | 0: 사용자 정의 열<br>1: 시스템 열|
| view_column_table_id| | NO| int(10) unsigned| | | 열의 테이블 ID|
| view_column_target_id| NULL| YES| int(11)| | | 열의 ID|
| order| 0| NO| int(10) unsigned| | | 표시 순서|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_view_grid_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_grid_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| view_pivot_column_id| 참조 키 열의 ID| 
| view_pivot_table_id| 참조 키 열의 테이블 ID| 

## custom_view_sorts
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| NULL| YES| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_view_id| | NO| int(10) unsigned| MUL| | 사용자 정의 뷰의 ID|
| view_column_type| 0| NO| int(11)| | | 0: 사용자 정의 열<br>1: 시스템 열|
| view_column_table_id| | NO| int(10) unsigned| | | 열의 테이블 ID|
| view_column_target_id| NULL| YES| int(11)| | | 열의 ID|
| sort| 1| NO| int(11)| | | 1: 오름차순<br>-1: 내림차순|
| priority| 0| NO| int(10) unsigned| | | 우선순위|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_view_sorts_custom_view_id_foreign| custom_view_id| | |
| custom_view_sorts_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| view_pivot_column_id| 참조 키 열의 ID| 
| view_pivot_table_id| 참조 키 열의 테이블 ID| 

## custom_view_summaries
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| custom_view_id| | NO| int(10) unsigned| MUL| | 사용자 정의 뷰의 ID|
| view_column_type| 0| NO| int(11)| | | 0: 사용자 정의 열<br>1: 시스템 열|
| view_column_table_id| | NO| int(10) unsigned| | | 열의 테이블 ID|
| view_column_target_id| NULL| YES| int(11)| | | 열의 ID|
| view_summary_condition| 0| NO| int(10) unsigned| | | 집계 타입(*)|
| view_column_name| NULL| YES| varchar(40)| | | 별칭 표시 이름|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

*)1: 합계, 3: 건수, 4: 최솟값, 5: 최댓값

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| custom_view_summaries_custom_view_id_foreign| custom_view_id| | |
| custom_view_summaries_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| view_pivot_column_id| 참조 키 열의 ID| 
| view_pivot_table_id| 참조 키 열의 테이블 ID| 
| sort_order| 정렬| 
| sort_type| 정렬 순서(1: 오름차순, -1: 내림차순)| 

## dashboards
대시보드를 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| dashboard_type| 0| NO| int(11)| | | 0: 시스템 대시보드, 1: 사용자 대시보드|
| dashboard_name| | NO| varchar(256)| MUL| | 대시보드 이름(영숫자)|
| dashboard_view_name| | NO| varchar(40)| | | 대시보드 표시 이름|
| default_flg| 0| NO| tinyint(1)| | | 1: 기본 대시보드|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| dashboards_dashboard_name_index| dashboard_name| | |
| dashboards_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| row1| 대시보드 1행째의 열 수| 
| row2| 대시보드 2행째의 열 수| 
| row3| 대시보드 3행째의 열 수| 
| row4| 대시보드 4행째의 열 수| 

## dashboard_boxes
대시보드의 자식 테이블. 대시보드 안의 표시 아이템을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| dashboard_id| | NO| int(10) unsigned| MUL| | 대시보드의 ID|
| row_no| | NO| int(11)| MUL| | 행 No|
| column_no| | NO| int(11)| MUL| | 열 No|
| dashboard_box_view_name| | NO| varchar(40)| | | 아이템 표시 이름|
| dashboard_box_type| | NO| varchar(255)| | | 아이템 종류|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| dashboard_boxes_column_no_index| column_no| | |
| dashboard_boxes_dashboard_id_foreign| dashboard_id| | |
| dashboard_boxes_row_no_index| row_no| | |
| dashboard_boxes_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 대시보드의 종류 | 코멘트 | 
|---|---|---|
| target_table_id| 공통(시스템은 제외)| 대상 테이블| 
| target_view_id| 공통(시스템은 제외)| 대상 뷰| 
| pager_count| 데이터 목록| 표시(시스템에 맞춤 or 표시 건수)| 
| target_system_id| 시스템| 표시 아이템(*)| 
| content| 시스템| 편집기 본문| 
| html| 시스템| HTML| 
| chart_type| 차트| 차트 종류| 
| chart_axisx| 차트| X축 항목| 
| chart_axisy| 차트| Y축 항목| 
| chart_axis_label| 차트| 라벨을 표시한다(1: X축, 2: Y축)| 
| chart_axis_name| 차트| 항목 이름을 표시한다(1: X축, 2: Y축)| 
| chart_options| 차트| 옵션 설정(1: 0을 기점으로 한다, 2: 범례를 표시한다)| 
| calendar_type| 캘린더| 캘린더의 종류(월별, 목록)| 

*) 1: 가이드라인, 2: Exment 새 소식 목록, 3: 편집기, 4: HTML

## data_share_authoritables
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| authoritable_type| | NO| varchar(255)| MUL| | |
| authoritable_user_org_type| | NO| varchar(255)| MUL| | |
| authoritable_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| data_share_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| data_share_authoritables_authoritable_type_index| authoritable_type| | |
| data_share_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| data_share_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## email_code_verifies
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| login_user_id| NULL| YES| int(10) unsigned| | | |
| verify_type| | NO| varchar(255)| | | |
| email| | NO| varchar(255)| | | |
| verify_code| | NO| varchar(255)| | | |
| valid_period_datetime| | NO| datetime| | | |
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## failed_jobs
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| bigint(20) unsigned| PRI| auto_increment| |
| connection| | NO| text| | | |
| queue| | NO| text| | | |
| payload| | NO| longtext| | | |
| exception| | NO| longtext| | | |
| failed_at| current_timestamp()| NO| timestamp| | | |

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## files
업로드된 파일을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| uuid| | NO| char(36)| PRI| | 고유한 랜덤 문자열|
| file_type| NULL| YES| int(11)| MUL| | 파일의 종류|
| local_dirname| | NO| varchar(255)| MUL| | 보관 파일의 디렉터리 이름|
| local_filename| | NO| varchar(255)| MUL| | 보관 파일의 이름|
| filename| | NO| varchar(255)| MUL| | 원래 파일 이름|
| parent_type| NULL| YES| varchar(255)| MUL| | 부모 데이터의 테이블 이름(영숫자)|
| parent_id| NULL| YES| bigint(20) unsigned| | | 부모 데이터의 ID|
| custom_column_id| NULL| YES| int(11)| | | 사용자 정의 열의 ID|
| custom_form_column_id| NULL| YES| int(11)| MUL| | 사용자 정의 폼 열의 ID|
| options| NULL| YES| longtext| | | 각종 옵션 설정|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| files_custom_form_column_id_index| custom_form_column_id| | |
| files_filename_index| filename| | |
| files_file_type_index| file_type| | |
| files_local_dirname_index| local_dirname| | |
| files_local_filename_index| local_filename| | |
| files_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| uuid| UNIQUE| |

## login_settings
SSO 인증이나 2단계 인증 등의 확장 로그인 설정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| login_view_name| | NO| varchar(255)| | | 로그인 설정 표시 이름|
| login_type| | NO| varchar(255)| | | 로그인 유형|
| active_flg| 0| NO| tinyint(1)| | | 1: 유효|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 로그인 유형 | 코멘트 | 
|---|---|---|
| oauth_provider_type| OAuth| 공급자 유형| 
| oauth_provider_name| OAuth| 공급자 유형(영숫자)| 
| oauth_client_id| OAuth| 클라이언트 ID| 
| oauth_client_secret| OAuth| 클라이언트 시크릿| 
| oauth_scope| OAuth| 스코프| 
| oauth_redirect_url| OAuth| 리다이렉트 URL| 
| saml_name| SAML| SAML 이름(영숫자)| 
| saml_idp_entityid| SAML| IdP Entity ID| 
| saml_idp_sso_url| SAML| IdP 사인온 URL| 
| saml_idp_ssout_url| SAML| IdP 사인아웃 URL| 
| saml_idp_x509| SAML| IdP X 509 Certificate| 
| saml_sp_name_id_format| SAML| SP Name ID Format| 
| saml_sp_entityid| SAML| SP Entity ID| 
| saml_sp_x509| SAML| SP X 509 Certificate| 
| saml_sp_privatekey| SAML| SP Private Key| 
| saml_option_name_id_encrypted| SAML| 1: SP가 보내는 NameID를 암호화한다| 
| saml_option_authn_request_signed| SAML| 1: SP가 보내는 인증 요청에 서명한다| 
| saml_option_logout_request_signed| SAML| 1: SP가 보내는 로그아웃 요청에 서명한다| 
| saml_option_logout_response_signed| SAML| 1: SP가 보내는 로그아웃 응답에 서명한다| 
| saml_option_proxy_vars| SAML| 1: 리버스 프록시 등을 쓰고 있다| 
| ldap_name| LDAP| LDAP 이름(영숫자)| 
| ldap_hosts| LDAP| 호스트 이름| 
| ldap_port| LDAP| 포트 번호| 
| ldap_base_dn| LDAP| 기본 DN(식별 이름)| 
| ldap_search_key| LDAP| 사용자 검색 속성| 
| ldap_account_prefix| LDAP| 로그인 코드 접두사| 
| ldap_account_suffix| LDAP| 로그인 코드 접미사| 
| ldap_use_ssl| LDAP| 1: SSL을 사용한다| 
| ldap_use_tls| LDAP| 1: TLS를 사용한다| 
| mapping_column_XX| 공통| 매핑 설정(XX 부분은 사용자 테이블의 필드 이름)| 
| mapping_user_column| 공통| 계정 검색 열| 
| sso_jit| 공통| 1: 사용자 새로 만들기| 
| jit_rolegroups| 공통| 사용자를 만들 때 부여하는 역할 그룹| 
| update_user_info| 공통| 1: 사용자 정보를 업데이트한다| 
| login_button_label| 공통| 버튼 표시 이름| 
| login_button_icon| SAML, OAuth| 버튼 아이콘| 
| login_button_background_color| 공통| 버튼의 배경색| 
| login_button_background_color_hover| 공통| 버튼의 배경색(마우스를 올렸을 때)| 
| login_button_font_color| 공통| 버튼의 글자색| 
| login_button_font_color_hover| 공통| 버튼의 글자색(마우스를 올렸을 때)| 

## login_users
사용자의 로그인 정보를 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| base_user_id| | NO| int(10) unsigned| MUL| | 사용자 ID|
| login_type| 'pure'| NO| varchar(255)| MUL| | 로그인의 종류(일반, OAuth, SAML 등)|
| login_provider| NULL| YES| varchar(32)| | | 로그인 공급자의 종류|
| password_reset_flg| 0| NO| tinyint(1)| | | 1: 비밀번호를 재설정한다|
| password| | NO| varchar(1000)| | | 비밀번호|
| remember_token| NULL| YES| varchar(100)| | | |
| avatar| NULL| YES| varchar(512)| | | 아바타 이미지의 URI|
| auth2fa_key| NULL| YES| text| | | |
| auth2fa_available| 0| NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| login_users_base_user_id_index| base_user_id| | |
| login_users_login_type_index| login_type| | |
| PRIMARY| id| UNIQUE| |

## migrations
데이터베이스의 마이그레이션 상황을 관리하는 테이블입니다.  
<span class="red bold">※삭제, 내용 변경 등은 절대로 하지 마십시오.</span>
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| migration| | NO| varchar(255)| | | 마이그레이션 파일 이름|
| batch| | NO| int(11)| | | |

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## notifies
알림 설정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| target_id| NULL| YES| int(10) unsigned| MUL| | 알림 대상의 ID(사용자 정의 테이블, 워크플로)|
| notify_name| NULL| YES| varchar(256)| | | 알림 이름(영숫자)|
| notify_view_name| | NO| varchar(256)| | | 알림 표시 이름|
| active_flg| 1| NO| tinyint(1)| | | 1: 유효|
| custom_table_id| | NO| int(10) unsigned| | | (폐지 예정)|
| workflow_id| NULL| YES| int(10) unsigned| | | (폐지 예정)|
| custom_view_id| NULL| YES| int(10) unsigned| | | 조건 뷰의 ID|
| notify_trigger| | NO| int(11)| | | 실행 트리거|
| trigger_settings| NULL| YES| longtext| | | 실행 트리거 설정(별표)|
| notify_actions| NULL| YES| varchar(50)| | | (폐지 예정)|
| action_settings| NULL| YES| longtext| | | 알림 액션 설정(별표)|
| mail_template_id| NULL| YES| int(11)| | | 알림 템플릿 ID|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| notifies_suuid_index| suuid| | |
| notifies_target_id_index| target_id| | |
| PRIMARY| id| UNIQUE| |

#### 실행 트리거 설정
| 키 | 코멘트 | 
|---|---|
| notify_target_column| 날짜 대상 열의 ID| 
| notify_target_table_id| 날짜 대상 열의 테이블 ID| 
| view_pivot_column_id| 참조 키 열의 ID| 
| view_pivot_table_id| 참조 키 열의 테이블 ID| 
| notify_day| 알림일(더하거나 빼는 값)| 
| notify_beforeafter| 알림 전후(-1: 전, 1: 후)| 
| notify_hour| 알림 시간| 
| notify_saved_trigger| 알림 조건 설정| 
| notify_myself| 1: 작업 실행자에게도 알린다| 
| notify_button_name| 버튼 표시 이름| 

#### 알림 액션 설정
| 키 | 코멘트 | 
|---|---|
| notify_action| 실행 액션(*)| 
| notify_action_target| 알림 대상| 
| webhook_url| Webhook URL| 
| mention_here| 1: 멤버 전원에게 알림을 실행| 
| target_emails| 수신 메일 주소| 

*) 1: 이메일, 2: 시스템 내 알림, 3: Slack 알림, 4: Microsoft Teams 알림

## notify_navbars
내비게이션 바나 알림 목록에 표시하는 알림 데이터를 보관하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| notify_id| | NO| int(10) unsigned| MUL| | 알림 설정의 ID|
| parent_type| NULL| YES| varchar(255)| MUL| | 대상 데이터의 테이블 이름(영숫자)|
| parent_id| NULL| YES| bigint(20) unsigned| | | 대상 데이터의 ID|
| target_user_id| | NO| int(10) unsigned| MUL| | 알림 대상 사용자 ID|
| trigger_user_id| NULL| YES| int(10) unsigned| | | 알림의 트리거가 되는 조작을 한 사용자 ID|
| notify_subject| NULL| YES| varchar(200)| | | 알림 제목|
| notify_body| NULL| YES| varchar(2000)| | | 알림 본문|
| read_flg| 0| NO| tinyint(1)| MUL| | 1: 읽음|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| notify_navbars_notify_id_index| notify_id| | |
| notify_navbars_parent_type_parent_id_index| parent_type,parent_id| | |
| notify_navbars_read_flg_index| read_flg| | |
| notify_navbars_target_user_id_index| target_user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_access_tokens
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| client_id| | NO| char(36)| | | |
| name| NULL| YES| varchar(255)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| expires_at| NULL| YES| datetime| | | |

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| oauth_access_tokens_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_api_keys
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| client_id| | NO| char(36)| | | |
| key| | NO| varchar(100)| MUL| | |

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| oauth_api_keys_key_index| key| | |
| PRIMARY| id| UNIQUE| |

## oauth_auth_codes
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| | NO| int(11)| | | |
| client_id| | NO| char(36)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## oauth_clients
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| name| | NO| varchar(255)| | | |
| secret| | NO| varchar(100)| | | |
| redirect| | NO| text| | | |
| personal_access_client| | NO| tinyint(1)| | | |
| password_client| | NO| tinyint(1)| | | |
| api_key_client| 0| NO| tinyint(1)| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| oauth_clients_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_personal_access_clients
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| client_id| | NO| char(36)| MUL| | |
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| oauth_personal_access_clients_client_id_index| client_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_refresh_tokens
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| access_token_id| | NO| varchar(100)| MUL| | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| oauth_refresh_tokens_access_token_id_index| access_token_id| | |
| PRIMARY| id| UNIQUE| |

## password_histories
비밀번호 변경 이력을 보관하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| login_user_id| | NO| int(10) unsigned| MUL| | 대상 사용자 ID|
| password| | NO| varchar(1000)| | | 비밀번호|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| password_histories_login_user_id_index| login_user_id| | |
| PRIMARY| id| UNIQUE| |

## password_resets
비밀번호 재설정을 실행할 때의 임시 데이터를 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| email| | NO| varchar(255)| MUL| | 이메일 주소|
| token| | NO| varchar(255)| | | 임시 액세스 토큰|
| created_at| NULL| YES| timestamp| | | 작성 일시|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| password_resets_email_index| email| | |

## plugins
플러그인을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| uuid| | NO| varchar(255)| UNI| | 고유한 랜덤 문자열|
| plugin_name| | NO| varchar(256)| MUL| | 플러그인 이름(영숫자)|
| plugin_view_name| | NO| varchar(256)| | | 플러그인 표시 이름|
| author| NULL| YES| varchar(256)| | | 작성자|
| plugin_types| NULL| YES| varchar(255)| | | 플러그인의 종류|
| version| NULL| YES| varchar(128)| | | 버전|
| description| NULL| YES| varchar(1000)| | | 설명|
| active_flg| 1| NO| tinyint(1)| | | 1: 유효|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| custom_options| NULL| YES| longtext| | | 사용자 정의 옵션 설정|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| plugins_plugin_name_index| plugin_name| | |
| plugins_uuid_unique| uuid| UNIQUE| |
| PRIMARY| id| UNIQUE| |

#### 각종 옵션 설정
| 키 | 플러그인의 종류 | 코멘트 | 
|---|---|---|
| target_tables| 버튼, 이벤트, 트리거, 문서, 가져오기, 내보내기, 유효성 검사, 뷰| 대상 테이블 이름(영숫자)| 
| event_triggers| 버튼, 이벤트, 트리거| 실행 트리거| 
| icon| 페이지, 뷰, 버튼, 트리거, 문서, 내보내기| 버튼의 아이콘| 
| label| 페이지, 뷰, 버튼, 트리거, 문서, 내보내기| 버튼의 라벨| 
| button_class| 페이지, 뷰, 버튼, 트리거, 문서| 버튼의 HTML class| 
| uri| API, 페이지| URI| 
| endpoint_page| 페이지| 엔드포인트(페이지)| 
| endpoint_api| API| 엔드포인트(API)| 
| batch_hour| 배치| 배치의 실행 시간(시)| 
| batch_cron| 배치| 배치 실행 cron| 
| command_only| 배치| 1: 명령 실행 한정| 
| grid_menu_title| 뷰| 메뉴에서의 제목| 
| grid_menu_description| 뷰| 메뉴에서의 설명문| 
| all_user_enabled| 페이지, 트리거, 문서, API, 대시보드, 가져오기, 내보내기, 버튼| 1: 모든 사용자가 이용 가능| 
| export_types| 내보내기| 내보내기의 종류| 
| export_description| 내보내기| 설명문| 

## public_forms
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| uuid| | NO| char(36)| UNI| | 고유한 랜덤 문자열|
| custom_form_id| | NO| int(10) unsigned| MUL| | 사용자 정의 폼의 ID|
| public_form_view_name| | NO| varchar(256)| | | 공개 폼 표시 이름|
| active_flg| 0| NO| tinyint(1)| | | 1: 유효|
| proxy_user_id| | NO| int(10) unsigned| MUL| | 실행 사용자의 ID|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| public_forms_custom_form_id_foreign| custom_form_id| | |
| public_forms_proxy_user_id_index| proxy_user_id| | |
| public_forms_uuid_unique| uuid| UNIQUE| |

#### 각종 옵션 설정
| 키 | 탭 | 코멘트 | 
|---|---|---|
| validity_period_start| 기본 설정| 공개 유효 기간(from)| 
| validity_period_end| 기본 설정| 공개 유효 기간(to)| 
| use_header| 디자인 설정| 1: 헤더를 사용한다| 
| header_background_color| 디자인 설정| 헤더-배경색| 
| header_logo| 디자인 설정| 헤더-로고| 
| header_label| 디자인 설정| 헤더 문자열| 
| header_text_color| 디자인 설정| 헤더 글자색| 
| background_color_outer| 디자인 설정| 배경색-바깥 틀| 
| background_color| 디자인 설정| 배경색| 
| use_footer| 디자인 설정| 1: 푸터를 사용한다| 
| footer_label| 디자인 설정| 푸터 문자열| 
| footer_text_color| 디자인 설정| 푸터 글자색| 
| use_confirm| 응답 확인·완료 설정| 1: 응답 확인을 사용한다| 
| confirm_title| 응답 확인·완료 설정| 확인 제목| 
| confirm_text| 응답 확인·완료 설정| 확인 텍스트| 
| complete_title| 응답 확인·완료 설정| 완료 제목| 
| complete_text| 응답 확인·완료 설정| 완료 텍스트| 
| complete_link_url| 응답 확인·완료 설정| 완료 링크 대상 URL| 
| complete_link_text| 응답 확인·완료 설정| 완료 링크 대상 텍스트| 
| use_notify_complete_user| 응답 확인·완료 설정| 1: 완료 알림을 일반 사용자에게 보낸다| 
| use_notify_complete_admin| 응답 확인·완료 설정| 1: 완료 알림을 관리자에게 보낸다| 
| error_title| 오류 설정| 오류 제목| 
| error_text| 오류 설정| 오류 텍스트| 
| error_link_url| 오류 설정| 오류 링크 대상 URL| 
| error_link_text| 오류 설정| 오류 링크 대상 텍스트| 
| use_notify_error| 오류 설정| 1: 오류 알림을 보낸다| 
| custom_css| CSS / Javascript| 사용자 정의 CSS| 
| plugin_css| CSS / Javascript| 플러그인(CSS)| 
| custom_js| CSS / Javascript| 사용자 정의 Javascript| 
| plugin_js| CSS / Javascript| 플러그인(Javascript)| 
| use_default_query| 옵션 설정| 1: 초기값을 URL에서 설정할 수 있게 한다| 
| analytics_tag| 옵션 설정| Google 애널리틱스| 
| use_recaptcha| 옵션 설정| 1: Google reCAPTCHA를 사용한다| 

## revisions
업데이트 이력을 보관하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| revisionable_type| | NO| varchar(255)| | | 대상 테이블 이름(영숫자)|
| revisionable_id| | NO| int(11)| MUL| | 대상 데이터 ID|
| revision_no| 0| NO| int(10) unsigned| | | 리비전 No|
| key| | NO| varchar(255)| MUL| | 대상 항목 키|
| old_value| NULL| YES| text| | | 변경 전의 값|
| new_value| NULL| YES| text| | | 변경 후의 값|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| deleted_at| NULL| YES| timestamp| | | 삭제 일시|
| create_user_id| NULL| YES| int(11)| | | 작성 사용자 ID|
| delete_user_id| NULL| YES| int(11)| | | 삭제 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| revisions_key_index| key| | |
| revisions_revisionable_id_revisionable_type_index| revisionable_id,revisionable_type| | |
| revisions_suuid_index| suuid| | |

## role_groups
역할 그룹을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| role_group_name| | NO| varchar(256)| UNI| | 역할 그룹 이름(영숫자)|
| role_group_view_name| | NO| varchar(256)| | | 역할 그룹 표시 이름|
| description| NULL| YES| varchar(1000)| | | 설명|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_groups_role_group_name_unique| role_group_name| UNIQUE| |

## role_group_permissions
역할 그룹의 자식 테이블. 권한 설정을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| role_group_id| | NO| int(10) unsigned| MUL| | 역할 그룹 ID|
| role_group_permission_type| | NO| varchar(255)| MUL| | 권한의 종류(*)|
| role_group_target_id| NULL| YES| int(11)| MUL| | 권한 대상 항목의 ID|
| permissions| NULL| YES| longtext| | | 허용된 조작|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

*) 0: 시스템, 1: 테이블, 3: 플러그인

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_permissions_role_group_id_foreign| role_group_id| | |
| role_group_permissions_role_group_permission_type_index| role_group_permission_type| | |
| role_group_permissions_role_group_target_id_index| role_group_target_id| | |

## role_group_user_organizations
역할 그룹의 자식 테이블. 역할 그룹에 속하는 사용자, 조직을 관리합니다.

### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| role_group_id| | NO| int(10) unsigned| MUL| | 역할 그룹 ID|
| role_group_user_org_type| | NO| varchar(255)| MUL| | 사용자·조직 구분|
| role_group_target_id| NULL| YES| int(11)| MUL| | 대상 사용자 또는 조직의 ID|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_user_organizations_role_group_id_foreign| role_group_id| | |
| role_group_user_organizations_role_group_target_id_index| role_group_target_id| | |
| role_group_user_organizations_role_group_user_org_type_index| role_group_user_org_type| | |

## systems
시스템 설정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| system_name| | NO| varchar(255)| PRI| | 시스템 설정 이름(영숫자)|
| system_value| NULL| YES| text| | | 설정값|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| system_name| UNIQUE| |

## user_settings
로그인 사용자별 설정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| base_user_id| | NO| int(10) unsigned| MUL| | 사용자 ID|
| settings| NULL| YES| longtext| | | 각종 설정값|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| user_settings_base_user_id_index| base_user_id| | |

## workflows
워크플로 설정을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| workflow_type| 0| NO| int(11)| | | 워크플로 종류(0: 범용, 1: 테이블 전용)|
| workflow_view_name| | NO| varchar(30)| | | 워크플로 표시 이름|
| start_status_name| | NO| varchar(30)| | | 시작 상태 이름|
| setting_completed_flg| 0| NO| tinyint(1)| | | 1: 설정 완료됨|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflows_suuid_index| suuid| | |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| workflow_edit_flg| 1: 다음 작업 사용자에게 편집 권한을 부여한다| 

## workflow_actions
워크플로 설정의 자식 테이블. 액션 설정을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| workflow_id| | NO| int(10) unsigned| MUL| | 워크플로 ID|
| status_from| | NO| varchar(255)| | | 실행 전 상태(start 또는 ID)|
| action_name| | NO| varchar(30)| | | 액션 이름|
| ignore_work| 0| NO| tinyint(1)| MUL| | 1: 특수한 액션|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| deleted_at| NULL| YES| timestamp| | | 삭제 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_actions_ignore_work_index| ignore_work| | |
| workflow_actions_workflow_id_index| workflow_id| | |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| work_target_type| 작업 사용자의 지정 방법(action_select: 앞 액션의 실행 사용자가 선택, fix: 미리 설정, get_by_userinfo: 실행 사용자 정보에서 취득)| 
| comment_type| 코멘트 타입(required: 필수, nullable: 선택, not_use: 사용하지 않음)| 
| flow_next_type| 다음 상태로 진행하는 조건(some: X명 이상 실행, all: 전원 실행)| 
| flow_next_count| 다음 상태로 진행하는 데 필요한 인원수| 

## workflow_authorities
워크플로의 액션 설정의 자식 테이블. 액션을 실행할 수 있는 사용자를 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | 대상의 ID|
| related_type| | NO| varchar(255)| | | 대상의 종류(사용자, 조직, 사용자 정의 열, 시스템)|
| workflow_action_id| | NO| int(10) unsigned| MUL| | 액션 설정의 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| workflow_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_authorities_workflow_action_id_index| workflow_action_id| | |

## workflow_condition_headers
워크플로의 액션 설정의 자식 테이블. 액션 분기 설정을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| workflow_action_id| | NO| int(10) unsigned| MUL| | 액션 설정의 ID|
| status_to| | NO| varchar(255)| | | 실행 후의 상태 ID|
| enabled_flg| 0| NO| tinyint(1)| | | 1: 유효|
| options| NULL| YES| longtext| | | 각종 옵션 설정(별표)|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_condition_headers_workflow_action_id_index| workflow_action_id| | |

#### 각종 옵션 설정
| 키 | 코멘트 | 
|---|---|
| condition_join| 조건의 결합(and,or)| 

## workflow_statuses
워크플로 설정의 자식 테이블. 상태 설정을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| workflow_id| | NO| int(10) unsigned| MUL| | 워크플로 ID|
| status_type| 0| NO| int(10) unsigned| MUL| | (폐지 예정)|
| order| | NO| int(10) unsigned| MUL| | 정렬 순서|
| status_name| | NO| varchar(30)| | | 상태 이름|
| datalock_flg| 0| NO| tinyint(1)| | | 1: 데이터 편집 불가|
| completed_flg| 0| NO| tinyint(1)| | | 1: 완료 상태|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_statuses_order_index| order| | |
| workflow_statuses_status_type_index| status_type| | |
| workflow_statuses_workflow_id_index| workflow_id| | |

## workflow_tables
워크플로 설정의 자식 테이블. 이용 설정을 관리합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| workflow_id| | NO| int(10) unsigned| MUL| | 워크플로 ID|
| custom_table_id| NULL| YES| int(10) unsigned| MUL| | 대상이 되는 사용자 정의 테이블의 ID|
| active_flg| 0| NO| tinyint(1)| | | 1: 사용한다|
| active_start_date| NULL| YES| date| | | 사용 시작일|
| active_end_date| NULL| YES| date| | | 사용 종료일|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_tables_custom_table_id_foreign| custom_table_id| | |
| workflow_tables_workflow_id_index| workflow_id| | |

## workflow_values
개별 데이터에 대한 워크플로의 실행 이력을 관리하는 테이블입니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 기본 키|
| suuid| | NO| varchar(20)| MUL| | 20자리의 랜덤 문자열|
| workflow_id| | NO| int(10) unsigned| MUL| | 워크플로 ID|
| morph_type| | NO| varchar(255)| MUL| | Polymorphic 키(종류)|
| morph_id| | NO| bigint(20) unsigned| | | Polymorphic 키(ID)|
| workflow_action_id| NULL| YES| int(10) unsigned| MUL| | 액션 설정의 ID|
| workflow_status_from_id| NULL| YES| int(10) unsigned| MUL| | 실행 전의 상태 ID|
| workflow_status_to_id| NULL| YES| int(10) unsigned| MUL| | 실행 후의 상태 ID|
| comment| NULL| YES| varchar(1000)| | | 코멘트|
| action_executed_flg| 0| NO| tinyint(1)| MUL| | 1: 워크플로 실행 중|
| latest_flg| 0| NO| tinyint(1)| MUL| | 1: 최신 데이터|
| created_at| NULL| YES| timestamp| | | 작성 일시|
| updated_at| NULL| YES| timestamp| | | 업데이트 일시|
| created_user_id| NULL| YES| int(10) unsigned| | | 작성 사용자 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 업데이트 사용자 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_values_action_executed_flg_index| action_executed_flg| | |
| workflow_values_latest_flg_index| latest_flg| | |
| workflow_values_morph_type_morph_id_index| morph_type,morph_id| | |
| workflow_values_suuid_index| suuid| | |
| workflow_values_workflow_action_id_index| workflow_action_id| | |
| workflow_values_workflow_id_index| workflow_id| | |
| workflow_values_workflow_status_from_id_index| workflow_status_from_id| | |
| workflow_values_workflow_status_to_id_index| workflow_status_to_id| | |

## workflow_value_authorities
워크플로 실행 시에 지정된 다음 작업 사용자를 보관합니다.
### 테이블 정의
| 열 이름 | 기본값 | NULL | 형 | 키 | 기타 | 코멘트 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | 대상의 ID|
| related_type| | NO| varchar(255)| | | 대상의 종류(사용자, 조직, 사용자 정의 열, 시스템)|
| workflow_value_id| | NO| int(10) unsigned| MUL| | 워크플로 실행 이력의 ID|

### INDEX 정보
| INDEX 이름 | INDEX 열 | UNIQUE |코멘트 | 
|---|---|---|---|
| workflow_value_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_value_authorities_workflow_value_id_index| workflow_value_id| | |
