package bitcamp.java89.ems2.dao;

import java.util.ArrayList;

import bitcamp.java89.ems2.domain.CafeTime;

public interface CafeTimeDao {
  int insert(CafeTime cafeTime) throws Exception;
  ArrayList<CafeTime> getOne(int cafeMemberNo) throws Exception;
  int update(CafeTime cafeTime) throws Exception;
}
