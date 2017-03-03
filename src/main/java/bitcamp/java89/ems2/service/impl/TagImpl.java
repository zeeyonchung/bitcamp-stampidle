package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.TagDao;
import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.domain.Tag;
import bitcamp.java89.ems2.service.TagService;

@Service
public class TagImpl implements TagService {
  @Autowired TagDao tagDao;

  @Override
  public int add(Tag tag) throws Exception {
    return tagDao.insert(tag);
  }
  
  public Tag detailTag(int cafeNo) throws Exception {
  	return tagDao.getOne(cafeNo);
  }
}
















