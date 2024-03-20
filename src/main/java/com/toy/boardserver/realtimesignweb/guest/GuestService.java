package com.toy.boardserver.realtimesignweb.guest;

import com.toy.boardserver.realtimesignweb.sign.SseEmitters;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

@Service
public class GuestService {

    private static final SseEmitters guestEmitters = new SseEmitters();

    public SseEmitter connect(String uuid) throws IOException {
        return guestEmitters.add(uuid);
    }

    public Set<String> guestUUIDs() {
        return guestEmitters.keySet();
    }

    public SseEmitter findEmitter(String uuid) {
        return guestEmitters.get(uuid);
    }

    public void goIndex(String guestKey, String staffKey) throws IOException {
        SseEmitter emitter = guestEmitters.get(guestKey);
        emitter.send("go index|" + staffKey);
    }

    public void sendEvent(String guestKey, String event) throws IOException {
        SseEmitter emitter = guestEmitters.get(guestKey);
        emitter.send(event);
    }

    public void sendEvent(String staffKey, Map<String, String> data) throws IOException {
        SseEmitter emitter = guestEmitters.get(staffKey);
        emitter.send(data);
    }
}
