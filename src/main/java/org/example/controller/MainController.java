package org.example.controller;

import org.example.model.MemberDto;
import org.example.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {
    @Autowired
    MainService mainService;

    public void setMainService(MainService mainService) {
        this.mainService = mainService;
    }

    @GetMapping(value ="/main")
    public String memberName(Model m) {

        String member_name = mainService.memberName();

        m.addAttribute("member",member_name);

        return "main";
    }





}



