package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeMemberDao;
import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.service.CafeMemberService;

@Service
public class CafeMemberImpl implements CafeMemberService {
  @Autowired CafeMemberDao cafeMemberDao;
  

  
  public int update(CafeMember cafeMember) throws Exception {
    if (cafeMemberDao.countByCmNo(cafeMember.getCafeMemberNo()) == 0) {
      throw new Exception("사용자를 찾지 못했습니다.");
    }
    cafeMemberDao.update(cafeMember);
    return cafeMemberDao.update(cafeMember);
  }
}
















