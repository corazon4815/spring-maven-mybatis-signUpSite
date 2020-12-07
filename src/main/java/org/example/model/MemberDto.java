package org.example.model;

import lombok.Data;

@Data
public class MemberDto {

    private int member_no;
    private String member_name;
    private String member_pw;
    private String member_address;
    private String member_birth;
}
