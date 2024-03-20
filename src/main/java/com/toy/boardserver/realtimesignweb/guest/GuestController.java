package com.toy.boardserver.realtimesignweb.guest;

import com.toy.boardserver.realtimesignweb.staff.StaffService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("/guest")
public class GuestController {

    private static final String TEMPLATE_ROOT = "guest";

    private static final String SESSION_KEY_NAME = "guestKey";
    private static final String SESSION_STAFF_KEY = "staffKey";

    private final GuestService guestService;

    private final StaffService staffService;

    public GuestController(GuestService guestService, StaffService staffService) {
        this.guestService = guestService;
        this.staffService = staffService;
    }

    @GetMapping
    public String waiting() {
        return String.format("/%s/%s", TEMPLATE_ROOT,  "waiting.html");
    }

    @GetMapping("/index")
    public String index() {
        return String.format("/%s/%s", TEMPLATE_ROOT, "index.html");
    }

    @GetMapping("/terms")
    public String terms(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        staffService.sendEvent((String) session.getAttribute(SESSION_STAFF_KEY), "go terms");
        return String.format("/%s/%s", TEMPLATE_ROOT, "terms.html");
    }

    @GetMapping("/agree")
    public String agree() {
        return String.format("/%s/%s", TEMPLATE_ROOT, "agree.html");
    }

    @GetMapping( "/connect/{device}")
    public SseEmitter connect(HttpServletRequest request, @PathVariable String device) throws IOException {
        HttpSession session = request.getSession();
        session.setAttribute(SESSION_KEY_NAME, device);
        SseEmitter emitter = guestService.connect(device);
        staffService.refreshGuestList();
        return emitter;
    }

    @GetMapping( "/reconnect")
    public SseEmitter connect(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        return guestService.findEmitter((String) session.getAttribute(SESSION_KEY_NAME));
    }

    @PostMapping("/staffKey")
    public ResponseEntity<String> staffKey(HttpServletRequest request, @RequestBody Map<String, String> body) {
        request.getSession().setAttribute(SESSION_STAFF_KEY, body.get("staffKey"));
        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/goterms")
    public ResponseEntity<String> goterms(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        staffService.sendEvent((String) session.getAttribute(SESSION_STAFF_KEY), "go terms");
        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/goagree")
    public ResponseEntity<String> goagree(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        staffService.sendEvent((String) session.getAttribute(SESSION_STAFF_KEY), "go agree");
        return ResponseEntity.noContent()
                .build();
    }

    @PostMapping("/terms/event")
    public ResponseEntity<String> event(HttpServletRequest request, @RequestBody Map<String, String> body) throws IOException {
        HttpSession session = request.getSession();
        staffService.sendEvent((String) session.getAttribute(SESSION_STAFF_KEY), body);
        return ResponseEntity.noContent()
                .build();
    }
}
