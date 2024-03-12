package com.toy.boardserver.realtimesignweb.sign;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Controller
public class SignController {

    private final SseEmittersService sseEmittersService;

    public SignController(SseEmittersService sseEmittersService) {
        this.sseEmittersService = sseEmittersService;
    }

    @GetMapping
    public String index() {
        return "index.html";
    }

    @GetMapping("/server")
    public String server() {
        return "server.html";
    }

    @GetMapping("client")
    public String client() {
        return "client.html";
    }

    @GetMapping(value = "/sse/{token}", produces = "text/event-stream")
    public SseEmitter sseConnection(HttpServletRequest request, @PathVariable String token) throws IOException {
        return sseEmittersService.connect(token);
    }

    @PatchMapping(value = "/sse/{token}")
    public void sseDoSomething(@PathVariable String token) throws IOException {
        sseEmittersService.doSomething(token);
    }
}
