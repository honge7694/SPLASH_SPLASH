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
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/5b62358b-ac50-4c9d-b572-5ea365aaeb90"> <img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/8afb8660-7a74-418c-9c85-9cc9cd7e6064">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/2cdf1d80-378d-43ae-92f6-251e20d8ff49">
</div>
</details>

<details>
<summary>메인 페이지</summary>
<div markdown="2">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/e961d621-27bf-4e59-97f0-7a21e2ef5c6c">
</div>
</details>


<details>
<summary>커뮤니티 - 작성/수정/삭제/리스트</summary>
<div markdown="3">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/65aa294c-b983-4efe-93b5-202749933080">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/7b96c74d-c2a3-4444-85f0-b600569177b3">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/2fa824c6-fcc5-47e1-a175-6c303bdeb10e">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/182c9595-57ba-46e0-bcaf-0f31a1b190c1">
</div>
</details>

<details>
<summary>모임게시판 - 작성/수정/삭제/리스트</summary>
<div markdown="4">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/1530e9de-4d92-43d1-a688-a1a2628d1e65">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/d2b1c552-2455-481d-9d16-e6c1e6a0c04c">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/00a8ede5-a350-4e97-9623-ac5bbdb8f09b">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/f9d44869-d60d-4ad1-be45-7cb347a175a5">
</div>
</details>

<details>
<summary>마이 프로필 - 게시글/작성한 글 모아보기, 프로필 수정</summary>
<div markdown="5">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/207a3afc-c5c6-46aa-a203-4d9b4711bbb3">
<img width="364" src="https://github.com/honge7694/SPLASH_SPLASH/assets/76715487/c13aa271-2563-433b-8e93-64a54682784b">
</div>
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
