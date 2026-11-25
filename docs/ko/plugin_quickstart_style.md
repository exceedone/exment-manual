# 플러그인(스타일)
Exment의 화면에서 독자적인 스타일시트(css)를 읽어 들여, 디자인을 변경하는 플러그인입니다.

## 만드는 방법
여기서는 샘플로, 사이트 전체의 글자색을 빨간색으로 하는 스타일을 만듭니다.  
![스타일](../img/plugin/plugin_style1.png)  

### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json
{
    "plugin_name": "SetStyle",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc544",
    "plugin_view_name": "스타일 테스트",
    "description": "스타일 테스트",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "style",
    "cdns": []
}
~~~

- plugin_name은 반각 영숫자로 적어 주십시오.
- uuid는 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type은 style이라고 적어 주십시오.  
- (선택)cdns는 관련 라이브러리를 CDN으로 읽어 들이는 경우에 적습니다. http 또는 https의 전체 경로로, 배열로 적어 주십시오.

### css 파일 만들기
- 아래와 같은 css 파일을 만듭니다. 이름은 반각 영숫자로 자유롭게 붙여도 됩니다. 이 샘플에서는 "style.css"로 하고 있습니다.

~~~ css
/* style.css */
*{
    color:red !important;
}
~~~

- 만든 스타일시트는 "public" 폴더 안에 배치해 주십시오.  
배치하는 스타일시트는 확장자가 "css"이면 여러 개 배치할 수 있습니다. 관련 라이브러리가 필요한 경우에는 모두 폴더 안에 배치해 주십시오.  

### zip으로 압축
zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- SetStyle.zip
    - config.json
    - public 폴더
        - style.css

### 플러그인 업로드
만든 zip 파일을 [플러그인](/ko/plugin) 페이지에서 업로드해 주십시오.

### 주의점
- 업로드한 css 파일은 **화면을 처음 읽어 들일 때 모두 읽어 들입니다.**  
css 파일이 호출되는 순서는 정해져 있지 않습니다(기본적으로 이름순. 다만 jquery, bootstrap, adminLTE의 css보다는 뒤).
읽어 들이는 순서에 의존하지 않는 방식으로 구현해 주십시오.

- 각 테이블의 데이터에는 "custom_value_(테이블 이름)"이라는 이름의 클래스가 정의되어 있습니다.  
특정 테이블에서만 스타일을 적용하고 싶은 경우에는 이 클래스 이름으로 좁혀 주십시오.
※예: "사용자" 화면의 경우: "custom_value_user", "조직" 화면의 경우: "custom_value_organization"


### 샘플 플러그인
[샘플 디자인](https://github.com/exment-git/plugin-sample/tree/main/style/SetStyle)
