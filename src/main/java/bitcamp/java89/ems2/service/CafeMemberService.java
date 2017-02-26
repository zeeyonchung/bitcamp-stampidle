package bitcamp.java89.ems2.service;

import bitcamp.java89.ems2.domain.CafeMember;

public interface CafeMemberService {
  int update(CafeMember cafeMember) throws Exception;
  CafeMember getDetail(int cafeMemberNo) throws Exception;
}
















