package com.toy.boardserver.realtimesignweb.staff;

import com.toy.boardserver.realtimesignweb.guest.GuestService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

@Controller
@RequestMapping("/staff")
public class StaffController {

    private static final String TEMPLATE_ROOT = "staff";

    private static final String SESSION_KEY_NAME = "staffKey";

    private final StaffService staffService;

    private final GuestService guestService;

    public StaffController(StaffService staffService, GuestService guestService) {
        this.staffService = staffService;
        this.guestService = guestService;
    }

    @GetMapping
    public String index() {
        return String.format("%s/%s", TEMPLATE_ROOT, "waiting.html");
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
}
