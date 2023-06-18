## SPLASH-SPLASH (수영장 커뮤니티)
- 주제: 실시간 채팅과 모임을 만들 수 있는 커뮤니티 서비스

 - 실시간 채팅을 할 수 있어요.
 - 지도를 통해 모임 위치를 쉽고 빠르게 확인할 수 있어요.
 - 커뮤니티에서 자유로운 글과 다중 이미지를 올릴 수 있어요.
 
 #### 바로가기 👉 

</br>

## 📚 Project Structure


### 🛠 Stacks

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"> <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white"> <img src="https://img.shields.io/badge/Django_rest_framework-A50E15?style=for-the-badge&logo=Django&logoColor=white">  <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white">  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"> <img src="https://img.shields.io/badge/Amazon_Lightsail-ff9900?style=for-the-badge&logo=AmazonEC2&logoColor=white"> <img src="https://img.shields.io/badge/React-569A31?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Ant design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 

</br>

## 🤝 Project Rules
</br>

###  DB

<img width="1166" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/a267af29-f6ae-41b1-be8b-ecdd2f379093">
</br>


## 📂 Structure

```
📦frontend
 ┣ 📂public
 ┃ ┗ ...
 ┗  📂src
   ┣ 📂assets
   ┃ ┣ ...
   ┣ 📂components
   ┃ ┣ 📂accounts
   ┃ ┃ ┣ 📜KakaoSignupForm.js
   ┃ ┃ ┣ 📜LoginForm.js
   ┃ ┃ ┣ 📜OAuth.js
   ┃ ┃ ┣ 📜OAuth2RedirectHandler.js
   ┃ ┃ ┣ 📜ProfileEditForm.js
   ┃ ┃ ┣ 📜SignupForm.js
   ┃ ┃ ┣ 📜UserArticleLayout.js
   ┃ ┃ ┗ 📜UserArticleList.js
   ┃ ┣ 📂chat
   ┃ ┃ ┣ 📜ChatBubble.js
   ┃ ┃ ┗ 📜ChatLayout.js
   ┃ ┣ 📂meet
   ┃ ┃ ┣ 📜CalendarLayout.js
   ┃ ┃ ┣ 📜DetailMap.js
   ┃ ┃ ┣ 📜MeetDetailLayout.js
   ┃ ┃ ┣ 📜MeetEditForm.js
   ┃ ┃ ┣ 📜MeetListLayout.js
   ┃ ┃ ┣ 📜MeetNewForm.js
   ┃ ┃ ┗ 📜WriteMap.js
   ┃ ┣ 📂post
   ┃ ┃ ┣ 📜Comment.js
   ┃ ┃ ┣ 📜CommentList.js
   ┃ ┃ ┣ 📜PostDetailLayout.js
   ┃ ┃ ┣ 📜PostEditForm.js
   ┃ ┃ ┣ 📜PostListLayout.js
   ┃ ┃ ┗ 📜PostNewForm.js
   ┃ ┣ 📜AppLayout.js
   ┃ ┣ 📜Footer.js
   ┃ ┣ 📜Header.js
   ┃ ┣ 📜HomeMeetList.js
   ┃ ┣ 📜HomePostList.js
   ┃ ┣ 📜ImageSlider.js
   ┃ ┗ 📜SideMenu.js
   ┣ 📂pages
   ┃ ┣ 📂accounts
   ┃ ┃ ┣ 📜index.js
   ┃ ┃ ┣ 📜KakaoSignup.js
   ┃ ┃ ┣ 📜Login.js
   ┃ ┃ ┣ 📜Profile.js
   ┃ ┃ ┣ 📜Signup.js
   ┃ ┃ ┗ 📜UserArticle.js
   ┃ ┣ 📂meet
   ┃ ┃ ┣ 📜index.js
   ┃ ┃ ┣ 📜MeetDetail.js
   ┃ ┃ ┣ 📜MeetEdit.js
   ┃ ┃ ┣ 📜MeetNew.js
   ┃ ┃ ┗ 📜MeetsList.js
   ┃ ┣ 📂post
   ┃ ┃ ┣ 📜index.js
   ┃ ┃ ┣ 📜PostDetail.js
   ┃ ┃ ┣ 📜PostEdit.js
   ┃ ┃ ┣ 📜PostList.js
   ┃ ┃ ┗ 📜PostNew.js
   ┃ ┣ 📜About.js
   ┃ ┣ 📜Home.js
   ┃ ┗ 📜index.js
   ┣ 📂style
   ┃ ┣ 📂accounts
   ┃ ┃ ┣ 📜Login.scss
   ┃ ┃ ┗ 📜Signup.scss
   ┃ ┣ 📂meet
   ┃ ┃ ┣ 📜CalendarLayout.scss
   ┃ ┃ ┗ 📜Map.scss
   ┃ ┣ 📂post
   ┃ ┃ ┣ 📜PostLayout.scss
   ┃ ┃ ┗ 📜PostList.scss
   ┃ ┣ 📜AppLayout.scss
   ┃ ┣ 📜ChatBubble.scss
   ┃ ┣ 📜ChatLayout.scss
   ┃ ┗ 📜ImageSlider.scss
   ┣ 📂utils
   ┃ ┣ 📜LoginRequiredRoute.js
   ┃ ┣ 📜TokenRefresh.js
   ┃ ┣ 📜TokenVerify.js
   ┃ ┗ 📜useLocalStorage.js
   ┣ 📜Constants.js
   ┣ 📜index.css
   ┣ 📜index.js
   ┣ 📜state.js
   ┣ 📜store.js
   ┗ ...

📦backend
 ┣ 📂.config
 ┃ ┣ 📂nginx
 ┃ ┃ ┗ 📜mystie.conf
 ┃ ┗ 📂uwsgi
 ┃ ┃ ┣ 📜mysite.ini
 ┃ ┃ ┗ 📜uwsgi.service
 ┣ 📂accounts
 ┃ ┣ 📜models.py
 ┃ ┣ 📜serializers.py
 ┃ ┣ 📜urls.py
 ┃ ┣ 📜views.py
 ┃ ┗ ...
 ┣ 📂chat
 ┃ ┣ 📜consumers.py
 ┃ ┣ 📜models.py
 ┃ ┣ 📜routing.py
 ┃ ┣ 📜serializers.py
 ┃ ┣ 📜urls.py
 ┃ ┣ 📜views.py
 ┣ 📂config
 ┃ ┣ 📂settings
 ┃ ┃ ┣ 📜common.py
 ┃ ┃ ┣ 📜dev.py
 ┃ ┃ ┗ 📜prod.py
 ┃ ┣ 📜asgi.py
 ┃ ┣ 📜urls.py
 ┃ ┣ 📜wsgi.py
 ┃ ┗ ...
 ┣ 📂media
 ┃ ┗ ...
 ┣ 📂meet
 ┃ ┣ 📜models.py
 ┃ ┣ 📜permissions.py
 ┃ ┣ 📜serializers.py
 ┃ ┣ 📜urls.py
 ┃ ┣ 📜views.py
 ┃ ┗ ...
 ┣ 📂post
 ┃ ┣ 📜models.py
 ┃ ┣ 📜permissions.py
 ┃ ┣ 📜serializers.py
 ┃ ┣ 📜urls.py
 ┃ ┣ 📜views.py
 ┃ ┗ ...
 ┗📜manage.py
```
</br>


## 💻 Development


### 로그인/회원가입

- Simple JWT 를 사용한 vaildation 로그인
- 소셜 로그인(카카오톡)

</br>

### 채팅 기능

- 로그인 한 유저 실시간 채팅 기능
- 최대 50개의 채팅 목록 조회

</br>

### 모임 게시판

- 카카오 지도 API 활용 
- 지도 검색을 통해 편리한 장소 검색 기능
- 참여자 목록 조회 기능

</br>

### 커뮤니티 게시판

- 자유로운 글을 적는 커뮤니티
- 게시글 목록 조회
- 게시글 작성(Image Preview 기능 포함)
- 게시글 좋아요와 댓글 기능

</br>

### 프로필 페이지

- 사용자 정보 조회
- 내 프로필 정보 조회 / 수정 가능
- 사용자가 쓴 커뮤니티 게시글 모아보기

</br>


## 🌠 Service View

<details>
<summary>회원가입, 로그인, 카카오 추가 정보 입력</summary>
<div markdown="1">
 
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/9902d34d-0771-401f-84c4-99413de5becb)
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/c90bb954-14ab-497f-ad16-fd77daa7afbd)
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/24d1bb3a-fef3-481f-beaa-e4ea9a60bede)

</div>
</details>

<details>
<summary>메인 페이지</summary>
<div markdown="2">
 
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/06f0d0e8-bc8c-436c-ba9c-1d330cc1c2bd)

</div>
</details>


<details>
<summary>커뮤니티 - 작성/수정/상세/리스트</summary>
<div markdown="3">
 
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/ca8cd946-2663-42f0-89f2-592f7902f6c5)
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/c1644654-e59d-4e26-8ccc-af660d2bf5dd)
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/de9a098e-0185-4bb2-b5f2-9a29ac905678)
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/6e65b57e-02b3-44d4-aa28-6a167df6602d)

</div>
</details>

<details>
<summary>모임게시판 - 작성/수정/상세/리스트</summary>
<div markdown="4">

![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/f3a9df6f-d78c-42c8-bd91-963f50364dce)
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/f4153268-7d34-49b5-8c5c-434eeaa4c6dd)
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/bf1f8f00-3d22-41c6-99e8-88e4ebad1371)
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/9f77d7d4-7761-4d1a-a2b7-41eba6aa26c6)

</div>
</details>

<details>
<summary>마이 프로필 - 게시글/작성한 글 모아보기, 프로필 수정</summary>
<div markdown="5">

![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/30442f8f-4ac0-4589-adcd-ddba9832f7a6)
![image](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/5882c3f6-46fa-4d93-b13d-800e666c36d4)

</div>
</details>

<details>
<summary>채팅</summary>

![ezgif com-video-to-gif](https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/a71af43f-9798-4207-87ca-ec4c0a84a528)

</details>
</br>

## 🛠 Trouble Shooting

<details>
<summary>🐛 OAuth 로그인 토큰 확인 불가</summary>
<div>
</br>
- 상황: 카카오 로그인 후 토큰이 확인이 안되어 로그아웃이 됨.
</br>
- 해결: 카카오 측으로 보내는 access token과 jwt access token이 다르다는 것을 알게됨.
<br/>
    카카오 로그인을 하면 새로운 jwt를 발급하여 해결.

</div>
</details>


<details>
<summary>🐛 다중 이미지 수정</summary>
<div>
</br>
- 상황: 수정을 통해 새로운 사진을 추가하면 DB에 추가 되지 않음.
</br>
- 해결: 게시판 사진을 모두 삭제한 후, 수정할 때 들어오는 사진을 다시 DB에 넣어주는 로직으로 변경</br>

</div>
</details>


<details>
<summary>🐛 채팅 수신에러</summary>
<div>
</br>
- 상황: 웹소켓에서는 메시지를 수신이 되었지만, 화면에는 나타나지 않는 현상이 있었음.
</br>
- 해결: 메시지를 수신하는 로직에서 메시지를 읽어오는데에 성공하면, 최근 데이터를 불러오는 것으로 로직을 수정했음.
</div>
</details>

<details>
<summary>🐛 카카오 추가정보 입력</summary>
<div>
</br>
- 상황: 카카오 로그인 시, 사이트에 회원가입이 된 후 추가 정보 입력이 안되었음.
</br>
- 해결: 카카오 로그인 후, DB에 추가정보가 없다면 추가정보 입력 화면으로 이동되게하여, 추가정보를 받을 수 있게 하였음.


</div>
</details>
