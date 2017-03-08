package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.LikesDao;
import bitcamp.java89.ems2.service.LikesService;

@Service
public class LikesImpl implements LikesService {
  @Autowired LikesDao likesDao;
  
  public int count(int cafeMemberNo) throws Exception {
  	return likesDao.count(cafeMemberNo);
  }
}
















