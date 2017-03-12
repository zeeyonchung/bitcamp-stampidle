package bitcamp.java89.ems2.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafePhotoDao;
import bitcamp.java89.ems2.domain.CafePhoto;
import bitcamp.java89.ems2.service.CafePhotoService;

@Service
public class CafePhotoImpl implements CafePhotoService {
  @Autowired CafePhotoDao cafePhotoDao;

  @Override
  public int add(CafePhoto cafePhoto) throws Exception {
    return cafePhotoDao.insert(cafePhoto);
  }
  
  public List<CafePhoto> detailCafePhoto(int cafeMemberNo) throws Exception {
  	return cafePhotoDao.getOne(cafeMemberNo);
  }
  
  public int update(CafePhoto cafePhoto) throws Exception {
    return cafePhotoDao.update(cafePhoto);
  }
}
















