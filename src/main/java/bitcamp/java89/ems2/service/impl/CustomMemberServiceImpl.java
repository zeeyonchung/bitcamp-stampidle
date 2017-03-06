package bitcamp.java89.ems2.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CustomMemberDao;
import bitcamp.java89.ems2.domain.CustomMember;
import bitcamp.java89.ems2.service.CustomMemberService;

@Service
public class CustomMemberServiceImpl implements CustomMemberService {
  @Autowired CustomMemberDao customMemberDao;
  
  
  @Override
  public int add(CustomMember customMember) throws Exception {
    return customMemberDao.insert(customMember);
  }
  
  public List<CustomMember> getSrchListCustomMember() throws Exception {
  	return customMemberDao.getSrchListCustomMember();
  }
  
  @Override
  public int update(CustomMember customMember) throws Exception {
    return customMemberDao.update(customMember);
  }
  
}
  
















