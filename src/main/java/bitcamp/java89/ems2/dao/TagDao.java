package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.Tag;

public interface TagDao {
  int insert(Tag tag) throws Exception;
  Tag getOne(int cafeNo) throws Exception;
}
