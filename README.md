# 삐약삐약 - 복약 알람 앱
## 목차
 - [개요](#개요)
 - [맡은 기능](#맡은-기능)
 - [DB구성](#db구성)
 - [이슈사항](#이슈사항)

## 개요
- 기간 : 2024-07-18 ~ 2024-08-05 (2주)

- 팀 구성 :
   - 총원3명
   - 내 역할 : 팀장, FE/BE
       
<!--
- 기술스택   
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/HTML-D0654C?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/Typescript-3D6AAC?style=for-the-badge&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> 
<img src="https://img.shields.io/badge/-NestJs-ea2845?style=for-the-badge&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&labelColor=52B0E7&logoColor=FFF"> <img src="https://shields.io/badge/MySQL-blue?logo=mysql&style=for-the-badge&logoColor=white&labelColor=blue"> 
-->

- 서비스 소개   
기업 협약프로젝트(with 버터소프트)   
React Native를 사용한 약 알람 앱입니다. 오늘의 알람에 대한 정보, 알람 관리, 복용기록을 제공하는 앱입니다.


 

## 맡은 기능
- **메인 탭**
    - 오늘의 알람 표시
        - 전체 알람 목록에서 오늘 날짜의 알람만 필터링해 보여주며, 날짜 변경에 따라 알람 리스트가 자동으로 갱신되도록 상태 관리.
    - 카테고리별 알람 필터링
        - 상태 변수를 사용해 '약', '물', '기타' 등 카테고리를 선택해 특정 카테고리에 해당하는 알람만 필터링해 표시.

- **복용 기록 탭**
    - 복용 기록 달력 표시
        - react-native-calendars 라이브러리로 복용 기록을 달력 형태로 구현해 특정 날짜에 알람이 있는 경우 달력에 파란색 점 표시.
    - 선택 날짜의 복용 기록 조회
        - 사용자가 달력에서 날짜를 선택하면 해당 날짜의 복용 기록을 필터링해 조회하도록 구현. 특정 날짜의 알람 정보를 카테고리별로 나누어 보여주어 필요한 정보를 빠르게 찾을 수 있도록 구성.
    - 복용 여부 수정
        - 조회된 알람 목록에서 복용 여부를 체크하거나 수정할 수 있는 기능을 제공. 사용자의 수정 요청을 받아 백엔드 서버에 데이터가 즉시 업데이트되도록 하고, 이를 통해 데이터가 일관성 있게 관리되도록 설계.

- **RDS를 통한 MySQL DB 세팅 및 관리**
    - Amazon RDS의 MySQL DB에 알람 및 복용 기록 데이터를 저장하고, 외부 접근을 위해 MySQL 포트를 허용하는 인바운드 규칙 설정.





## DB구성
<!--
<img src='https://github.com/user-attachments/assets/b4a739d2-5340-41e0-9a1a-e07fe413fdb1' />
-->
![image](https://github.com/user-attachments/assets/80603910-e1f2-416b-a11a-0e463fd537ef)



 테이블명 |  설명 |
:------------: | :-----------: |
 userDB | 사용자의 정보 |
 pushTokens | 디바이스 토큰 |
alarms | 알람 |
days | 알람이 울릴 요일 정보 |
items | 알람 내용 |
alarmLogs | 복용 기록(날짜 및 시간) |
alarmLogItems |  복용 기록 내용 |
 



## 이슈사항
 이슈사항 |  해결방안|
:------------: | :-----------: |
 유저가 다른 디바이스로 로그인하거나 토큰 값이 변경된다면 알람이 울리지 않는 문제가 발생. | 유저의 디바이스 토큰을 별도의 테이블로 분리하여, 하나의 유저가 여러 개의 디바이스 토큰을 가질 수 있도록 해 해결. |
 소셜 로그인 유저와 일반 회원가입 사용자를 판별할 수 없는 문제 발생. | 소셜 로그인 판별 컬럼을 추가하고, 이메일을 통한 일반 로그인과 소셜 로그인을 통한 로그인을 구분하는 로직을 도입하여 해결. |
 주기 알람을 특정 날자에 기록하기 어려운 문제 발생. | 복용 기록 달력에 관한 테이블을 2개 추가해 DB 설계 수정 및 특정 유저의 알람정보를 가공하는 로직을 추가해 해결. |
