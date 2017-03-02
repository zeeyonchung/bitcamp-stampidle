package bitcamp.java89.ems2.service;

import java.util.Map;

import bitcamp.java89.ems2.domain.CustomCard;

public interface CustomCardService {
  Map<String, Object> getStampList(int cafeMemberNo, int pageCount, int postNo, String searchDate, String searchCondition, String searchKeyword) throws Exception;
  CustomCard getStampDetail(int customMemberNo) throws Exception;
}
















