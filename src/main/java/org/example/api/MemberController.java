package org.example.api;

import org.example.model.MemberDto;
import org.example.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
public class MemberController {

    @Autowired
    MemberService memberService;

    public void setMainService(MemberService memberService) {
        this.memberService = memberService;
    }

    @RequestMapping(value ="/member/login")
    @ResponseBody
    public Map doLogin(HttpSession session, String memberId, String memberPw, HttpServletResponse response) throws Exception {
        Map resultMap = new HashMap();

        if (session.getAttribute("login") != null) {
            session.removeAttribute("login");
        }
        Map<String, Object> map = new HashMap<>();

        map.put("memberId", memberId);
        map.put("memberPw", memberPw);

        int loginCnt = memberService.loginChk(map);
        if(loginCnt==1) {
            session.setAttribute("memberId", memberId);
            resultMap.put("result", true);
        }else{
            resultMap.put("result", false);
        }
        return resultMap;
    }

    @GetMapping(value ="/member/checkid")
    @ResponseBody
    public Map isIdDuplicated(@RequestParam("memberId") String memberId) throws Exception {
        System.out.println(memberId);
        Map resultMap = new HashMap();
        int DuplCnt = memberService.duplChk(memberId);
        if(DuplCnt>=1){
            resultMap.put("result", false);
        }else{
            resultMap.put("result", true);
        }
        System.out.println(DuplCnt);
        System.out.println(resultMap.get("result"));
        return resultMap;
    }

    @PostMapping(value = "/member/register")
    @ResponseBody
    public Map registerMember(@RequestBody MemberDto dto) throws Exception {
        Map resultMap = new HashMap();
        memberService.memberRegister(dto);
        resultMap.put("result", "success");

        return resultMap;
    }

    @GetMapping(value = "/member/memberlist")
    @ResponseBody
    public Map getMemberList() throws Exception {
        Map resultMap = new HashMap();
        List<MemberDto> list = (List<MemberDto>) memberService.getMemberList();
        resultMap.put("result", list);
        return resultMap;
    }

    @GetMapping(value = "/member/memberInfo")
    @ResponseBody
    public Map getMember(@RequestParam("memberId") String memberId) throws Exception {
        Map resultMap = new HashMap();
        MemberDto dto = memberService.getMember(memberId);
        resultMap.put("result", dto);
        return resultMap;
    }

    @DeleteMapping(value = "/member/memberdel")
    @ResponseBody
    public Map deleteMember(@RequestParam("memberId") String memberId) throws Exception {
        System.out.println(memberId);
        Map resultMap = new HashMap();
        memberService.deleteMember(memberId);
        resultMap.put("result", true);
        System.out.println(resultMap.get("result"));
        return resultMap;
    }





/*    @RequestMapping (value ="/view/mainview")
    public String getMainPage() {*/
//        List<MemberDto> list = staff.selectDepts();
//        Gson json = new Gson();
//        resp.setContentType("text/html;charset=utf-8");
//        PrintWriter out = resp.getWriter();
//        out.print(json.toJson(list));
//        mainService.getMemberList();

/*
        return "main";
    }
*/


}
