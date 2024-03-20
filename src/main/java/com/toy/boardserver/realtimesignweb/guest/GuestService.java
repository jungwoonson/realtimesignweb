package com.toy.boardserver.realtimesignweb.guest;

import com.toy.boardserver.realtimesignweb.sign.SseEmitters;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class GuestService {

    private static final SseEmitters guestEmitters = new SseEmitters();

    private static final List<Sign> SIGNS = new ArrayList<>();

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

    public void addSign(Map<String, String> data) {
        SIGNS.add(
                new Sign(String.valueOf(data.get("name")), String.valueOf(data.get("phoneNumber")), String.valueOf(data.get("check1")),
                        String.valueOf(data.get("check2")), String.valueOf(data.get("check3")), data.get("sign"))
        );
        System.out.println(SIGNS);
    }

    public List<Sign> getSigns() {
        return new ArrayList<>(SIGNS);
    }
}
