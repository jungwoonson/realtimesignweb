package com.toy.boardserver.realtimesignweb.guest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/guest")
public class GuestController {

    private static final String TEMPLATE_ROOT = "guest";

    @GetMapping
    public String index() {
        return String.format("%s/%s", TEMPLATE_ROOT, "waiting.html");
    }
}
