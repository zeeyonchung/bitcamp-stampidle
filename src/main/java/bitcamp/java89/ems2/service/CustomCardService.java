package bitcamp.java89.ems2.service;

import java.util.List;
import java.util.Map;

import bitcamp.java89.ems2.domain.CustomCard;

public interface CustomCardService {
  Map<String, Object> getStampList(int cafeMemberNo, int pageCount, int postNo, String searchDate, String searchCondition, String searchKeyword) throws Exception;
  Map<String, Object> getCustomDetail(int customMemberNo, int cafeMemberNo) throws Exception;
  List<CustomCard> getList(int cafeMemberNo, int pageNo, int pageSize) throws Exception;
  List<CustomCard> getListSelect(int cafeMemberNo, String selectCafeList, int pageNo, int pageSize) throws Exception;
  Map<String, Object> getCustomCardDetail(int customMemberNo, int cafeMemberNo) throws Exception;
  void addStamp(int cafeMemberNo, int customMemberNo, int stampIssueCount) throws Exception;
  void addNewCustomCard(int cafeMemberNo, int customMemberNo) throws Exception;
  void useCustomCard(int cafeMemberNo, int customMemberNo, int usedCardCount) throws Exception;
  int getSize(int cafeMemberNo) throws Exception;
  int getMyCardCount(int customMemberNo) throws Exception;
  List<CustomCard> getMyCardNo(int customMemberNo) throws Exception;
  int getCafeNo(int customCardNo) throws Exception;
  List<CustomCard> getStampNo(int customCardNo) throws Exception;
  public List<CustomCard> getRecentCard(int customMemberNo) throws Exception;
  List<CustomCard> getStampInfo(int customCardNo) throws Exception;
}
















