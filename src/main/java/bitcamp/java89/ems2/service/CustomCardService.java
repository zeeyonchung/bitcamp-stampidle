package bitcamp.java89.ems2.service;

import java.util.List;
import java.util.Map;

import bitcamp.java89.ems2.domain.Cafe;
import bitcamp.java89.ems2.domain.CustomCard;

public interface CustomCardService {
  Map<String, Object> getStampList(int cafeMemberNo, int pageCount, int postNo, String searchDate, String searchCondition, String searchKeyword) throws Exception;
  Map<String, Object> getAllStampList(int cafeMemberNo) throws Exception;
  Map<String, Object> getCustomDetail(int customMemberNo, int cafeMemberNo) throws Exception;
  List<CustomCard> getList(int cafeMemberNo, int pageNo, int pageSize) throws Exception;
  List<CustomCard> getListSelect(int cafeMemberNo, String selectCafeList, int pageNo, int pageSize) throws Exception;
  int getCurrentStampCount(int customMemberNo, int cafeMemberNo) throws Exception;
  CustomCard getCardDetail(int customMemberNo, int cafeMemberNo) throws Exception;
  void addStamp(int cafeMemberNo, int customMemberNo, int stampIssueCount) throws Exception;
  void addGiftNewCustomCard(int cafeMemberNo, String name, String tel, int usedFreeNum, int giveCustomMemberNo) throws Exception;
  void addNewCustomCard(int cafeMemberNo, int customMemberNo) throws Exception;
  void useCustomCard(int cafeMemberNo, int customMemberNo, int usedCardCount) throws Exception;
  int getSize(int cafeMemberNo) throws Exception;
  int getMyCardCount(int customMemberNo) throws Exception;
  List<CustomCard> getMyCardNo(int customMemberNo) throws Exception;
  int getCafeNo(int customCardNo) throws Exception;
  List<CustomCard> getStampNo(int customCardNo) throws Exception;
  Map<String, Object> getOneCafeStampNo(int customMemberNo, int cafeMemberNo) throws Exception;
  List<CustomCard> getRecentCard(int customMemberNo) throws Exception;
  
  List<CustomCard> getMyCardList(int customMemberNo) throws Exception;
  List<CustomCard> getMyFinishCardList(int customMemberNo) throws Exception;
  List<CustomCard> getMyFavoriteCardList(int customMemberNo) throws Exception;
  
  Map<String, Object> findCafe(int customMemberNo, String searchKeyword, int postNo, int pageCount, String orderBy) throws Exception;
  Map<String, Object> likeCafe(int customMemberNo, int postNo, int pageCount, String orderBy) throws Exception;
  
  List<CustomCard> cafeNoNameList(int customMemberNo) throws Exception;
  List<CustomCard> customerNoNameList(int cafeMemberNo) throws Exception;
  
  List<Cafe> getCafeMapList(String searchKeyword) throws Exception;
}
















