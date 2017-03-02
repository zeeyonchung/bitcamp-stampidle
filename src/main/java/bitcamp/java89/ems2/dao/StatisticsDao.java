package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.Statistics;

public interface StatisticsDao {
  Statistics getOne(int cafeMemberNo) throws Exception;
}
