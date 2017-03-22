package bitcamp.java89.ems2.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeDao;
import bitcamp.java89.ems2.dao.CafePhotoDao;
import bitcamp.java89.ems2.dao.CafeTimeDao;
import bitcamp.java89.ems2.dao.MenuDao;
import bitcamp.java89.ems2.dao.TagDao;
import bitcamp.java89.ems2.domain.Cafe;
import bitcamp.java89.ems2.domain.CafeAdd;
import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.domain.CafePhoto;
import bitcamp.java89.ems2.domain.CafeTime;
import bitcamp.java89.ems2.domain.Menu;
import bitcamp.java89.ems2.service.CafeService;

@Service
public class CafeImpl implements CafeService {
  @Autowired CafeDao cafeDao;
  @Autowired CafeTimeDao cafeTimeDao;
  @Autowired TagDao tagDao;
  @Autowired CafePhotoDao cafePhotoDao;
  @Autowired MenuDao menuDao;

  public CafeMember getDetail(int cafeMemberNo) throws Exception {
    return cafeDao.getOne(cafeMemberNo);
  }
  
  public int update(Cafe cafe) throws Exception {
    return cafeDao.update(cafe);
  }

  @Override
  public void add(CafeAdd cafe) throws Exception {
    
    cafeDao.insert(cafe.getCafe());
    for (CafeTime cafeTime : cafe.getCafeTimeList()) {
      cafeTimeDao.insert(cafeTime);
    }
    
    tagDao.insert(cafe.getTag());
    
    for (CafePhoto cafePhoto : cafe.getCafePhotoList()) {
      cafePhotoDao.insert(cafePhoto);
    }
    
    for (Menu menu : cafe.getMenuList()) {
      menuDao.insert(menu);
    }
    
  }

  @Override
  public List<Cafe> getCafeMapList() throws Exception {
    return cafeDao.getCafeMapList();
  }
}
















