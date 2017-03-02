package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.CafeMember;

public interface CafeMemberService {
  int update(CafeMember cafeMember) throws Exception;
  CafeMember getDetail(int cafeMemberNo) throws Exception;
  int add(CafeMember cafeMember) throws Exception;
  List<CafeMember> getList(int cafeMemberNo) throws Exception;
}
















