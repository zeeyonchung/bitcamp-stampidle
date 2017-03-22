package bitcamp.java89.ems2.dao;

import java.util.List;

import bitcamp.java89.ems2.domain.Cafe;

public interface CafeDao {
  int insert(Cafe cafe) throws Exception;
  Cafe getOne(int cafeMemberNo) throws Exception;
  int update(Cafe cafe) throws Exception;
  List<Cafe> getCafeMapList() throws Exception;
}
