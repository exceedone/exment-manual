# composer 업데이트
composer를 버전 1에서 버전 2로 업데이트하는 절차입니다.  
composer는 Exment의 설치와 업데이트에서 사용하는 라이브러리입니다.

> 만일 이 업데이트 뒤에 Exment를 업데이트할 때 오류가 나오게 된 경우에는 [여기](https://github.com/exceedone/exment/issues/849)에 알려 주시면 대단히 감사하겠습니다.  

## 업데이트의 흐름
1. 현재 composer의 버전을 확인한다(이미 2.X.X이면 이후는 필요 없습니다)
2. laravel/framework의 버전을 확인한다(오래된 경우에는 먼저 업데이트합니다)
3. composer를 업데이트한다

## composer 2에 대하여
2020/10에 composer의 ver2가 릴리스되었습니다.  
ver2에서는 다음 점이 좋아졌습니다.

- 속도와 메모리 사용량 양쪽 모두에서 크게 개선
- require/remove 및 부분 업데이트가 훨씬 빠름

![composer2](../ja/img/update/composer2.png)

인용:  
https://blog.packagist.com/composer-2-0-is-now-available  
https://qiita.com/ucan-lab/items/289009ffe5bb417c808e  

Exment에서도 composer2로 설치와 업데이트를 검증하여 문제없이 실시할 수 있음을 확인했습니다.  
환경에 따라 다르지만, composer1에서 자주 일어나던 메모리 과다 사용이 나아질 것으로 기대할 수 있습니다. 그래서 composer2로 업데이트하는 것을 권장합니다.


## 업데이트 절차
composer2로 업데이트하려면 몇 가지 절차가 필요합니다.  
<span class="red">※ 가능하면 개발 환경 등에서 같은 절차를 시험한 뒤에 운영 환경에서 진행하십시오.</span>

### 현재 composer 버전 확인

- 현재 composer의 버전을 다음 명령으로 확인합니다. (어느 폴더에서 실행해도 됩니다)

```
composer --version
```

| 결과 | 할 일 |
|---|---|
| composer2.X.X이고 Exment의 업데이트도 문제없이 끝났다 | composer 업데이트는 끝나 있습니다. 이후의 절차는 필요 없습니다 |
| composer1.X.X | 이후의 절차를 진행하십시오 |

### 현재 laravel/framework 버전의 확인과 업데이트

Exment에서 사용하는 laravel/framework의 버전을 확인합니다.  
※ 같은 서버에 Exment를 여러 개 설치한 경우에는 모든 Exment에서 다음 절차를 진행하십시오.  

- 다음 명령을 Exment의 루트 폴더에서 실행합니다.

```
php artisan --version
# 아래와 같은 결과가 표시됩니다
# Laravel Framework 5.6.39
```

- 결과가 version5.6.40 이상일 때는 아무것도 할 필요가 없습니다.

- 결과가 version5.6.40 미만일 때는 다음 명령으로 프로젝트 전체를 업데이트합니다.  

```
composer update
```

### composer 업데이트

- composer의 버전을 2.X.X로 업데이트합니다.

```
# 아래 중 하나를 실행하십시오
composer self-update --2
composer selfupdate --2
```

- 업데이트 뒤에 문제가 생긴 경우에는 다음 명령으로 version1.X.X로 되돌릴 수 있습니다.  
다만 이 명령은 **Exment 폴더가 아닌 경로**에서 실행하십시오. Exment 폴더 안에서 실행하면 오류가 나는 것 같습니다.

```
composer self-update --1
composer selfupdate --1
```
