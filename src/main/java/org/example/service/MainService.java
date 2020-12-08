package org.example.service;

import org.example.dao.MainDao;
import org.example.model.MemberDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class MainService {
    @Autowired
    MainDao mainDao;

    public void setMainDao(MainDao mainDao) {
        this.mainDao = mainDao;
    }

    public int LoginChk(Map<String, Object> map) {
        return mainDao.LoginChk(map);
    }

    public int DuplChk(String member_id) {
        return mainDao.DuplChk(member_id);
    }
    public void MemberRegister(MemberDto dto) {
        System.out.println("service");
         mainDao.MemberRegister(dto);
    }


}
