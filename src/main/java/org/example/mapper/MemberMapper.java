package org.example.mapper;

import org.example.model.MemberDto;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface MemberMapper {

    public int loginChk(Map<String, Object> map) throws Exception;

    public int duplChk(String memberId) throws Exception;

    public void memberRegister(MemberDto dto) throws Exception;

}
