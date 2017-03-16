package bitcamp.java89.ems2.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
  public List<CustomCard> getMyCardNo(int customMemberNo) throws Exception {
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
  
  
  
  @Override
  public List<CustomCard> getMyCardList(int customMemberNo) throws Exception {
    List<CustomCard> returnCustomCardList = new ArrayList<>();
    
    List<CustomCard> myCardDetailList = customCardDao.getMyCardDetailList(customMemberNo);
    
    // 같은 카페의 카드는 중복시키지 않음
    List<Integer> cafeMemberNos = new ArrayList<>();
    
    for (CustomCard customCard : myCardDetailList) {
      if(cafeMemberNos.contains(customCard.getCafeMemberNo())) {continue;}
      cafeMemberNos.add(customCard.getCafeMemberNo());
      int customCardNo = customCard.getCustomCardNo();
      
      // 이 카드의 스탬프 리스트를 뽑아와서 현재 카드의 스탬스 수 구하기
      List<Stamp> myCardStampList = customCardDao.getMyCardStampList(customCardNo);
      int currentStampCount = 0;
      
      if (myCardStampList.get(0) != null) {
        for (Stamp stamp : myCardStampList) {
          currentStampCount += stamp.getStampIssueCount();
        }
      }
      
      customCard.setCurrentStampCount(currentStampCount);
      returnCustomCardList.add(customCard);
    }
    
    return returnCustomCardList;
  }
  
  
  @Override
  public List<CustomCard> getMyFavoriteCardList(int customMemberNo) throws Exception {
    List<CustomCard> returnCustomCardList = new ArrayList<>();
    
    List<CustomCard> myCardDetailList = customCardDao.getMyFavoriteCardDetailList(customMemberNo);
    
    // 같은 카페의 카드는 중복시키지 않음
    List<Integer> cafeMemberNos = new ArrayList<>();
    
    for (CustomCard customCard : myCardDetailList) {
      if(cafeMemberNos.contains(customCard.getCafeMemberNo())) {continue;}
      cafeMemberNos.add(customCard.getCafeMemberNo());
      int customCardNo = customCard.getCustomCardNo();
      
      // 이 카드의 스탬프 리스트를 뽑아와서 현재 카드의 스탬스 수 구하기
      List<Stamp> myCardStampList = customCardDao.getMyCardStampList(customCardNo);
      int currentStampCount = 0;
      
      if (myCardStampList.get(0) != null) {
        for (Stamp stamp : myCardStampList) {
          currentStampCount += stamp.getStampIssueCount();
        }
      }
      
      customCard.setCurrentStampCount(currentStampCount);
      returnCustomCardList.add(customCard);
    }
    
    return returnCustomCardList;
  }
  
  
  
  
  @Override
  public List<CustomCard> getMyFinishCardList(int customMemberNo) throws Exception {
    return customCardDao.getMyFinishCardDetailList(customMemberNo);
  }

  
  
  
  
  @Override
  public Map<String, Object> getAllStampList(int cafeMemberNo) throws Exception {
    List<CustomCard> list = customCardDao.getAllStampList(cafeMemberNo);
    SimpleDateFormat dayTime = new SimpleDateFormat("yyyy-MM-dd");
    String time = dayTime.format(new Date());
    
    Map<String, Object> paramMap = new HashMap<>();
    int visitMember = 0; // use date가 현재날짜와 같은경우의 방문자
    int visitMember2 = 0; //stamp 생성일이 현재날짜와 같은경우
    int visitMember3 = 0; // use date와 stamp생성일이 현재날짜 같은경우의 방문자
    int stampMany = 0; // 발급 스탬프 수
    int newMember =0; // 신규회원
    int freeItem = 0; // 무료 제공 서비스
    int finishCard = 0;
    
    
    for(CustomCard cardList : list) {
      List<Stamp> stampList =  cardList.getStampList();
      System.out.println("1111111111111111111111111111");
      System.out.println("자바 메서드 :"+time);
      System.out.println("카드생성일 : " + cardList.getCardIssueDate());
      
      
      
      //카드 생성일 >> 신규회원 
      if((time).equals(cardList.getCardIssueDate())) {
        System.out.println("22222222222222222222222222222");
        int cardMember=cardList.getCustomMemberNo();
        paramMap.put("cafeMemberNo", cafeMemberNo);
        paramMap.put("cardMember", cardMember);
        int count = customCardDao.getCardCountAll(paramMap);
        if(count == 1) {
          ++newMember;
        }
      }
      
      
      System.out.println("카드사용날짜 : " + cardList.getCardUseDate());
      // usedate 가 현재 날짜와 같은경우
      if((time).equals(cardList.getCardUseDate())) {
        ++visitMember;
        ++freeItem;
      //stamp 생성일과 usedate가 현재 날짜와 같은경우
        for(Stamp stList : stampList) {
          if(stList.getStampIssueDate() == time) {
            ++visitMember3;
           
          }
        }
      }
    //stamp 생성일이 현재날짜와 같은경우
      for(Stamp stList : stampList) {
        if((time).equals(stList.getStampIssueDate())) {
          ++visitMember2;
          stampMany += stList.getStampIssueCount();
        }
        
      }
      
      if(Integer.parseInt(cardList.getCardState()) == 1) {
        System.out.println("44444444444444444444444444444444");
        for(Stamp stList : stampList) {
          if((time).equals(stList.getStampIssueDate())) {
            ++finishCard;
          }
        }
      }
     
    }
    
    visitMember = visitMember + visitMember2 - visitMember3;
    System.out.println("방문자: " + visitMember);
    System.out.println("발급 스템프 수: " + stampMany);
    System.out.println("신규회원수: " + newMember);
    System.out.println("무료제공서비스: " + freeItem);
    System.out.println("다 채운 카드 수: " + finishCard);
    Map<String, Object> resultMap = new HashMap<>();
    
    resultMap.put("visitMember", visitMember);
    resultMap.put("stampMany", stampMany);
    resultMap.put("newMember", newMember);
    resultMap.put("freeItem", freeItem);
    resultMap.put("finishCard", finishCard);
    return resultMap;
  }
  
}
