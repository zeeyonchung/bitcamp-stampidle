package bitcamp.java89.ems2.service;

import bitcamp.java89.ems2.domain.Cafe;
import bitcamp.java89.ems2.domain.CafeMember;

public interface CafeService {
  int add(Cafe cafe) throws Exception;
  CafeMember getDetail(int cafeMemberNo) throws Exception;
}
















