package bitcamp.java89.ems2.service;

import bitcamp.java89.ems2.domain.CafeMember;

public interface AuthService {
  CafeMember getCafeMemberInfo(String id, String password) throws Exception;
}
