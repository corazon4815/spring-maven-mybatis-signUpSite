package org.example.service;


import org.example.mapper.MemberMapper;
import org.example.model.MemberDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Service
public class MemberService {
    @Resource
    MemberMapper mapperMapper;

    public MemberService(MemberMapper mapperMapper) {
        this.mapperMapper = mapperMapper;
    }


    public int loginChk(Map<String, Object> map) throws Exception {
        return mapperMapper.loginChk(map);
    }

    public int duplChk(String memberId) throws Exception {
        return mapperMapper.duplChk(memberId);
    }

    @Transactional
    public void memberRegister(MemberDto dto) throws Exception {
        mapperMapper.memberRegister(dto);
    }
/*    public void MemberRegister(MemberDto dto) {
        mainDao.MemberRegister(dto);
    }

    getMemberList*/


}
