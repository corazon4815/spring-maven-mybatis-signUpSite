package org.example.controller;

import org.example.model.MemberDto;
import org.example.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
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
    @RequestMapping(value ="/member/registerform")
    public String getMemberjoinPage(){
        return "memberjoin";
    }

    @GetMapping(value ="/member/checkid/")
    @ResponseBody
    public int isIdDuplicated(@RequestParam("member_id") String member_id){
        return mainService.DuplChk(member_id);
    }

    @PostMapping(value = "/member/register")
    @ResponseBody
    public int registerMember(@RequestBody MemberDto dto){
        System.out.println(dto);
        mainService.MemberRegister(dto);
        int data = 0;
        return data;
    }

    @GetMapping(value ="/member/main")
    public String getMainPage() {
        return "main";
    }












}



