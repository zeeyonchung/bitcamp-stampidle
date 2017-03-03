package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.CafeTime;

public interface CafeTimeDao {
  int insert(CafeTime cafeTime) throws Exception;
  CafeTime getOne(int cafeNo) throws Exception;
}
