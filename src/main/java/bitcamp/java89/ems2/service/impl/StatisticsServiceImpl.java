package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeDao;
import bitcamp.java89.ems2.dao.CafeMemberDao;
import bitcamp.java89.ems2.dao.StatisticsDao;
import bitcamp.java89.ems2.domain.Statistics;
import bitcamp.java89.ems2.service.StatisticsService;

@Service
public class StatisticsServiceImpl implements StatisticsService {
  @Autowired CafeMemberDao cafeMemberNo;
  @Autowired CafeDao cafeDao;
  @Autowired StatisticsDao statisticsDao;
  
  
  @Override
  public Statistics getOne(int cafeMemberNo) throws Exception {
    return statisticsDao.getOne(cafeMemberNo);
  }

}
