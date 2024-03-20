package com.toy.boardserver.realtimesignweb.staff;

import com.toy.boardserver.realtimesignweb.guest.Sign;
import com.toy.boardserver.realtimesignweb.guest.GuestService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Controller
@RequestMapping("/staff")
public class StaffController {

    private static final String TEMPLATE_ROOT = "staff";

    private static final String SESSION_KEY_NAME = "staffKey";
    private static final String SESSION_GUEST_KEY = "guestKey";

    private final StaffService staffService;

    private final GuestService guestService;

    public StaffController(StaffService staffService, GuestService guestService) {
        this.staffService = staffService;
        this.guestService = guestService;
    }

    @GetMapping
    public String waiting() {
        return String.format("/%s/%s", TEMPLATE_ROOT, "waiting.html");
    }

    @GetMapping("/index")
    public String index() {
        return String.format("/%s/%s", TEMPLATE_ROOT, "index.html");
    }

    @GetMapping("/terms")
    public String terms() {
        return String.format("/%s/%s", TEMPLATE_ROOT, "terms.html");
    }

    @GetMapping("/agree")
    public String agree() {
        return String.format("/%s/%s", TEMPLATE_ROOT, "agree.html");
    }

    @GetMapping("/signs")
    public String signs() {
        return String.format("/%s/%s", TEMPLATE_ROOT, "signs.html");
    }

    @GetMapping("/connect")
    public SseEmitter connect(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();

        if (session.getAttribute(SESSION_KEY_NAME) == null) {
            String uuid = UUID.randomUUID().toString();
            session.setAttribute(SESSION_KEY_NAME, uuid);
            return staffService.connect(uuid);
        }

        return staffService.findEmitter((String) session.getAttribute(SESSION_KEY_NAME));
    }

    @GetMapping("/guests")
    public ResponseEntity<Set<String>> guests() {
        Set<String> uuids = guestService.guestUUIDs();;
        return ResponseEntity.ok()
                .body(uuids);
    }

    @GetMapping("/signinfos")
    public ResponseEntity<List<Sign>> signinfos() {
        return ResponseEntity.ok(guestService.getSigns());
    }

    @GetMapping("/choice")
    public ResponseEntity<String> choice(HttpServletRequest request, @RequestParam String guest) throws IOException {
        HttpSession session = request.getSession();
        session.setAttribute(SESSION_GUEST_KEY, guest);
        guestService.goIndex(guest, (String) session.getAttribute(SESSION_KEY_NAME));
        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/goagree")
    public ResponseEntity<String> goagree(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        guestService.sendEvent((String) session.getAttribute(SESSION_GUEST_KEY), "go agree");
        return ResponseEntity.noContent()
                .build();
    }

    @PostMapping("/terms/event")
    public ResponseEntity<String> event(HttpServletRequest request, @RequestBody Map<String, String> body) throws IOException {
        HttpSession session = request.getSession();
        guestService.sendEvent((String) session.getAttribute(SESSION_GUEST_KEY), body);
        return ResponseEntity.noContent()
                .build();
    }
}
