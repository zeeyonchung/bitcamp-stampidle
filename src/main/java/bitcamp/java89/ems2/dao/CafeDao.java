package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.Cafe;

public interface CafeDao {
  int insert(Cafe cafe) throws Exception;
  Cafe getOne(int cafeMemberNo) throws Exception;
  int update(Cafe cafe) throws Exception;
  int delete(int cafeMemberNo) throws Exception;
}
