# Wetube Note

 asset:개발에 필요한 각종 참고 자료나 어느정도 프로토타입 이상 완성된 작업물

### 1. 서버(server)

- 물리적으로 늘 켜져있는 컴퓨터
- 인터넷에 연결된 내 접속 요청에 응답하는 컴퓨터
- 접속을 받아주는 무언가

### 2. Node.js

- 확장성 있는 네트워크 애플리케이션 개발에 사용되는 소프트웨어 플랫폼
- 백엔드 서버기술로서 프론트가 아닌 백엔드에서도 자바스크립트 기술을 쓸 수 있게 고안된 언어
- 데이터를 다루는 성능이 좋음(알림, 실시간 처리, 채팅 등)
- 하드웨어에 접근할 수는 없음
- 데이터 저장, 생성, 삭제 등 빠르게 보여주고 싶을 때 사용
- 0부터 시작해서 모든걸 사용자가 컨트롤 가능

### 3. express

- Node.js의 프레임워크
- 마지막 커밋이 오래됨 -> 그만큼 완성에 가까운 프레임워크라는 뜻
  ```console
  $ npm init  // package.json 생성
  $ npm install express
  ```
- json : 자바스크립트에서 정보를 담는 방식
  ```js
  // package.json
  ...
  "scripts" : {
      "start":"index.js"
      // npm run start 할 때 마다 start 기준의 파일이 실행된다.
  ...
  }
  ```
- express routing
- 라우팅 : URI가 클라이언트 요청에 응답하는 방식
- GET, POST

  - HTTP프로토콜을 이용해서 서버에 무언가를 전달할 때 사용하는 방식
  - GET
    - 주소줄에 값이 ?뒤에 쌍으로 이어붙고, URL에 이어붙기 때문에 길이 제한이 있어서 많은 양의 데이터는 보내기 어렵다. POST 는 숨겨져서(BODY 안에) 보내진다.
    - 브라우저가 페이지를 읽어올 때 사용된다.
  - POST
    - 많은 양의 정보를 보내기에도 적합하다.(용량제한은 여전함)
    - form을 이용해서 submit을 할 때 사용된다.

  ```js
  const express = require("express");
  //requre 는 module.exports를 리턴한다 (함수로 모듈을 가지고 온다.)
  const app = express();
  const PORT = 4000; // PORT 번호

  const handlehome = (req, res) => {
    console.log(req);
    console.log("핸들홈");
    res.send("Hello From Home");
  };

  const handleProfile = (req, res) => {
    res.send("You are profile");
  };

  app.get("/", handlehome);
  //root로 접속한 경로에 response로 helloworld를 받아서 출력해준다
  app.get("/profile", handleProfile);
  //경로 http://localhost:4000/profile

  console.log("start");

  const handleListening = () => {
    //애로우 함수로 펑션을 만들엇다.
    console.log(`Listening on : http://localhost:${PORT}`);
  };
  //port번호 설정
  app.listen(PORT, handleListening);

  //node 실행 방법 node index.js
  ```

- express 를 불러와서 app 변수에 담아서 port번호달고, url 경로를 맵핑시켜주기
- express는 URI 경로를 쉽게 해주고, URI 경로마다 호출해서 보여줄 함수들을 쉽게 정리할 수 있다.

### 4. babel

- ES6/ES7 코드를 ECMAScript5 코드로 transpiling 하기 위한 도구
- 바벨을 사용하기 위한 세 가지 모듈이 필요.
  1.  babel-node : CLI 도구 중 하나 --> node 에서 쓸거니까 요거 설치
      ```console
      $ npm install @babel/node
      ```
  2.  @babel/preset-env : 바벨의 preset 중 하나로 es6+ 이상의 자바스크립트를 각 브라우저/노드 환경에 맞는 코드로 변환시켜준다. -env는 가장 최신 버전
      ```console
      $ npm install @babel/preset-env
      ```
  3.  @babel/core: 바벨의 핵심 파일, 바벨의 다른 모듈들이 종속성을 가진다.
- .babelrc 파일 만들기 : node에서 동작하려는 사용자가 원하는 모든 설정을 집어 넣을 수 있음
- babel document에서는 요렇게 쓰라고 되어있음
  ```js
   {
       "presets": [
           [
               "@babel/preset-env",
               {
                   "useBuiltIns": "entry",
                   "corejs": "core-js@3"
               }
           ]
       ]
   }
  ```
- node에 적용시키려면 package.json 파일을 수정해줘야 한다.
  ```js
  ...
  "scripts": {
      "start":"babel-node index.js"
   }
  ...
  ```

### 5. nodemon

- 소스를 변경할 때마다 서버를 일일이 재시작할 필요없이 자동으로 재시작 해주는 패키지
  ```console
  $ npm install nodemon -D
  // -D는 이 레퍼지토리인 패키지를 실행하려면 필요한게 아닌 개발자가 필요한 옵션을 뜻함
  ```
  ```js
  // package.json
  ...
   "devDependencies": {
       "nodemon": "^1.19.0",
   }
  ...
  // depedencies가 아니라 devDependencies임.
  ```
- 코드를 저장하면 재시작 하고 나서 Babel코드가 변화를 감지하고 또 재시작됨(총 2번 재시작이 됨..) --> nodemon 실행에 delay를 줘서 한번만 실행되도록 하기
  ```js
  // package.json
  "scripts": {
      "start":"nodemon --exec babel-node init.js --delay 2"
   }
  ```

### 6. middleware

- 요청 url의 response를 받기 전에 실행 될 함수들
- next() 이용해서 middleware인 betweenHome 함수를 실행할 수 있다.
- 요청 url에 들어갈 때마다 미들웨어 함수 실행
  ```js
  const app = express();
  const betweenHome = (req, res, next) => {
    console.log("between hom");
    next();
  };
  const handlehome = (req, res) => res.send("Hello From Home");
  app.get("/", betweenHome, handlehome);
  ```
- .use()라는 메소드를 통해 모든 요청 url에 대해 설정 가능하다.
- 라우팅 메소드 전에 써줘야만 그 라우팅에 대해서만 작동하고, 이전에 쓴 라우팅 메소드들이 대해선 동작하지 않는다.
  ```js
  app.get("/profile", handleProfile);
  // /profile url은 미들웨어 동작하지 않는다.
  app.use(betweenHome);
  app.get("/", handleHome);
  ```
- middleware의 라이브러리

  1.  morgan

      - 애플리케이션에서 발생하는 모든 일들을 로깅(콘솔에 출력)해준다.
        ```console
        $ npm install morgan
        ```
      - morgan의 인자로는 여러가지가 존재 (인자별로 자세하게 기록되는 정도가 다름)

        1.  tiny(get, post, http 상태코드, 로딩시간\_GET /profile 304 - - 0.397 ms)
        2.  combined : 접속종류(get, post), 브라우저 종류, 접속날짜 등등
        3.  common : get, post, 접속날짜, 상태코드 등
        4.  dev : 상태코드, 접속종류, 로딩시간 등
        5.  short : 상태코드, 접속종류, 로딩시간 등

        ```js
        import morgan from "morgan";
        app.use(morgan("dev"));
        ```

  2.  helmet

      - nodeJS 앱의 보안에 도움이 되는 라이브러리
      - nocache, nosniff, xssFilter, ieNoOpen 지원
      - 보안상 목적으로 기본적으로 해놓는 것이 좋음
        ```console
        $ npm install helmet
        ```
        ```js
        import helmet from "helmet";
        app.use(helmet());
        ```

  3.  cookie parser

      - 쿠키 전달받아서 사용할 수 있도록 만들어주는 미들웨어
      - 사용자 인증 같은 곳에서 쿠키 검사 시 사용
        ```console
        $ npm install cookie-parser
        ```
        ```js
        import cookieParser from "cookie-parser";
        app.use(cookieParser());
        ```

  4.  body parser

      - 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어
      - 요청에서 form이나 json 형태로 된 정보에 접근하는 미들웨어
      - cookie-parser와 같이 작동해서 세션에 정보 담을 수 있다.

        ```console
        $ npm install body-parser
        ```

      - app.use() 설정하면 get, post로 들어온 request의 값들을 body 프로퍼티를 추가해 자동으로 객체화{} 시켜준다.
      - extended : 중첩된 객체표현을 허용할지 말지 정하는 것

        - true : qs 모듈(추가된 보안 기능을 사용해 라이브러리를 구문 분석 및 문자열화 해준다.) 사용
        - false : query-string 모듈을 사용
          - queryString.parse(옵션) : 쿼리문자열을 쿼리객체로 변환해 리턴해준다.
          - queryString.stringify(옵션) : 쿼리객체를 쿼리문자열로 변환해 리턴해준다.

        ```js
        import bodyParser from "body-parser";

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));

        app.post('/create_process',(request,response) => {
            console.log(request.body);
        }
        //{ title: 'abcd', description: 'efgh' }
        ```

### 7. express url mapping

- app.use()로 중간에 인터셉터해서 함수를 실행할 때 url을 매핑하는 방법
- /user, /user/edit, /user/password 경로 설정 예시

  ```js
  // router.js
  import express from "express";

  export const userRouter = express.Router();

  userRouter.get("/", (req, res) => res.send("user index"));
  userRouter.get("/edit", (req, res) => res.send("user edit"));
  userRouter.get("/password", (req, res) => res.send("user password"));
  ```

  ```js
  // app.js
  import { userRouter } from "./router";

  app.use("/user", userRouter);
  ```

### 8. Router

- 라우팅 하는 것
  - 라우팅 : 어떤 네트워크 안에서 통신 데이터를 보낼 "경로를 선택하는 과정"
- 관리하는 페이지가 많아짐에 따라 코드의 복잡도가 급격히 높아지게 되는데, 이 복잡도를 낮추는 방법이 라우터이다.
- URI Routing : 사용자가 접근한 URI에 따라서 컨트롤러의 메소드를 호출해주는 기능

### 9. MVC Pattern

- Model : data
- View : data가 어떻게 생겼는지
- Controller : data를 찾는 기능

### 10. Arrow Function

- {} 의 유무에 따라 return값이 필요 없거나 필요하다.
- 소괄호 안에는 함수가 받을 파라미터(인자)를 적는다. ex) req, res, next 등

```js
// 익명함수
() => console.log("hello");
// 기명함수
const arrowFunctionEx = () => console.log("hello");
```

```js
// 익명함수
() => {
  return console.log("hello");
};
// 기명함수
const arrowFunctionEx = () => {
  return console.log("hello");
};
```

### 11. Pug

- Node Express Template Engine
- HTML을 간단하게 표현하기 때문에 가독성이 좋아짐
- 마크업 문법보다 코드양이 적어 생산성이 좋아진다.
- 정적인 부분과 동적인 부분을 따로 할 수 있다.
- JS 연산 결과를 쉽게 보여줄 수 있다.
  ```console
  $ npm install pug
  ```
  ```js
  app.set("view engine", "pug");
  ```
- 라우터가 응답받는 곳에 적으면 /home 경로는 home.pug로 연결됨
  ```js
  const home = (req, res) => res.render("Home");
  ```
- pug 파일은 views/ 폴더가 아닌 다른 폴더에서 view 템플릿을 찾아야 한다면
  ```js
  app.set("views", "바꿀 폴더명");
  // 요렇게 정의 해줘야한다.
  ```
- app.set("view engine")은 view의 확장자, views는 view의 폴더명
- pug 문법
- tab으로 자식노드가 될지 형제노드가 될지 결정된다.

  ```pug
  // main.pug

  doctype html
  html
     head
        title WeTube
     body
        main
           block content
        footer
           span &copy: WeTube
  ```

- pug는 extends로 파일경로를 써줘서 레이아웃별로 상속 받을 수 있다.
- block content의 자식 내용을 다른 파일로 따로 관리할 경우 extends 사용해서 불러올 수 있다.
- 위에서 작성한 block content 부분을 바꿔주는 예시

  ```jade
  // home.pug

  extends layouts/main

  block content
     p hello :)
  ```

- 다른 파일을 가져올 수도 있다.
  ```pug
  include ../partials/footer
  ```
- extends와 include의 차이점
  - extends : 상속받아서 block 부분을 새로 작성하는 것
  - include : 파일 그대로 껴놓는다.
- 태그에 class 이름 추가하기

  ```html
  link.home(rel="stylesheet", href="../home")
  <link rel="stylesheet" href="../home" class="home" />

  .footer__icon
  <div class="footer__icon"></div>
  ```

- js코드 작성법
  ```PUG
  #{js코드 작성 부분}
  ```

### 12. 뷰 템플릿 글로벌 변수

- app.use 활용해서 .pug 파일에 변수를 사용할 수 있다.
- req, res, next 받아서 next()로 꼭 내보내줘야한다.
- res.locals는 express에서 지원해주는 객체이다. 그 뒤에 변수명을 적어준다.
- 그 변수를 export 해준 다음 쓸 글로벌한 곳에 import해서 app.use(함수명) 해주면 어느곳에서나 글로벌하게 #{변수명}으로 적어주면 된다.

  ```js
  // app.js
  import { localsMiddleware } from "./middlewares";
  app.use(localsMiddleware);
  ```

  ```js
  // middlewares.js
  export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes.login = "/login";
    next();
  };
  ```

  ```pug
  // footer.pug
  a(href=routes.login) Login
  span.footer__text #{siteName}
  ```

### 13. CSS BEM(Block Element Modifier) 방법론

```css
.block__element {…}
.block‐‐modifier {…}
.block__element‐‐modifier {…}
```

- 클래스명은 간단하고 명확하며 정확하게 유지해야 한다는 것으로 너무 고민하지 않도록 한다.
- 스타일시트와 HTML 역시 DRY(don’t repeat yourself)로 유지되어야 하기 때문
- BEM 클래스명은 구체적이고 명료하며 HTML 안에서도 읽기 쉬워야 하고, 클래스명이 무엇을 나타내는지 분명하게 전달 되어야 한다.
- CSS의 가독성을 높이기 위해 CSS 구조를 개선시키기 위한 개발 방법론
- 오직 class명에서만 활용가능
- 클래스명은 BEM 방식의 이름을 여러번 반복하여 재사용할 수 있도록 허락하며, HTML과 CSS/Sass 파일에서도 좀 더 일관된 코딩 구조를 만든다.
- Block : 문단 전체에 적용된 요소 또는 요소를 담고 있는 컨테이너
- Element : 요소는 블럭이 포함하고 있는 한 조각
- 예시
  ```css
  .header__logo {…}
  .header__title {…}
  .header__searchbar {…}
  .header__nav {…}
  ```
- Modifier : 블럭 또는 요소의 속성, 요소의 외관이나 상태를 변화시키는 것

  - 클래스명을 지을때의 목적은 그 요소를 반복하여 재사용할 수 있게 하기 위한 것이어서 요소의 스타일이 같은 것이라면 사이트의 다른 영역이라 할지라도 새로운 클래스를 정의하지 않아도 된다.
  - 특정 요소의 스타일을 수정할 필요가 있을때, 물론 modifier만 활용하면 된다.
  - Sass의 @extends를 활용해서 메인 요소의 스타일을 복제할 수 있다.

  ```css
  .header__navigation {
    background: #008cba;
    padding: 1rem 0;
    margin: 2rem 0;
    text-transform: uppercase;
  }
  .header__navigation‐‐secondary {
    @extend .header__navigation;
    background: #dfe0e0;
  }
  ```

### 14. mixin pattern

- mixin은 pug 함수로서, "자바스크립트 형식" 이라는 말처럼,
  "반복되는" html을(혹은 어떤 의미덩어리를) 함수 형태로 만들 수 있도록 기능을 제공한다.
- 다중상속을 흉내낼 수 있다.
- 슈퍼 클래스를 인자로 받아 확장하는 서브클래스를 작성하고, 이 클래스를 다시 extends로 상속하는 방법
- pug에서도 적용시킬 수 있다.
- mixin을 사용할 경우 mixin 파일을 include 해주고, 사용할 부분에 "+"를 붙여준다!

  ```pug
  // views/mixins/videoBlock.pug

  mixin videoBlock(video = {})
    .videoBlock
        a(href=routes.videoDetail(video.id))
            video.videoBlock__thumbnail(src=video.videoFile, controls=false)
            h4.videoBlock__title=video.title
            if video.view === 1
                h6.videoBlock__views 1 view
            else
                h6.videoBlock__views #{video.views} views
  ```

  ```pug
  // views/home.pug

  extends layouts/main
  include mixins/videoBlock

  block content
    .videos
        each item in videos
            +videoBlock({
                title:item.title,
                views:item.views,
                videoFile:item.videoFile
            })
  ```

### 15. MongoDB

- Document-Oriented(문서 지향적) NoSQL(Not Only SQL) 데이터베이스
- 기존의 RDBMS(관계형 데이터베이스)의 한계를 극복하기 위한 새로운 형태의 데이터베이스
- Document : JSON objects 형태의 key-value의 쌍으로 이루어진 데이터 구조로 구성된다.
- 각 Document는 \_id라는 고유한 값을 갖는다.
  ```json
  {
    "_id": ObjectId("5099803df3f4948bd2f98391"),
    "name": { "first": "Alan", "last": "Turing" },
    "birth": new Date("Jun 23, 1912"),
    "death": new Date("Jun 07, 1954"),
    "contribs": ["Turing machine", "Turing test", "Turingery"],
    "views": NumberLong(1250000)
  }
  ```

### 16. mongoose

- MongoDB 기반 ODM(Object Data Mapping) Node.JS 전용 라이브러리
- ODM : 데이터베이스와 객체지향 프로그래밍 언어 사이 호환되지 않는 데이터를 변환하는 프로그래밍 기법

### 17. async await & try catch

```js
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", {
      pageTitle: "Home",
      videos
    });
  } catch (error) {
    console.log(error);
    res.render("home", {
      pageTitle: "Home",
      videos: []
    });
  }
};
```

1. async await

- 자바스크립트는 싱글 스레드 프로그래밍언어기 때문에 비동기처리가 필수적
- 비동기 처리는 그 결과가 언제 반환될지 알수 없기 때문에 동기식으로 처리하는 기법들이 사용되어야 한다.
- function 키워드 앞에 async만 붙여주고 비동기로 처리되는 부분 앞에 await만 붙여주면 된다.
- await 뒷부분이 반드시 promise 를 반환해야 하지만 async function 자체도 promise 를 반환한다
  - 최신 코드이기 때문에 바벨 변환 필수

2. try catch

- 에러에 따른 예외처리기법이다.
- 에러가 생기면 자바스크립트는 나머지 로직이 실행되지 않는다(그 시점에 실행중이었던 작업을 완료할 수 없다.)
- 에러가 생기더라도 그에 따른 대처가 가능하다.

### 18. multer

- 파일 업로드 시 파일의 url을 추출해주는 미들웨어
- html 상에서 인코딩 타입을 꼭 맞춰줘야한다.

  - enctype="multipart/form-data"

- 클라이언트가 보낸 파일을 업로드하고, 지정한 위치 폴더에 저장, 이름을 바꾼다음 다음 기능에서 파일정보(위치가 포함되어있는)객체를 준다.

  ```CONSOLE
  $ npm install multer
  ```

  ```html
  <!-- upload.html -->

  <input type="file" id="file" name="videoFile" accept="video/*" enctype="multipart/form-data" />
  ```

  ```js
  // router.js

  import { uploadVideo } from "../middlewares";
  import { postupload } from "Controller";

  videoRouter.post("/upload", uploadVideo, postupload);
  //파일이 업로드될 기본 경로
  ```

  ```js
  // middlewares.js

  const multerVideo = multer({ dest: "uploads/videos/" });
  //업로드될 파일의 기본경로

  export const uploadVideo = multerVideo.single("videoFile");
  //single 는 오직 하나의 파일만 upload 할수 있는걸 의미
  // single 안에있는 이름은 html에서 video태그의 name 이다
  //multer 가 알아서 dest의 경로에 업로드를 해준다
  ```

  ```js
  // controller.js

  export const postUpload = async (req, res) => {
    // req.file.path
    const {
      file: { path }
    } = req;
    res.redirect(routes.videoDetail(newVideo.id));
  };
  ```

### 19. 숫자 배열, 오름차순, 내림차순 정렬

```js
const videos = await Video.find({}).sort({
  _id: -1
});
```

- 음수(-1)
  - 인자로 받은 a가 b보다 어떤 기준 상 작다 => 내림차순(점점 작아지기)
- 양수(1)
  - 오름차순
- 0
  - 만약 a가 b보다 작다면 음수가 a가 b 보다 크다면 양수가 그리고 같다면 0이 전달이 되게 된다.
  - 이 반환되는 값에 따라서 순서가 바뀔지 바뀌지 않을지가 결정된다.

### 20. npm 글로벌 설치

- npm은 모듈을 로컬모드(디렉토리 안에있는 node_modules)에 설치한다.
- 글로벌 설치는 시스템 디렉토리에 설치하는 것을 의미(전역적으로)

```console
$ npm install express -g
```

### 21. ESLint

- ES + Lint
- 에러가 있는 코드에 표시를 달아놓는 것을 의미
- 사용자가 직접 정의한대로 코드를 점검하고, 에러가 있으면 표시해준다.
- 코딩 스타일도 정할 수 있어 팀원끼리 협업할 시에 좋다.
- 절대 글로벌하게 설치하지 말고, devDepedency로 설치해줘야한다! "-D"
  ```console
  $ npm install eslint -D
  ```
- \$ npm install eslint -D 후 eslint --init을 하여 코드 스타일 지정 -> 메뉴얼을 잘 확인해서 정해야한다.

  - airbnb 코드를 따를건지 google을 따를건지 이런 사항!
  - .eslintrc.js 파일 생성된다.

    ```js
    // .eslintrc.js

    module.exports = {
      env: {
        browser: true,
        es6: true
      },
      extends: ["airbnb-base", "plugin:prettier/recommended"],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
      },
      rules: {
        "no-console": "off",
        "max-len": [
          2,
          {
            code: 200,
            tabWidth: 4,
            ignoreUrls: true
          }
        ]
      }
    };
    ```

  - 자동적으로 포맷에 맞춰 코드정렬해주는 도구와 함께 쓰기 위해 prettier plugin도 설치해준다.(Format on Save\_저장 시 포매팅해주는 기능 가능)

  ```console
  $ npm install eslint-plugin-prettier -D
  ```

  - formatter가 있으니 코딩스타일 툴이 딱히 필요 없기 때문에 eslint-config-prettier도 설치해준다.

  ```console
  $ npm install eslint-config-prettier -D
  ```

### 22. webpack

- 다양한 신기술 등의 프로그래밍파일들을 웹페이지에서 호환되도록 변환해주는 번들러
- ES6 문법이라든가 SCSS 같은 파일들을 웹브라우저에서 읽을수 있게 ES5,CSS 로 변환시켜준다.
- webpack,webpack-cli 설치
  ```console
  $ npm install webpack webpack-cli
  ```
  - webpack : node 에서 webpack를 사용하기 위함.
  - webpack-cli : 터미널에서 webpack를 사용하기 위함.
- 웹팩을 쓰려면 내가 필요한 로더를 다운받아 써야한다.
- 기본적으로 webpack에게 파일을 처리하는 방법을 알려주는 역할
- 이걸 사용해야 webpack이 css, sass 등을 이해한다

  ```console
  $ npm install css-loader postcss-loader sass-loader node-sass babel-loader
  ```

- 이렇게 쓰인다.

  - SASS 변수만들기

  ```css
  // Variables.scss

  $bgColor: red;
  $sexyColor: peru;

  // styles.scss

  body {
    background-color: $sexyColor;
    color: $bgColor;
  }
  ```

- post-css의 추가 플러그인인 autoprefixer 설치

```css
:-webkit-:full-screen {
  // webkit 은 safari , chrome
}
:-moz-:full-screen {
  // -moz- 는 firefox
}
```

- 요런거까지 써도 호환되기 위한 추가 플러그인

```console
$ npm install autoprefixer
```

```js
const autoprefixer = require("autoprefixer");
{
  loader: "postcss-loader",
  // CSS의 호환성과 관련된걸 해결해줌 EX) IE 지원문법변환
  options: {
     // options 라는 프로퍼티를 추가해서 함수를 만들어 배열로 리턴해준다
      plugin(){
          return [autoprefixer({browsers : "cover 99.5%"})];
      }
  }
}
```

- 최신문법을 이해하게 도와주는 플러그인 설치
- polyfill : 지원되지 않는 브라우저에서 코드가 실행되면 polyfill 이 활성화되서 대신 동작하게 된다.
  ```console
  $ npm install @babel/polyfill
  ```
- 기존엔 Node 에서 npm run start로 하나만 실행하였다면 이제는 콘솔 2개로 하나는 start에 썻던걸 사용하고 하나는 webpack을 실행해야한다.

  ```js
  // package.json

  "scripts": {
    "dev:server" : "nodemon --exec babel-node init.js --delay 2",
    // 서버
    "dev:assets" : "webpack",
    // 웹팩 실행
    // "start": "nodemon --exec babel-node init.js --delay 2"
    "build:assets": "webpack --mode production"
    // "build:assets" 는 내코드를 server 에 올려준다
  },
  ```

- [ webpack.config.js ] 란 이름을 만들어 환경설정을 해줘야한다.

  ```js
  const path = require("path");
  const autoprefixer = require("autoprefixer");
  const ExtractCSS = require("extract-text-webpack-plugin");
  const MODE = process.env.WEBPACK_ENV;
  // path.resolve 는 이전경로는 무시하고 맨 마지막 경로만 출력
  // ex) path.resolve('/a', '/b') // Outputs '/b'
  // 또한 path.resolve 는 항상 절대url 을 생성 그리고 이것을 만들기 위해 현재의 위치를 기본으로 사용

  const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
  const OUTPUT_DIR = path.join(__dirname, "static");
  // path.join 은 이전 인수까지 전부 출력  ex) path.join('/a', '/b')
  // Outputs '/a/b'
  // __dirname는 파일의 절대경로

  const config = {
    entry: ["@babel/polyfill", ENTRY_FILE], //entry 는 파일이 들어오는곳
    mode: MODE,
    module: {
      // module 이 의미하는건 module를 발견할떄마다 rules 라는 조건을 따르라고한다.
      rules: [
        // rules는 test의 정규식을 따른걸 만나면 use 를 사용한다.
        {
          test: /\.(js)$/, // 확장자가 js인파일을 찾는다.
          // 정규식 시작은 /\ 로시작하며 마지막엔 $/ 로 끝난다
          use: [
            {
              loader: "babel-loader" // js es6 문법을 구식으로 바꿔줌
            }
          ]
        },
        {
          test: /\.(scss)$/,
          // use 의 plugin 은 내부에서 또다른 plugin을 사용하고있다.
          // 그 이유는 scss 파일을 일반적인 css 파일로 통역해야하기 때문
          use: ExtractCSS.extract([
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader", // CSS의 호환성과 관련된걸 해결해줌
              // EX) IE 지원문법변환
              options: {
                plugins() {
                  return [
                    autoprefixer({
                      browsers: "cover 99.5%"
                    })
                  ];
                }
              }
            },
            {
              loader: "sass-loader" // scss or sass 를 일반 css로 바꿔주는 plugin
            }
          ])
        }
        // 원래대로라면 프로그래밍은 처음부터 차례대로 진행되지만 config 에선 거꾸로 작업을 한다.
        // 그래서 sass파일읽고 -> post.css 호환성변환 -> css변환 이렇게 순서적으로 처리하는 작업을
        // 진행방향의 역순으로 loader를 써준다라 css로더 , 호환성변환 , sass 로더 를 사용한다
      ]
    },
    output: {
      // output 은 파일이 나가는곳 이다. 객체여야 한다
      path: OUTPUT_DIR,
      filename: "[name].js" // [name].[format]" 파일의 이름과 파일의 확장자,형식 이다.
    },
    plugins: [new ExtractCSS("styles.css")] // use: ExtractCSS.extract 로 extract에 저장한 파일을 export 해준다
  };

  // entry 로 sass or scss 파일을 읽어서 css로변환해주고 그 변환된 파일을 output 으로 파일생성해준다.

  module.exports = config;
  ```
