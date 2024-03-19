package com.toy.boardserver.realtimesignweb.guest;

import com.toy.boardserver.realtimesignweb.staff.StaffService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.UUID;

@Controller
@RequestMapping("/guest")
public class GuestController {

    private static final String TEMPLATE_ROOT = "guest";

    private static final String SESSION_KEY_NAME = "guestKey";

    private final GuestService guestService;

    private final StaffService staffService;

    public GuestController(GuestService guestService, StaffService staffService) {
        this.guestService = guestService;
        this.staffService = staffService;
    }

    @GetMapping
    public String index() {
        return String.format("%s/%s", TEMPLATE_ROOT,  "waiting.html");
    }

    @GetMapping( "/connect/{device}")
    public SseEmitter connect(HttpServletRequest request, @PathVariable String device) throws IOException {
        HttpSession session = request.getSession();
        session.setAttribute(SESSION_KEY_NAME, device);
        SseEmitter emitter = guestService.connect(device);
        staffService.refreshGuestList();
        return emitter;
    }
}
