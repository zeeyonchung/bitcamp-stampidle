package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Cafe;
import bitcamp.java89.ems2.domain.CafeAdd;
import bitcamp.java89.ems2.domain.CafeMember;

public interface CafeService {
  void add(CafeAdd cafeAdd) throws Exception;
  CafeMember getDetail(int cafeMemberNo) throws Exception;
  int update(Cafe cafe) throws Exception;
  List<Cafe> getCafeMapList() throws Exception;
}
















