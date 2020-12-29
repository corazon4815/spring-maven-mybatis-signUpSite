package org.example.service;


import org.example.mapper.MemberMapper;
import org.example.model.MemberDto;
import org.example.model.Paging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @name MemberService
 * @description : 회원 관리에 대한 Service 클래스
 */
@Service
public class MemberService {

    /**
     * MemberMapper 클래스 객체
     */
    private final MemberMapper mapperMapper;

    /**
     * @name MemberService
     * @description MemberService 클래스 생성자
     * - Field Injection 문제로 바로 @Autowired를 걸지않고, 생성자로 안전하게 사용
     * @param mapperMapper mapperMapper 클래스 객체
     */
    @Autowired
    public MemberService(MemberMapper mapperMapper) {
        this.mapperMapper = mapperMapper;
    }

    /**
     * @name loginChk
     * @description 로그인 버튼을 누르면 아이디와 비밀번호로 회원 정보를 조회한다.
     * @param map : 아이디와 비밀번호
     * @return memberDto
     * @throws Exception 예외
     */
    public MemberDto loginChk(Map<String, Object> map) throws Exception {
        return mapperMapper.loginChk(map);
    }

    /**
     * @name duplChk
     * @description 회원가입시 아이디 중복검사
     * @param memberId 회원 아이디
     * @return DuplCnt : 아이디 조회 후 나온 갯수
     * @throws Exception 예외
     */
    public int duplChk(String memberId) throws Exception {
        return mapperMapper.duplChk(memberId);
    }

    /**
     * @name memberRegister
     * @description 회원가입을 한다.
     * @param dto 사용자 정보 파라미터
     * @throws Exception 예외
     */
    @Transactional
    public void memberRegister(MemberDto dto) throws Exception {
        mapperMapper.memberRegister(dto);
    }

    /**
     * @name getMemberList
     * @description 메인화면의 회원 목록을 가져온다.
     * @return List<MemberDto> : 회원 정보 목록
     * @throws Exception 예외
     */
    public Map getMemberList(Map<String, Object> map) throws Exception {

        int cnt = mapperMapper.getTotalCnt();

        Map resultMap = new HashMap();
        resultMap.put("totalCnt", cnt);
        resultMap.put("memberList", mapperMapper.getMemberList(map));

        return resultMap;
    }

    /**
     * @name getMember
     * @description 회원 상세정보를 가져온다.
     * @param memberId :
     * @return MemberDto : 회원 정보
     * @throws Exception 예외
     */
    public MemberDto getMember(String memberId) throws Exception {
        return mapperMapper.getMember(memberId);
    }

    /**
     * @name deleteMember
     * @description 모달창에서 삭제버튼 클릭시 회원을 삭제한다.
     * @param memberId 회원 아이디
     * @throws Exception 예외
     */
    @Transactional
    public void deleteMember(String memberId) throws Exception {
         mapperMapper.deleteMember(memberId);
    }

    /**
     * @name updateMember
     * @description 자신의 회원정보를 수정한다.
     * @param map 회원 아이디, 주소, 생년월일
     * @throws Exception 예외
     */
    @Transactional
    public void updateMember(Map<String, Object> map) throws Exception {
       mapperMapper.updateMember(map);
    }




}
