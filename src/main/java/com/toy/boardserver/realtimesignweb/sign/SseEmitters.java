package com.toy.boardserver.realtimesignweb.sign;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class SseEmitters {

    // sse 이벤트 연결 서버 타임아웃 시간.
    public static final long TIMEOUT = 60L * 60L * 1000;
    private final ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter add(String token) throws IOException {
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        emitters.put(token, emitter);

        emitter.onCompletion(() -> this.emitters.remove(token));
        emitter.onTimeout(() -> this.emitters.remove(token));
        emitter.onError((callback) -> this.emitters.remove(token));

        emitter.send(SseEmitter.event().id(token).data(token));

        return emitter;
    }

    public boolean hasKey(String token) {
        return this.emitters.containsKey(token);
    }

    public SseEmitter get(String token) {
        return this.emitters.get(token);
    }
}
