package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeDao;
import bitcamp.java89.ems2.dao.CafeMemberDao;
import bitcamp.java89.ems2.dao.StampCardInfoDao;
import bitcamp.java89.ems2.domain.StampCardInfo;
import bitcamp.java89.ems2.domain.StampPosition;
import bitcamp.java89.ems2.service.CafeCardService;

@Service
public class CafeCardServiceImpl implements CafeCardService {
  @Autowired CafeMemberDao cafeMemberNo;
  @Autowired CafeDao cafeDao;
  @Autowired StampCardInfoDao stampCardInfoDao;


  @Override
  public int add(StampCardInfo stampCardInfo) throws Exception {
    stampCardInfoDao.insert(stampCardInfo);
    return stampCardInfo.getStampCafeCardNo();
  }


  @Override
  public void addPosition(StampPosition stampPosition) throws Exception {
	stampCardInfoDao.insertPosition(stampPosition);
  }
  
}


