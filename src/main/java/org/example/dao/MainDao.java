/*
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

    public int DuplChk(String memberId) {
        return getSqlSession().selectOne("member.DuplChk", memberId);
    }
    public void MemberRegister(MemberDto dto) {
        getSqlSession().selectOne("member.MemberRegister", dto);
    }

}
*/
