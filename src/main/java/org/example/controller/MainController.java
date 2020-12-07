package org.example.controller;

import org.example.model.MemberDto;
import org.example.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class MainController {
    @Autowired
    MainService mainService;

    public void setMainService(MainService mainService) {
        this.mainService = mainService;
    }

    @RequestMapping(value ="/member/loginForm")
    public String loginForm() throws Exception {

        return "login";
    }

    @RequestMapping(value ="/member/login")
    @ResponseBody
    public int doLogin(HttpSession session, String member_id, String member_pw, HttpServletResponse response) {
        int data;
        if (session.getAttribute("login") != null) {
            session.removeAttribute("login");
        }
        Map<String, Object> map = new HashMap<>();

        map.put("member_id", member_id);
        map.put("member_pw", member_pw);

        int loginCnt = mainService.LoginChk(map);
        if(loginCnt==1) {
            session.setAttribute("member_id", member_id);
            data = 1;
        }else{
            data = 0;
        }
        return data;
    }
    @RequestMapping(value ="/member/register")
    public String getMemberjoinPage(){

        return "memberjoin";
    }

    @GetMapping(value ="/member/main")
    public String getMainPage() {
        return "main";
    }












}



