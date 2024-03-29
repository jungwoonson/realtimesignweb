# 기술 설명

## Server-Sent Event (SSE)

### SSE 란?
- 클라이언트와 서버가 한번 연결된 후, 서버에서 클라이언트로 지속적인 이벤트를 전송할 수 있는 수 있는 기술입니다.
  - 기존 HTTP : 클라이언트 요청 -> 서버 응답 -> 연결 종료
  - SSE 사용 : 클라이언트 요청 -> 서버 연결 -> 연결이 끊어지지 전까지 서버에서 클라이언트로 이벤트를 전송 가능
- Socket을 사용하지 하지 않고 HTTP로 소켓과 비슷한 기능을 구현할 수 있습니다.
  - 소켓 양방향 (서버 <--> 클라이언트), SSE 단반향 (서버 --> 클라이언트)

### 주의사항
- HTTP/1을 사용하지 않으면 '도메인 별 + 브라우저 별' 최대 6개의 연결만 가능합니다.
- example.com이란 도메인에서 크롬 브라우저를 사용할 때 최대 6개의 탭만 SSE 연결이 지원됩니다.
- HTTP/2를 사용하면 기본 100개 까지 연결가능합니다. (설정에 따라 더 늘릴수 있지만 불필요할듯)

### 사용 방법
- MDN 참고 : https://developer.mozilla.org/en-US/docs/Web/API/EventSource
- Baeldung 참고 : https://www.baeldung.com/spring-server-sent-events#mvc
### 클라이언트
- web browser javascript(EventSource)
```javascript
if (!!!window.EventSource) {
    alert('EventSource를 지원하지 않는 브라우저 입니다.');
    return;
}

const source = new EventSource('/connect/firstkey');
source.addEventListener('message', function(e) {
    // 서버에서 이벤트를 전송 했을 때 실행
    console.log(e.data);
}, false);

source.addEventListener('open', function(e) {
    // 초기 연결되었을 때 실행
    console.log('open event');
}, false);

source.addEventListener('error', function(e) {
    // 오류가 생겼을 경우 실행
    console.log('error event');
    if (e.readyState === EventSource.CLOSED) { // 연결이 닫혔을 경우
        console.log('연결이 종료되었습니다.');
        return;
    }
}, false);
```
- CLI curl
```shell
curl https://jsonplaceholder.typicode.com/posts \
  -X 'GET' \
  -H 'Accept: text/event-stream'
```

### 서버 (SpringBoot)
- Controller
```java
@Controller
public class SseController {

    private final SseService sseEmittersService;

    public SseController(SseService sseEmittersService) {
        this.sseEmittersService = sseEmittersService;
    }

    @GetMapping(value = "/connect/{key}", produces = "text/event-stream")
    public SseEmitter sseConnection(@PathVariable String key) throws IOException {
        return sseEmittersService.connect(key);
    }

    @GetMapping(value = "/send/{key}")
    public ResponseEntity<String> sseDoSomething(@PathVariable String key) throws IOException {
        sseEmittersService.doSomething(key);
        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping(value = "/disconnect/{key}")
    public ResponseEntity<String> disconnect(@PathVariable String key) throws IOException {
        sseEmittersService.disconnect(key);
        return ResponseEntity.noContent()
                .build();
    }
}
```
- Service
```java
@Service
public class SseService {

    private final SseEmitters sseEmitters = new SseEmitters();

    public SseEmitter connect(String key) throws IOException {
        return sseEmitters.add(key);
    }

    public void doSomething(String key) throws IOException {
        sseEmitters.doSomething(key, "이벤트 발생!!");
    }

    public void disconnect(String key) {
        sseEmitters.complete(key);
    }
}
```
- Emitters
```java
public class SseEmitters {

    // sse 이벤트 연결 서버 타임아웃 시간.
    public static final long TIMEOUT = 60L * 60L * 1000;
    private final ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter add(String key) throws IOException {
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        emitters.put(key, emitter);

        emitter.onCompletion(() -> this.emitters.remove(key));
        emitter.onTimeout(() -> this.emitters.remove(key));
        emitter.onError((callback) -> this.emitters.remove(key));

        emitter.send(SseEmitter.event().id(key).data("연결되었습니다."));

        return emitter;
    }

    public void doSomething(String key, String message) throws IOException {
        if (!emitters.containsKey(key)) {
            return;
        }
        SseEmitter emitter = emitters.get(key);
        emitter.send(SseEmitter.event().id(key).data(message));
    }

    public void complete(String key) {
        if (!emitters.containsKey(key)) {
            return;
        }
        SseEmitter emitter = emitters.get(key);
        emitter.complete();
    }
}
```

## Canvas API

### Canvas 란?
- HTML과 JavaScript를 사용하는 환경에서 그래픽을 그리는 수단을 제공하는 API 입니다.
- 애니메이션, 게임 그래픽, 데이터 시각화, 사진 조작, 실시간 비디오 처리에 사용됩니다.
- 주로 2D 그래픽에 중점을 둡니다.
- WebGL API를 사용하여 만들어졌습니다.

### WebGL(Web Graphics Library) 이란?
- 플러그인을 사용하지 않고도 고성능 대화형 3D 및 2D 그래픽을 렌더링 하기 위한 JavaScript API 입니다.
- 기존의 OpenGL ES 2.0 을 기반으로 제작되었습니다. (OpenGL : 2D 및 3D 컴퓨터 그래픽을 렌더링하기 위한 OpenGL 컴퓨터 그래픽 렌더링 API)
- 위 사유 때문에 사용자 장치에서 제공되는 하드웨어 그래픽 가속을 활용할 수 있습니다. (하드웨어 그래픽 가속 : CPU의 그래픽 기능을 그래픽 카드와 분배하여 작업하는 기능)

### 사용 방법
MDN 참고 : https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
```html
<canvas id="canvas"></canvas>
```
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);
```
