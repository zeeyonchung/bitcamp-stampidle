package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.CustomMember;

public interface CustomMemberService {
  int add(CustomMember customMember) throws Exception;
  List<CustomMember> getSrchListCustomMember() throws Exception;
  int update(CustomMember customMember) throws Exception;
  
}
