package com.toy.boardserver.realtimesignweb.ssetest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

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