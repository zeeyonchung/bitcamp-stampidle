package bitcamp.java89.ems2.service.impl;

import java.util.List;

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
  
  @Override
  public int update(CafeTime cafeTime) throws Exception {
    return cafeTimeDao.update(cafeTime);
  }

	@Override
	public List<CafeTime> detailTime(int cafeMemberNo) throws Exception {
		return cafeTimeDao.getOne(cafeMemberNo);
	}
}
















