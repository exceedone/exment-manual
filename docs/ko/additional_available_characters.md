# 사용자 정의 열 종류 "한 줄 텍스트"의 설정 "사용 가능 문자"에 자체 옵션 추가
사용자 정의 열 종류 "한 줄 텍스트"에서는 설정 "사용 가능 문자"에 다음과 같은 항목이 표시됩니다.

![사용 가능 문자](../img/quickstart/available_characters1.png)

이 페이지에서는 여기에 자체 항목(예: "ひらがな"(히라가나), "カタカナ"(가타카나))을 추가하는 절차를 설명합니다.

### 설정 절차 

**(1)** 프로젝트의 루트 폴더에 있는 "app/Exment" 폴더를 열고, 그 안의 "bootstrap.php" 파일을 엽니다.

> "app/Exment/bootstrap.php" 파일이 없으면 폴더와 php 파일을 직접 만드십시오.

**(2)** 다음과 같은 내용을 추가하고 저장합니다.

``` php
\Exceedone\Exment\Model\CustomColumn::customAvailableCharacters([
    [
        'key' => 'hiragana', // 키. 영숫자
        'label' => 'ひらがな', // 화면에 표시할 문구
        'regex' => 'ぁ-ん', // 허용할 문자열을 정규 표현식으로 기재
    ],
    [
        'key' => 'katakana',
        'label' => 'カタカナ',
        'regex' => 'ァ-ン',
    ],
]);
```

**(3)** "사용 가능 문자"에 추가한 선택지가 표시됩니다.

![사용 가능 문자](../img/quickstart/available_characters2.png)


이것으로 설정은 끝입니다.


[←추가 설정 목록으로 돌아가기](/ko/quickstart_more)
