package com.toy.boardserver.realtimesignweb.notificationexample;


import com.toy.boardserver.realtimesignweb.sseemitter.SseEmitters;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
public class NotificationController {

    public static final SseEmitters sseEmitters = new SseEmitters();
    public static final String KEY = "key";

    public static int count = 0;

    @GetMapping("sender")
    public String sender() {
        return "notification/sender.html";
    }

    @GetMapping(value = "/receiver")
    public String receiver() {
        return "notification/receiver.html";
    }

    @GetMapping(value = "/receiver/connect")
    public SseEmitter connect() throws IOException {
        count++;
        return sseEmitters.add(KEY + count);
    }

    @PostMapping(value = "/receiver/event")
    public @ResponseBody ResponseEntity<String> event(@RequestBody Map<String, String> data) throws IOException {
        Map<String, String> result = new HashMap<>();
        result.put("id", "event");
        result.put("message", data.get("message"));

        sseEmitters.sendEventToAll(result);
        return ResponseEntity.noContent()
                .build();
    }
}
