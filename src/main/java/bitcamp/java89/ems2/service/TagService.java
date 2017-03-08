package bitcamp.java89.ems2.service;

import bitcamp.java89.ems2.domain.Tag;

public interface TagService {
  int add(Tag tag) throws Exception;
  Tag detailTag(int cafeMemberNo) throws Exception;
  int update(Tag tag) throws Exception;
}
















