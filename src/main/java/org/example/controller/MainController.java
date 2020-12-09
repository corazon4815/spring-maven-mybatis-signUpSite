package org.example.controller;

import org.example.model.MemberDto;
import com.google.gson.Gson;
import org.example.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class MainController {
    @Autowired
    MainService mainService;

    public void setMainService(MainService mainService) {
        this.mainService = mainService;
    }

    //@RequestMapping(value ="/view/loginForm")
    @RequestMapping(value ="/view/loginview")
    public String loginForm() throws Exception {
        return "login";
    }

    @RequestMapping(value ="/member/login")
    @ResponseBody
    public Map doLogin(HttpSession session, String memberId, String memberPw, HttpServletResponse response) throws Exception {
        Map resultMap = new HashMap();
        int data;
        if (session.getAttribute("login") != null) {
            session.removeAttribute("login");
        }
        Map<String, Object> map = new HashMap<>();

        map.put("memberId", memberId);
        map.put("memberPw", memberPw);

        int loginCnt = mainService.loginChk(map);
        if(loginCnt==1) {
            session.setAttribute("memberId", memberId);
           // data = 1;
            resultMap.put(" ", true);
        }else{
           // data = 0;
            resultMap.put("result", false);
        }
        return resultMap;
    }
    //@getMapping(value ="/member/registerform")
    @RequestMapping(value = "/member/registerform")
    public String getMemberjoinPage(){
        return "memberjoin";
    }

    @GetMapping(value ="/member/checkid/")
    @ResponseBody
    public int isIdDuplicated(@RequestParam("memberId") String memberId) throws Exception {
        return mainService.duplChk(memberId);
    }

    @PostMapping(value = "/member/register")
    @ResponseBody
    public void registerMember(@RequestBody MemberDto dto) throws Exception {
        System.out.println(dto);
        mainService.memberRegister(dto);
    }
    @ResponseBody
    @GetMapping(value ="/view/mainview")
    public String getMainPage() {
//        List<MemberDto> list = staff.selectDepts();
//        Gson json = new Gson();
//        resp.setContentType("text/html;charset=utf-8");
//        PrintWriter out = resp.getWriter();
//        out.print(json.toJson(list));
//        mainService.getMemberList();

        return "main";
    }












}



