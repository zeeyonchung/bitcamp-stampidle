package bitcamp.java89.ems2.dao;

import java.util.List;
import java.util.Map;

import bitcamp.java89.ems2.domain.CustomCard;
import bitcamp.java89.ems2.domain.Stamp;

public interface CustomCardDao {
  List<CustomCard> getStampList(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getStampListByName(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getStampListByTel(Map<String, Object> paramMap) throws Exception;
  
  int getStampCount(Map<String, Object> paramMap) throws Exception;
  int getStampCountByKeyword(Map<String, Object> paramMap) throws Exception;
  
  List<CustomCard> getCustomDetail(Map<String, Object> paramMap) throws Exception;
  
  List<CustomCard> getList(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getListSelect(Map<String, Object> paramMap) throws Exception;
  int countAll(int cafeMemberNo) throws Exception;
  
  List<CustomCard> getCustomCardDetail(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getCardDetail(Map<String, Object> paramMap) throws Exception;
  int insert(Map<String, Object> paramMap) throws Exception;
  int getStampCafeCardNo(int cafeMemberNo) throws Exception;
  
  int insertStamp(Map<String, Object> paramMap) throws Exception;
  
  void updatePlusMcuse(int currentCustomCardNo) throws Exception;
  void updateMinusMcuse(int usedCustomCardNo) throws Exception;
  
  int insertGift(Map<String, Object> paramMap) throws Exception;
  void updateGift3Mcuse(int usedCustomCardNo) throws Exception;
  
  int getMyCardCount(int customMemberNo) throws Exception;
  List<CustomCard> getMyCardNo(int customMemberNo) throws Exception;
  int getCafeNo(int customCardNo) throws Exception;
  
  List<CustomCard> getStampNo(int customCardNo) throws Exception; 
  
  List<CustomCard> getRecentCard(int customMemberNo) throws Exception;
  
  List<CustomCard> getMyCardDetailList(int customMemberNo) throws Exception;
  List<CustomCard> getMyFinishCardDetailList(int customMemberNo) throws Exception;
  List<CustomCard> getMyFavoriteCardDetailList(int customMemberNo) throws Exception;
  List<Stamp> getMyCardStampList(int customCardNo) throws Exception;
  
  List<CustomCard> getCafeList(Map<String, Object> paramMap) throws Exception;
  int getCafeCountByKeyword(String searchKeyword) throws Exception;
}
