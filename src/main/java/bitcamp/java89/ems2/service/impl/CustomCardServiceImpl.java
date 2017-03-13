package bitcamp.java89.ems2.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeDao;
import bitcamp.java89.ems2.dao.CafeMemberDao;
import bitcamp.java89.ems2.dao.CustomCardDao;
import bitcamp.java89.ems2.domain.CustomCard;
import bitcamp.java89.ems2.domain.Stamp;
import bitcamp.java89.ems2.service.CustomCardService;

@Service
public class CustomCardServiceImpl implements CustomCardService {
  @Autowired CafeMemberDao cafeMemberNo;
  @Autowired CafeDao cafeDao;
  @Autowired CustomCardDao customCardDao;
  
  public Map<String, Object> getStampList(
		int cafeMemberNo,
		int pageCount, 
		int postNo,
		String searchDate,
		String searchCondition, 
		String searchKeyword) throws Exception {


    Map<String, Object> returnMap = new HashMap<>();


    ////// 전체 스탬프 발행 횟수 가져오기 //////
    
    String searchFirstDate = searchDate.split(" ~ ")[0];
    String searchLastDate = searchDate.split(" ~ ")[1];
    
    int allStampIssueNo = 0;
    if (searchCondition != "" && searchKeyword != "") {
      Map<String, Object> paramMap = new HashMap<>();
      paramMap.put("cafeMemberNo", cafeMemberNo);
      paramMap.put("searchFirstDate", searchFirstDate);
      paramMap.put("searchLastDate", searchLastDate);
      paramMap.put("searchCondition", searchCondition);
      paramMap.put("searchKeyword", searchKeyword);
      allStampIssueNo = customCardDao.getStampCountByKeyword(paramMap);
    } else {
      Map<String, Object> paramMap = new HashMap<>();
      paramMap.put("cafeMemberNo", cafeMemberNo);
      paramMap.put("searchFirstDate", searchFirstDate);
      paramMap.put("searchLastDate", searchLastDate);
      allStampIssueNo = customCardDao.getStampCount(paramMap);
    }
    
    returnMap.put("allStampIssueNo", allStampIssueNo);
    
    
    ////// 스탬프 발행 목록 가져오기 //////
    Map<String, Object> paramMap = new HashMap<>();
    
    int firstPost = (pageCount - 1) * postNo;
    if (firstPost > allStampIssueNo) {
    	firstPost = (pageCount - 2) * postNo;
    }
    
    paramMap.put("cafeMemberNo", cafeMemberNo);
    paramMap.put("searchFirstDate", searchFirstDate);
    paramMap.put("searchLastDate", searchLastDate);
    paramMap.put("firstPost", firstPost);
    paramMap.put("postNo", postNo);
    
    List<CustomCard> customCardList = null;
    
    if (searchKeyword != "") {
      paramMap.put("searchKeyword", searchKeyword);
      if (searchCondition != "") {
        switch (searchCondition) {
          case "memb.name" : 
            paramMap.put("searchCondition", searchCondition);
            customCardList = customCardDao.getStampListByName(paramMap);
            break;
          case "memb.tel" :
            paramMap.put("searchCondition", searchCondition); 
            customCardList = customCardDao.getStampListByTel(paramMap);
            break;
        }
      }
    } else {
        customCardList = customCardDao.getStampList(paramMap);
    }
    
    
    returnMap.put("customCardList", customCardList);
    
    
    //////페이지 번호들 가져오기 //////
    List<Integer> paginationList = new ArrayList<>();
    int allPageNo = 0;
    
    if (allStampIssueNo % postNo != 0) {
      allPageNo = (allStampIssueNo / postNo) + 1;
    } else {
      allPageNo = allStampIssueNo / postNo;
    }
    
    if (pageCount % postNo == 0) {
      for (int i = pageCount - 4; i <= allPageNo; i++) {
        if (paginationList.size() == 5) {break;}
        paginationList.add(i);
      }
    } else {
      int currentPosition = pageCount % postNo;
      if (currentPosition == 0) {currentPosition = 5;}
      for (int i = pageCount - currentPosition + 1; i <= allPageNo; i++) {
        if (paginationList.size() == 5) {break;}
        paginationList.add(i);
      }
    }
    
    returnMap.put("paginationList", paginationList);
    
    return returnMap;
  }


  @Override
  public Map<String, Object> getCustomDetail(int customMemberNo, int cafeMemberNo) throws Exception {
    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("customMemberNo", customMemberNo);
    paramMap.put("cafeMemberNo", cafeMemberNo);
    
    List<CustomCard> customDetailList = customCardDao.getCustomDetail(paramMap);
    
    HashMap<String, Object> resultMap = new HashMap<>();
    if (customDetailList.size() > 0) {
      resultMap.put("customPhoto", customDetailList.get(customDetailList.size() - 1).getCustomPhoto());
    }
    resultMap.put("customName", customDetailList.get(customDetailList.size() - 1).getCustomName());
    resultMap.put("customTel", customDetailList.get(0).getCustomTel());
    resultMap.put("firstVisitDate", customDetailList.get(0).getCardIssueDate());
    
    List<Stamp> stampList = customDetailList.get(customDetailList.size() - 1).getStampList();
    String lastVisitDate;
    if (stampList.size() != 0) {
      lastVisitDate = stampList.get(stampList.size() - 1).getStampIssueDate();
    } else {
      lastVisitDate = customDetailList.get(customDetailList.size() - 1).getCardIssueDate();
    }
    resultMap.put("lastVisitDate", lastVisitDate);
    
    int stampCount = 0;
    int finishCardCount = 0;
    
    for (CustomCard customCard : customDetailList) {
      for (Stamp stamp : customCard.getStampList()) {
        stampCount += stamp.getStampIssueCount();
      }
      finishCardCount += Integer.parseInt(customCard.getCardState());
    }
    
    resultMap.put("allStampCount", stampCount);
    resultMap.put("finishCardCount", finishCardCount);
    
    return resultMap;
  }
  
  public List<CustomCard> getList(int cafeMemberNo, int pageNo, int pageSize) throws Exception {
    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("cafeMemberNo", cafeMemberNo);
    paramMap.put("startRowIndex", (pageNo - 1) * pageSize);
    paramMap.put("rowSize", pageSize);
    return customCardDao.getList(paramMap); 
  }
  
  public List<CustomCard> getListSelect(int cafeMemberNo, String selectCafeList, int pageNo, int pageSize) throws Exception {
    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("cafeMemberNo", cafeMemberNo);
    paramMap.put("selectCafeList", selectCafeList);
    paramMap.put("startRowIndex", (pageNo - 1) * pageSize);
    paramMap.put("rowSize", pageSize);
    return customCardDao.getListSelect(paramMap); 
  }


  @Override
  public Map<String, Object> getCustomCardDetail(int customMemberNo, int cafeMemberNo) throws Exception {
    
    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("customMemberNo", customMemberNo);
    paramMap.put("cafeMemberNo", cafeMemberNo);
    
    
    List<CustomCard> cardDetails = customCardDao.getCardDetail(paramMap);
    CustomCard cardDetail = cardDetails.get(cardDetails.size() - 1);
    List<CustomCard> customCardDetail = customCardDao.getCustomCardDetail(paramMap);
    
    HashMap<String, Object> resultMap = new HashMap<>();
    
    resultMap.put("cardDetail", cardDetail);
    
    
    // 현재 모인 스탬프 수
    int currentStampCount = 0;
    if (customCardDetail.size() > 0) {
      int currentCardSize = customCardDetail.get(customCardDetail.size() - 1).getStampList().size();
      for (int i = 0; i < currentCardSize; i++) {
        currentStampCount += customCardDetail.get(customCardDetail.size() - 1).getStampList().get(i).getStampIssueCount();
      }
    } else {
      currentStampCount = 0;
    }
    
    resultMap.put("currentStampCount", currentStampCount);
    
    return resultMap;
  }


  @Override
  public void addStamp(int customMemberNo, int cafeMemberNo, int stampIssueCount) throws Exception {
    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("customMemberNo", customMemberNo);
    paramMap.put("cafeMemberNo", cafeMemberNo);
    paramMap.put("stampIssueCount", stampIssueCount);
    
    customCardDao.insertStamp(paramMap);
  }


  @Override
  public void addNewCustomCard(int cafeMemberNo, int customMemberNo) throws Exception {
    Map<String, Object> paramMap0 = new HashMap<>();
    paramMap0.put("customMemberNo", customMemberNo);
    paramMap0.put("cafeMemberNo", cafeMemberNo);
    List<CustomCard> customCardList = customCardDao.getCustomDetail(paramMap0);
    int currentCustomCardNo = customCardList.get(customCardList.size() - 1).getCustomCardNo();
    
    int stampCafeCardNo = customCardDao.getStampCafeCardNo(cafeMemberNo);
    
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("customMemberNo", customMemberNo);
    paramMap.put("stampCafeCardNo", stampCafeCardNo);
    customCardDao.insert(paramMap);
    
    customCardDao.updatePlusMcuse(currentCustomCardNo);
  }
  
  
  @Override
  public void useCustomCard(int cafeMemberNo, int customMemberNo, int usedCardCount) throws Exception {
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("customMemberNo", customMemberNo);
    paramMap.put("cafeMemberNo", cafeMemberNo);
    List<CustomCard> customDetailList = customCardDao.getCustomDetail(paramMap);
    
    int count = 0;
    
    for (CustomCard customCard : customDetailList) {
      if (Integer.parseInt(customCard.getCardState()) == 1) {
        int usedCustomCardNo = customCard.getCustomCardNo();
        customCardDao.updateMinusMcuse(usedCustomCardNo);
        count++;
      }
      
      if (count == usedCardCount) {
        return;
      }
    }
  }
  
  @Override
  public int getMyCardCount(int customMemberNo) throws Exception {
    return customCardDao.getMyCardCount(customMemberNo);
  }
  
  @Override
  public int getMyCardNo(int customMemberNo) throws Exception {
    return customCardDao.getMyCardNo(customMemberNo);
  }
  
  @Override
  public int getCafeNo(int customCardNo) throws Exception {
    return customCardDao.getCafeNo(customCardNo);
  }
  
  @Override
  public List<CustomCard> getStampNo(int customCardNo) throws Exception {
    return customCardDao.getStampNo(customCardNo);
  }


  @Override
  public int getSize(int cafeMemberNo) throws Exception {
    return customCardDao.countAll(cafeMemberNo);
  }
  
  
  @Override
  public List<CustomCard> getRecentCard(int customMemberNo) throws Exception {
    List<CustomCard> customCardList = customCardDao.getRecentCard(customMemberNo);
    if (customCardList.size() <= 0) {return null;}
    
    
    List<CustomCard> returnCustomCardList = new ArrayList<>();
    
    // 현재 모인 스탬프 수
    int currentStampCount = 0;
    // 최근 방문일
    String recentStampDate = "";
    // 같은 카페의 카드는 중복시키지 않음
    List<Integer> cafeMemberNos = new ArrayList<>();
    // 최근 방문 기록 3개만 뽑을 거임
    int count = 0;
    
    for (CustomCard customCard : customCardList) {
      if (count == 3) {break;}
      if(cafeMemberNos.contains(customCard.getCafeMemberNo())) {continue;}
      
      currentStampCount = 0;
      cafeMemberNos.add(customCard.getCafeMemberNo());
      
      int currentCardSize = customCard.getStampList().size();
      for (int j = 0; j < currentCardSize; j++) {
        currentStampCount += customCard.getStampList().get(j).getStampIssueCount();
        recentStampDate = customCard.getStampList().get(j).getStampIssueDate();
      }
      
      customCard.setCurrentStampCount(currentStampCount);
      customCard.setRecentStampDate(recentStampDate);
      
      returnCustomCardList.add(customCard);
      count++;
    }
    
    
    return returnCustomCardList;
  }

}
