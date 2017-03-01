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
    
    if (searchKeyword != null) {
      paramMap.put("searchKeyword", searchKeyword);
      if (searchCondition != null) {
        switch (searchCondition) {
          case "memb.name" : 
            paramMap.put("searchCondition", searchCondition);
            customCardList = customCardDao.getStampListByName(paramMap);
          case "memb.tel" :
            paramMap.put("searchCondition", searchCondition); 
            customCardList = customCardDao.getStampListByTel(paramMap);
        }
      }
    }
    
    customCardList = customCardDao.getStampList(paramMap);
    
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

}
