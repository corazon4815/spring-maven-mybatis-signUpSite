package org.example.mapper;

import org.example.model.MemberDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface MemberMapper {

    /**
     * @name loginChk
     * * @description 로그인 버튼을 누르면 아이디와 비밀번호로 회원 정보를 조회한다.
     * @param map : 아이디와 비밀번호
     * @return memberDto
     * @throws Exception 예외
     */
    public MemberDto loginChk(Map<String, Object> map) throws Exception;

    /**
     * @name duplChk
     * @description 회원가입시 아이디 중복검사
     * @param memberId 회원 아이디
     * @return DuplCnt : 아이디 조회 후 나온 갯수
     * @throws Exception 예외
     */
    public int duplChk(String memberId) throws Exception;

    /**
     * @name memberRegister
     * @description 회원가입을 한다.
     * @param dto 사용자 정보 파라미터
     * @throws Exception 예외
     */
    public void memberRegister(MemberDto dto) throws Exception;

    /**
     * @name getMemberList
     * @description 메인화면의 회원 목록을 가져온다.
     * @return List<MemberDto> : 회원 정보 목록
     * @throws Exception 예외
     */
    public List<MemberDto> getMemberList() throws Exception;

    /**
     * @name getMember
     * @description 회원 상세정보를 가져온다.
     * @param memberId
     * @return MemberDto : 회원 정보
     * @throws Exception 예외
     */
    public MemberDto getMember(String memberId) throws Exception;

    /**
     * @name deleteMember
     * @description 모달창에서 삭제버튼 클릭시 회원을 삭제한다.
     * @param memberId 회원 아이디
     * @throws Exception 예외
     */
    public void deleteMember(String memberId) throws Exception;

    /**
     * @name updateMember
     * @description 자신의 회원정보를 수정한다.
     * @param map 회원 아이디, 주소, 생년월일
     * @throws Exception 예외
     */
    public void updateMember(Map<String, Object> map) throws Exception;
}
