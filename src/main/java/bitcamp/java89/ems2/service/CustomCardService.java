package bitcamp.java89.ems2.service;

import java.util.Map;

public interface CustomCardService {
  Map<String, Object> getStampList(int cafeMemberNo, int pageCount, int postNo, String searchDate, String searchCondition, String searchKeyword) throws Exception;
  Map<String, Object> getCustomDetail(int customMemberNo, int cafeMemberNo) throws Exception;
}
















