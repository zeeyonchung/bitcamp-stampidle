package bitcamp.java89.ems2.dao;

import java.util.List;
import java.util.Map;

import bitcamp.java89.ems2.domain.CafeMember;

public interface CafeMemberDao {
  CafeMember getOneByIdPassword(Map<String,String> paramMap) throws Exception;
  int update(CafeMember cafeMember) throws Exception;
  int countByCmNo(int cafeMemberNo) throws Exception;
  CafeMember getOne(int cafeMemberNo) throws Exception;
  int insert(CafeMember cafeMember) throws Exception;
  List<CafeMember> getList() throws Exception;
}
