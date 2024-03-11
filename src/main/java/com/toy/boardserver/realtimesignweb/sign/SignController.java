package com.toy.boardserver.realtimesignweb.sign;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SignController {

    @GetMapping
    public String index() {
        return "index.html";
    }

    @GetMapping("/server")
    public String server() {
        return "server.html";
    }

    @GetMapping("client")
    public String client() {
        return "client.html";
    }

}
