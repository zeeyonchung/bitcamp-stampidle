package bitcamp.java89.ems2.dao;

import java.util.Map;

public interface LikesDao {
  int count(int cafeMemberNo) throws Exception;
  void insert(Map<String, Object> paramMap) throws Exception;
  int getLikesCount(Map<String, Object> paramMap) throws Exception;
  void delete(Map<String, Object> paramMap) throws Exception;
}
