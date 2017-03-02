package bitcamp.java89.ems2.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeMemberDao;
import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.service.CafeMemberService;

@Service
public class CafeMemberServiceImpl implements CafeMemberService {
  @Autowired CafeMemberDao cafeMemberDao;
  
  public int update(CafeMember cafeMember) throws Exception {
    if (cafeMemberDao.countByCmNo(cafeMember.getCafeMemberNo()) == 0) {
      throw new Exception("사용자를 찾지 못했습니다.");
    }
    cafeMemberDao.update(cafeMember);
    return cafeMemberDao.update(cafeMember);
  }
  
  public CafeMember getDetail(int cafeMemberNo) throws Exception {
  	return cafeMemberDao.getOne(cafeMemberNo);
  }
  
  public int add(CafeMember cafeMember) throws Exception {
    return cafeMemberDao.insert(cafeMember);
  }
  
  public List<CafeMember> getList(int cafeMemberNo) throws Exception {
    return cafeMemberDao.getList();
  }


}
















