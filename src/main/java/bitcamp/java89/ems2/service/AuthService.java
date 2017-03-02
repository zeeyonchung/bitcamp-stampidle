package bitcamp.java89.ems2.service;

import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.domain.CustomMember;

public interface AuthService {
  CafeMember getCafeMemberInfo(String id, String password) throws Exception;
  CustomMember getCustomMemberInfo(String name, String tel) throws Exception;
}
