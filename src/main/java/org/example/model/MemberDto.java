package org.example.model;

import lombok.Data;

@Data
public class MemberDto {

    /*
    회원 번호
    */
    private int memberNo;
    /*
    회원 이름
    */
    private String memberName;
    /*
    회원 아이디
    */
    private String memberId;
    /*
    회원 비밀번호
    */
    private String memberPw;
    /*
    회원 주소
    */
    private String memberAddress;
    /*
    회원 생년월일
    */
    private String memberBirth;
    /*
    회원 가입일
    */
    private String regDate;
}

