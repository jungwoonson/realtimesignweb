package com.toy.boardserver.realtimesignweb.ssetest;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

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
