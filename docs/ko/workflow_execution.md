# 워크플로 실행
워크플로의 액션(신청·승인 등)을 사용자가 실행하는 순서입니다.  
먼저 관리자가 [워크플로 설정](/ko/workflow_setting)을 해 두어야 합니다.

## 워크플로 실시
1. 데이터를 열면, 현재 상태와 다음에 액션을 할 작업 사용자·조직이 표시됩니다.
![워크플로 화면](../img/workflow/workflow_data2.png)  


2. 로그인 사용자에게 다음 액션을 할 권한이 있을 때는, 페이지 오른쪽 위에 액션 버튼이 표시됩니다.  
![워크플로 화면](../img/workflow/workflow_data1.png)  


3. 버튼을 클릭하면, 액션의 실행 확인 대화 상자가 표시됩니다.  
![워크플로 화면](../img/workflow/workflow_data3.png)  

   - <span class="heading_smaller_than_h5">액션 이름</span>  
   이번에 실행할 액션의 이름이 표시됩니다.  

   - <span class="heading_smaller_than_h5">상태</span>  
   이 액션을 실행하기 전과 후의 상태가 표시됩니다.  

   - <span class="heading_smaller_than_h5">다음 작업 사용자</span>  
   이 액션을 실행한 뒤의 작업 사용자·조직이 표시됩니다.  

   - <span class="heading_smaller_than_h5">코멘트</span>  
   액션을 실시할 때의 코멘트를 입력하십시오.  

4. 내용에 문제가 없으면 [전송]을 클릭합니다. 액션이 실행됩니다.

5. 액션이 실행되면 "현재 상태"나 "현재 작업 사용자"가 바뀝니다.  
※워크플로 설정에 따라서는 "현재 상태"에 자물쇠 표시가 나옵니다. 그때는 데이터가 잠겨, 편집이나 삭제를 할 수 없게 됩니다.

![워크플로 화면](../img/workflow/workflow_data4.png)  

※v7.1.0 이후에는 데이터 목록에서 체크한 여러 데이터의 액션을 한꺼번에 실행할 수도 있습니다. 자세한 내용은 [데이터 목록의 조작 도구](/ko/data_grid_tools)를 보십시오.

## 미처리 작업의 확인
자신이 액션을 실행해야 하는 데이터는, 페이지 오른쪽 위의 미처리 작업 아이콘이나 미처리 작업 목록 화면에서 모든 테이블의 것을 한꺼번에 확인할 수 있습니다.  
자세한 내용은 [미처리 작업](/ko/workflow_task)을 확인하십시오.

## 워크플로 데이터의 리셋

진행 중인 워크플로의 데이터는 리셋할 수 있습니다. 어떤 이유로 워크플로를 진행할 수 없게 되었을 때 실행하십시오.  
리셋은 명령으로 합니다. 프로젝트의 루트 디렉터리에서 아래의 명령을 실행하십시오.

~~~
php artisan exment:workflow-clear (테이블 이름) (ID)

# 실행 예: 테이블 이름 "estimate", ID "6"인 데이터의 워크플로 진행을 리셋하는 경우
php artisan exment:workflow-clear estimate 6

# 실행 예: 테이블 이름 "syusseki", ID "600"인 데이터의 워크플로 진행을 리셋하는 경우
php artisan exment:workflow-clear syusseki 600
~~~
