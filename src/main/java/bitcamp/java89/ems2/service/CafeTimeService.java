package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.CafeTime;

public interface CafeTimeService {
  int add(CafeTime cafeTime) throws Exception;
  List<CafeTime> detailTime(int cafeMemberNo) throws Exception;
  int update(CafeTime cafeTime) throws Exception;
}
















