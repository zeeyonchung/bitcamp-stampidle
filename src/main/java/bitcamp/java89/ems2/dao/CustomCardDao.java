package bitcamp.java89.ems2.dao;

import java.util.List;
import java.util.Map;

import bitcamp.java89.ems2.domain.CustomCard;

public interface CustomCardDao {
  List<CustomCard> getStampList(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getStampListByName(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getStampListByTel(Map<String, Object> paramMap) throws Exception;
  
  int getStampCount(Map<String, Object> paramMap) throws Exception;
  int getStampCountByKeyword(Map<String, Object> paramMap) throws Exception;
}
