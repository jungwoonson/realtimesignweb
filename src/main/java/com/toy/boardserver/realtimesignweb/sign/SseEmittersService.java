package com.toy.boardserver.realtimesignweb.sign;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.UUID;

@Service
public class SseEmittersService {

    private final SseEmitters sseEmitters = new SseEmitters();

    public SseEmitter connect(String token) throws IOException {
        String uuid = UUID.randomUUID().toString().toLowerCase();
        return sseEmitters.add(token, uuid);
    }

    public void doSomething(String uuid) throws IOException {
        if (!sseEmitters.hasKey(uuid)) {
            return;
        }
        SseEmitter emitter = sseEmitters.get(uuid);
        emitter.send(SseEmitter.event().id(uuid).data("이벤트 발생!!"));
        // 연결 종료시 사용
        // emitter.complete();
    }
}
