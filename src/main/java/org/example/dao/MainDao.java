package org.example.dao;

import org.apache.ibatis.session.SqlSession;
import org.example.model.MemberDto;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Qualifier("mainDao")
@Repository
public class MainDao extends SqlSessionDaoSupport {

    @Autowired
    SqlSession sqlSession;

    public int LoginChk(Map<String, Object> map) {
        return getSqlSession().selectOne("member.loginChk", map);
    }

    public int DuplChk(String member_id) {
        return getSqlSession().selectOne("member.DuplChk", member_id);
    }
    public void MemberRegister(MemberDto dto) {
        System.out.println("dao");
        getSqlSession().selectOne("member.MemberRegister", dto);
    }

}
