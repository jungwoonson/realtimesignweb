package com.toy.boardserver.realtimesignweb.ssetest;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

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