package com.toy.boardserver.realtimesignweb.sign;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class SseEmitters {

    // sse 이벤트 연결 서버 타임아웃 시간.
    public static final long TIMEOUT = 60L * 60L * 1000;
    private final ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter add(String token, String uuid) throws IOException {
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        emitters.put(uuid, emitter);

        emitter.onCompletion(() -> this.emitters.remove(uuid));
        emitter.onTimeout(() -> this.emitters.remove(uuid));
        emitter.onError((callback) -> this.emitters.remove(uuid));

        emitter.send(SseEmitter.event().id(token).data(uuid));

        return emitter;
    }

    public boolean hasKey(String uuid) {
        return this.emitters.containsKey(uuid);
    }

    public SseEmitter get(String uuid) {
        return this.emitters.get(uuid);
    }
}
