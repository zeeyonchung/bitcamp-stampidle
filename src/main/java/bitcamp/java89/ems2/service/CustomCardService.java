package bitcamp.java89.ems2.service;

import java.util.List;
import java.util.Map;

import bitcamp.java89.ems2.domain.CustomCard;

public interface CustomCardService {
  Map<String, Object> getStampList(int cafeMemberNo, int pageCount, int postNo, String searchDate, String searchCondition, String searchKeyword) throws Exception;
  Map<String, Object> getCustomDetail(int customMemberNo, int cafeMemberNo) throws Exception;
  List<CustomCard> getList(int cafeMemberNo) throws Exception;
}
















