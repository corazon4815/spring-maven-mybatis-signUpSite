package org.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @RequestMapping(value ="/view/loginview")
    public String loginForm() throws Exception {
        return "login";
    }

    @RequestMapping(value = "/view/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/view/loginview";
    }
}
