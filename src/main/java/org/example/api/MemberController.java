package org.example.api;

import org.example.model.MemberDto;
import org.example.model.Paging;
import org.example.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MemberController {
    /**
     * MemberService 객체
     */
    private final MemberService memberService;

    /**
     * @name MemberController
     * @description MemberController 클래스 생성자
     * - Field Injection 문제로 바로 @Autowired를 걸지않고, 생성자로 안전하게 사용
     * @param memberService : MemberService 객체
     */
    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    /**
     * @name doLogin
     * @description 아이디와 비밀번호를 확인하여 로그인한다.
     * @param session
     * @param memberId 회원 아이디
     * @param memberPw 회원 비밀번호
     * @param response
     * @return 조회결과가 있으면 resultMap의 result 키에 true값을 저장(반대의 경우 false)
     * @throws Exception 예외
     */
    @RequestMapping(value ="/member/login")
    public Map doLogin(HttpSession session, String memberId, String memberPw, HttpServletResponse response) throws Exception {
        Map resultMap = new HashMap();

        if (session.getAttribute("login") != null) {
            session.removeAttribute("login");
        }
        Map<String, Object> map = new HashMap<>();

        map.put("memberId", memberId);
        map.put("memberPw", memberPw);

        MemberDto memberDto = memberService.loginChk(map);
        if(memberDto!=null) {
            session.setAttribute("memberInfo", memberDto);
            resultMap.put("result", true);
        }else{
            resultMap.put("result", false);
        }
        return resultMap;
    }

    /**
     * @name isIdDuplicated
     * @description 회원가입시 아이디 중복검사
     * @param memberId 회원 아이디
     * @return DuplCnt(아이디 조회 후 나온 갯수)가 1이상이면 resultMap의 result 키에 "false"(반대의 경우 "true" )
     * @throws Exception 예외
     */
    @GetMapping(value ="/member/checkid")
    public Map isIdDuplicated(@RequestParam("memberId") String memberId) throws Exception {
        Map resultMap = new HashMap();
        int DuplCnt = memberService.duplChk(memberId);
        if(DuplCnt>=1){
            resultMap.put("result", false);
        }else{
            resultMap.put("result", true);
        }
        return resultMap;
    }

    /**
     * @name registerMember
     * @description 회원가입을 한다.
     * @param dto 회원 정보 파라미터
     * @return resultMap의 result키에 success값
     * @throws Exception 예외
     */
    @PostMapping(value = "/member/register")
    public Map registerMember(@RequestBody MemberDto dto) throws Exception {
        Map resultMap = new HashMap();

        memberService.memberRegister(dto);
        resultMap.put("result", "success");

        return resultMap;
    }

    /**
     * @name getMemberList
     * @description 메인화면의 회원 목록을 가져온다.
     * @param startIdx : 시작 번호
     * @param endIdx : 가져올 레코드 갯수
     * @return List<MemberDto> : resultMap의 result키에 회원 목록
     * @throws Exception
     */
    @GetMapping(value = "/member/memberlist")
    public Map getMemberList(int startIdx, int endIdx) throws Exception {

        /*List<MemberDto> list = (List<MemberDto>) memberService.getMemberList();*/
        Map map = new HashMap();
        map.put("startIdx", startIdx);
        map.put("endIdx", endIdx);
        Map resultMap = new HashMap();
        resultMap.put("result", memberService.getMemberList(map));

        return resultMap;
    }

    /**
     * @name getMember
     * @description 목록에서 아이디 클릭시 모달창을 띄워 회원 상세정보를 보여준다.
     * @param memberId 회원 아이디
     * @return MemberDto dto : 회원 상세 정보
     * @throws Exception 예외
     */
    @GetMapping(value = "/member/memberInfo")
    public Map getMember(@RequestParam("memberId") String memberId) throws Exception {
        Map resultMap = new HashMap();
        MemberDto dto = memberService.getMember(memberId);
        resultMap.put("result", dto);
        return resultMap;
    }

    /**
     * @name deleteMember
     * @description 모달창에서 삭제버튼 클릭시 회원을 삭제한다.
     * @param memberId 회원 아이디
     * @return 삭제 완료시 resultMap의 result키에 true
     * @throws Exception 예외
     */
    @DeleteMapping(value = "/member/memberdel")
    public Map deleteMember(@RequestParam("memberId") String memberId) throws Exception {
        Map resultMap = new HashMap();
        memberService.deleteMember(memberId);
        resultMap.put("result", true);
        return resultMap;
    }

    /**
     * @name updateMember
     * @description 자신의 회원정보를 수정한다.
     * @param paramsMap 회원 아이디, 주소, 생년월일
     * @return 삭제 완료시 resultMap의 result키에 true
     * @throws Exception 예외
     */
    @PutMapping(value ="/member/updateMember")
    public Map updateMember(@RequestBody Map paramsMap) throws Exception {
        Map resultMap = new HashMap();
        memberService.updateMember(paramsMap);
        resultMap.put("result", true);
        return resultMap;
    }
}
