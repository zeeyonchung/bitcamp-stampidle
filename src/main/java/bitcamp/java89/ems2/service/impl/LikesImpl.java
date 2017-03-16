package bitcamp.java89.ems2.service.impl;

import java.util.HashMap;

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
  
  @Override
  public void addLikes(int customMemberNo, int cafeMemberNo) throws Exception {
    System.out.println("addLikes*****" + customMemberNo + cafeMemberNo);
    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("customMemberNo", customMemberNo);
    paramMap.put("cafeMemberNo", cafeMemberNo);
    likesDao.insert(paramMap);
  }
  
  @Override
  public int getLikesCount(int customMemberNo, int cafeMemberNo) throws Exception {
    System.out.println("getLikesCount@@@@@@@@@@" + customMemberNo + cafeMemberNo);
    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("customMemberNo", customMemberNo);
    paramMap.put("cafeMemberNo", cafeMemberNo);
    return likesDao.getLikesCount(paramMap);
  }
}
















