package com.toy.boardserver.realtimesignweb.staff;

import com.toy.boardserver.realtimesignweb.sign.SseEmitters;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Service
public class StaffService {

    private static final SseEmitters staffEmitters = new SseEmitters();

    public SseEmitter connect(String uuid) throws IOException {
        return staffEmitters.add(uuid);
    }

    public SseEmitter findEmitter(String uuid) throws IOException {
        return staffEmitters.get(uuid);
    }

    public void refreshGuestList() {
        staffEmitters.sendEventToAll("refresh guest");
    }

    public void sendEvent(String staffKey, String event) throws IOException {
        SseEmitter emitter = staffEmitters.get(staffKey);
        emitter.send(event);
    }
}
