package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.CustomMember;

public interface CustomMemberService {
  int add(CustomMember customMember, int cafeMemberNo) throws Exception;
  List<CustomMember> getSrchListCustomMember(int cafeMemberNo) throws Exception;
  int update(CustomMember customMember) throws Exception;
  CustomMember getOne(int customMemberNo) throws Exception;
  int add(CustomMember customMember) throws Exception;
}
