package org.example.service;


import org.example.mapper.MemberMapper;
import org.example.model.MemberDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
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

    public List<MemberDto> getMemberList() throws Exception {
        return mapperMapper.getMemberList();
    }

    public MemberDto getMember(String memberId) throws Exception {
        return mapperMapper.getMember(memberId);
    }
    @Transactional
    public void deleteMember(String memberId) throws Exception {
         mapperMapper.deleteMember(memberId);
    }
/*    public void MemberRegister(MemberDto dto) {
        mainDao.MemberRegister(dto);
    }

    public BoardListModel list(int pageNum, int per){
		int count = dao.count();
		if(count == 0) {
			return new BoardListModel();
		}

		int start = (pageNum - 1) * per;
		List<BoardDto> list = dao.getList(start, per);

		Paging p = new Paging().paging(pageNum, count, per);

		return new BoardListModel(list,pageNum,p.totalPageCount,start,p,count);
	}

    getMemberList*/


}
