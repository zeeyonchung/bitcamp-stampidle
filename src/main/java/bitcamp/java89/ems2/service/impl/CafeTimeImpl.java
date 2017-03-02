package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeTimeDao;
import bitcamp.java89.ems2.domain.CafeTime;
import bitcamp.java89.ems2.service.CafeTimeService;

@Service
public class CafeTimeImpl implements CafeTimeService {
  @Autowired CafeTimeDao cafeTimeDao;

  @Override
  public int add(CafeTime cafeTime) throws Exception {
    return cafeTimeDao.insert(cafeTime);
  }
}
















