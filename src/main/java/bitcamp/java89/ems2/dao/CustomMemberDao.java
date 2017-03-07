package bitcamp.java89.ems2.dao;

import java.util.ArrayList;
import java.util.Map;

import bitcamp.java89.ems2.domain.CustomMember;

public interface CustomMemberDao {
  int insert(CustomMember customMember) throws Exception;
  ArrayList<CustomMember> getSrchListCustomMember(int cafeMemberNo) throws Exception;
  CustomMember getOneByNameTel(Map<String,String> paramMap) throws Exception;
  int update(CustomMember customMember) throws Exception;
  CustomMember getOne(int customMemberNo) throws Exception;
}
