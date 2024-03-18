package com.toy.boardserver.realtimesignweb.staff;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/staff")
public class StaffController {

    private static final String TEMPLATE_ROOT = "staff";

    @GetMapping
    public String index() {
        return String.format("%s/%s", TEMPLATE_ROOT, "waiting.html");
    }
}
