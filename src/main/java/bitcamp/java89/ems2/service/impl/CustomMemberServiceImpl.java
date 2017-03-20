package bitcamp.java89.ems2.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CustomCardDao;
import bitcamp.java89.ems2.dao.CustomMemberDao;
import bitcamp.java89.ems2.domain.CustomMember;
import bitcamp.java89.ems2.service.CustomMemberService;

@Service
public class CustomMemberServiceImpl implements CustomMemberService {
  @Autowired CustomMemberDao customMemberDao;
  @Autowired CustomCardDao customCardDao;
  
  
  @Override
  public int add(CustomMember customMember, int cafeMemberNo) throws Exception {
    Map<String, String> paramMap = new HashMap<>();
    paramMap.put("name", customMember.getName());
    paramMap.put("tel", customMember.getTel());
    int customMemberNo = 0;
    if (customMemberDao.getOneByNameTel(paramMap) == null) {
      customMemberDao.insert(customMember);
      customMemberNo = customMember.getCustomMemberNo();
    } else {
      CustomMember oldCustomMember = customMemberDao.getOneByNameTel(paramMap);
      customMemberNo = oldCustomMember.getCustomMemberNo();
    }
    
    try {
      int stampCafeCardNo = customCardDao.getStampCafeCardNo(cafeMemberNo);
    
      Map<String, Object> paramMap2 = new HashMap<>();
      paramMap2.put("cafeMemberNo", cafeMemberNo);
      paramMap2.put("customMemberNo", customMemberNo);
      if (customCardDao.getCustomCardDetail(paramMap2).size() > 0) {return customMemberNo;}
      
      Map<String, Object> paramMap3 = new HashMap<>();
      paramMap3.put("customMemberNo", customMemberNo);
      paramMap3.put("stampCafeCardNo", stampCafeCardNo);
      customCardDao.insert(paramMap3);
      
      return customMemberNo;
    } catch(Exception e) {
      throw new Exception("카드를 먼저 등록해 주세요.");
    }
  }
  
  public List<CustomMember> getSrchListCustomMember(int cafeMemberNo) throws Exception {
  	return customMemberDao.getSrchListCustomMember(cafeMemberNo);
  }
  
  @Override
  public int update(CustomMember customMember) throws Exception {
    return customMemberDao.update(customMember);
  }
  @Override
  public CustomMember getOne(int customMemberNo) throws Exception {
    return customMemberDao.getOne(customMemberNo);
  }
  @Override
  public int add(CustomMember customMember) throws Exception {
    return customMemberDao.insert(customMember);
  }
}
  
















