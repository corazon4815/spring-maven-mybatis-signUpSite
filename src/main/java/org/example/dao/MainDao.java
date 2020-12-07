package org.example.dao;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Qualifier("mainDao")
@Repository
public class MainDao extends SqlSessionDaoSupport {

    @Autowired
    SqlSession sqlSession;

    public String memberName() {
        return sqlSession.selectOne("member.selectName");
    }
}
