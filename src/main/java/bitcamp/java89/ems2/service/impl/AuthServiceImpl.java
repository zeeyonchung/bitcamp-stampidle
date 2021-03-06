package bitcamp.java89.ems2.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeMemberDao;
import bitcamp.java89.ems2.dao.CustomMemberDao;
import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.domain.CustomMember;
import bitcamp.java89.ems2.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {
  
  @Autowired CafeMemberDao cafeMemberDao;
  @Autowired CustomMemberDao customMemberDao;
  
  
  
  @Override
  public CafeMember getCafeMemberInfo(String id, String password) throws Exception {
    HashMap<String,String> paramMap = new HashMap<>();
    paramMap.put("id", id);
    paramMap.put("password", password);
    
    CafeMember cafeMember = cafeMemberDao.getOneByIdPassword(paramMap);
    if (cafeMember == null) {
      return null;
    }
    return cafeMember;
  }

  @Override
  public CustomMember getCustomMemberInfo(String name, String tel) throws Exception {
    HashMap<String,String> paramMap = new HashMap<>();
    paramMap.put("name", name);
    paramMap.put("tel", tel);
    
    CustomMember customMember = customMemberDao.getOneByNameTel(paramMap);
    if (customMember == null) {
      return null;
    }
    return customMember;
  }
}
