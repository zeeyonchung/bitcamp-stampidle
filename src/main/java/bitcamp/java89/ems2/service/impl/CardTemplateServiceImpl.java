package bitcamp.java89.ems2.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeDao;
import bitcamp.java89.ems2.dao.CafeMemberDao;
import bitcamp.java89.ems2.dao.StampCardInfoDao;
import bitcamp.java89.ems2.dao.StampPositionDao;
import bitcamp.java89.ems2.domain.StampCardInfo;
import bitcamp.java89.ems2.domain.StampPosition;
import bitcamp.java89.ems2.service.CardTemplateService;

@Service
public class CardTemplateServiceImpl implements CardTemplateService {
  @Autowired CafeMemberDao cafeMemberNo;
  @Autowired CafeDao cafeDao;
  @Autowired StampCardInfoDao stampCardInfoDao;
  @Autowired StampPositionDao stampPositionDao;
  
  








  @Override
  public void add(StampCardInfo stampCardInfo) throws Exception {
    List<StampPosition> list = stampCardInfo.getStampPositionList();
    
      
    
    stampCardInfoDao.insert(stampCardInfo);
  }
}
  
















