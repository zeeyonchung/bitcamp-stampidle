package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeDao;
import bitcamp.java89.ems2.domain.Cafe;
import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.service.CafeService;

@Service
public class CafeImpl implements CafeService {
  @Autowired CafeDao cafeDao;

  public int add(Cafe cafe) throws Exception {
    return cafeDao.insert(cafe);
  }
  
  public CafeMember getDetail(int cafeMemberNo) throws Exception {
    return cafeDao.getOne(cafeMemberNo);
  }
  
  public int update(Cafe cafe) throws Exception {
    return cafeDao.update(cafe);
  }
}
















