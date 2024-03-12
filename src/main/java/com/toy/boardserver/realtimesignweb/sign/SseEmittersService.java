package com.toy.boardserver.realtimesignweb.sign;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.UUID;

@Service
public class SseEmittersService {

    private final SseEmitters sseEmitters = new SseEmitters();

    public SseEmitter connect(String token) throws IOException {
        return sseEmitters.add(token);
    }

    public void doSomething(String token) throws IOException {
        if (!sseEmitters.hasKey(token)) {
            return;
        }
        SseEmitter emitter = sseEmitters.get(token);
        emitter.send(SseEmitter.event().id(token).data("이벤트 발생!!"));
        // 연결 종료시 사용
        // emitter.complete();
    }
}
