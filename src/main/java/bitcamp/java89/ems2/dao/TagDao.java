package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.Tag;

public interface TagDao {
  int insert(Tag tag) throws Exception;
  Tag getOne(int cafeMemberNo) throws Exception;
  int update(Tag tag) throws Exception;
  int delete(int cafeMemberNo) throws Exception;
}
