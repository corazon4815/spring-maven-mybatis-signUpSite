package org.example.service;


import org.example.mapper.MainMapper;
import org.example.model.MemberDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Service
public class MainService {
    @Resource
    MainMapper mainMapper;

    public MainService(MainMapper mainMapper) {
        this.mainMapper = mainMapper;
    }


    public int loginChk(Map<String, Object> map) throws Exception {
        return mainMapper.loginChk(map);
    }

    public int duplChk(String memberId) throws Exception {
        return mainMapper.duplChk(memberId);
    }

    @Transactional
    public void memberRegister(MemberDto dto) throws Exception {
        mainMapper.memberRegister(dto);
    }
/*    public void MemberRegister(MemberDto dto) {
        mainDao.MemberRegister(dto);
    }

    getMemberList*/


}
