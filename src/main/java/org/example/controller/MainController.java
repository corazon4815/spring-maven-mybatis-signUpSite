package org.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class MainController {

    @RequestMapping (value ="/view/mainview")
    public String getMainPage() {
        return "main";
    }












}



