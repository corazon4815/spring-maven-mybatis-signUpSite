package org.example.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {

    private int memberNo;
    private String memberName;
    private String memberId;
    private String memberPw;
    private String memberAddress;
    private String memberBirth;
    private String regDate;
}
