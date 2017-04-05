package bitcamp.java89.ems2.control.json;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.CustomCard;
import bitcamp.java89.ems2.service.CustomCardService;

@RestController
public class CustomCardJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired CustomCardService customCardService;
  
  @RequestMapping(value = "/admin/customCard/stampList")
  public AjaxResult stampList(int cafeMemberNo, int pageCount, int postNo, String searchDate, String searchCondition, String searchKeyword) throws Exception {
    Map<String, Object> returnMap = customCardService.getStampList(cafeMemberNo, pageCount, postNo, searchDate, searchCondition, searchKeyword);
    
    int allStampIssueNo = (int)returnMap.get("allStampIssueNo");
    @SuppressWarnings("unchecked")
	List<CustomCard> customCardList = (List<CustomCard>)returnMap.get("customCardList");
    @SuppressWarnings("unchecked")
	List<Integer> paginationList = (List<Integer>)returnMap.get("paginationList");
    
    if (allStampIssueNo == 0) {
      return new AjaxResult(AjaxResult.FAIL, "페이지가 존재하지 않습니다.");
    }
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("allStampIssueNo", allStampIssueNo);
    resultMap.put("customCardList", customCardList);
    resultMap.put("paginationList", paginationList);
    
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  @RequestMapping(value = {"/admin/customCard/getAllStampList", "/admin_m/customCard/getAllStampList"})
  public AjaxResult getAllstampList(int cafeMemberNo) throws Exception {
    Map<String, Object> list = customCardService.getAllStampList(cafeMemberNo);
    
    if (list.size() == 0) {
      return new AjaxResult(AjaxResult.FAIL, "페이지가 존재하지 않습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  
  
  
  @RequestMapping(value = "/admin/customCard/customListSelect")
  public AjaxResult customList(int cafeMemberNo, String selectCafeList, int pageNo, int pageSize) throws Exception {
    if (pageNo < 1) {
      pageNo = 1;
    }
    List<CustomCard> list = null;
    if(selectCafeList == null) {
      list = customCardService.getList(cafeMemberNo, pageNo, pageSize);
    } else if(selectCafeList == ""){
      list = customCardService.getList(cafeMemberNo, pageNo, pageSize);
    } else {
      list = customCardService.getListSelect(cafeMemberNo, selectCafeList, pageNo, pageSize);
      
    }
    int totalCount = customCardService.getSize(cafeMemberNo);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("list", list);
    resultMap.put("totalCount", totalCount);
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  @RequestMapping(value = {"/admin/customCard/customDetail", "/cstmr_m/customCard/customDetail"})
  public AjaxResult customDetail(int customMemberNo, int cafeMemberNo) throws Exception {
    Map<String, Object> resultMap = customCardService.getCustomDetail(customMemberNo, cafeMemberNo);
    
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  
  @RequestMapping(value = {"/admin/customCard/customCardDetail", "/cstmr_m/customCard/customCardDetail"})
  public AjaxResult customCardDetail(int customMemberNo, int cafeMemberNo) throws Exception {
    Map<String, Object> resultMap = customCardService.getCustomCardDetail(customMemberNo, cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  
  @RequestMapping(value = "/admin/customCard/addStamp")
  public AjaxResult addStamp(int cafeMemberNo, int customMemberNo, int stampIssueCount) throws Exception {
    customCardService.addStamp(customMemberNo, cafeMemberNo, stampIssueCount);
    return new AjaxResult(AjaxResult.SUCCESS, "스탬프 추가 성공");
  }
  
  
  @RequestMapping(value = "/admin/customCard/addNewCustomCard")
  public AjaxResult addNewCustomCard(int cafeMemberNo, int customMemberNo) throws Exception {
    customCardService.addNewCustomCard(cafeMemberNo, customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, "스탬프 추가 성공");
  }
  
  
  @RequestMapping(value = "/cstmr_m/customCard/addGiftNewCustomCard")
  public AjaxResult addGiftNewCustomCard(int cafeMemberNo, String name, String tel, int usedFreeNum, int customMemberNo) throws Exception {
    customCardService.addGiftNewCustomCard(cafeMemberNo, name, tel, usedFreeNum, customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, "선물 스탬프카드 추가 성공");
  }
  
  @RequestMapping(value = {"/admin/customCard/useCustomCard", "/cstmr_m/customCard/useCustomCard"})
  public AjaxResult useCustomCard(int cafeMemberNo, int customMemberNo, int usedCardCount) throws Exception {
    customCardService.useCustomCard(cafeMemberNo, customMemberNo, usedCardCount);
    return new AjaxResult(AjaxResult.SUCCESS, "스탬프 추가 성공");
  }
  
  @RequestMapping(value = "/cstmr_m/customCard/getMyCardCount")
  public AjaxResult cardCount(int customMemberNo) throws Exception {
     int myCardNo = customCardService.getMyCardCount(customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, myCardNo);
  }
  
  @RequestMapping(value = "/cstmr_m/customCard/getMyCardNo")
  public AjaxResult cardNo(int customMemberNo) throws Exception {
    List<CustomCard> myCardNo = customCardService.getMyCardNo(customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, myCardNo);
  }
  
  @RequestMapping(value = "/cstmr_m/customCard/getCafeNo")
  public AjaxResult cafeNo(int customCardNo) throws Exception {
     int cafeNo = customCardService.getCafeNo(customCardNo);
    return new AjaxResult(AjaxResult.SUCCESS, cafeNo);
  }
  
  @RequestMapping(value = "/cstmr_m/customCard/getStampNo")
  public AjaxResult stampNo(int customCardNo) throws Exception {
    List<CustomCard> stampNo = customCardService.getStampNo(customCardNo);
    return new AjaxResult(AjaxResult.SUCCESS, stampNo);
  }
  
  
  @RequestMapping(value = "/cstmr_m/customCard/getOneCafeStampNo")
  public AjaxResult getOneCafeStampNo(int customMemberNo, int cafeMemberNo) throws Exception {
    Map<String, Object> resultMap = customCardService.getOneCafeStampNo(customMemberNo, cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  
  
  @RequestMapping(value = "/cstmr_m/customCard/getRecentCard")
  public AjaxResult getRecentCard(int customMemberNo) throws Exception {
    List<CustomCard> customCardList = customCardService.getRecentCard(customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, customCardList);
  }
  
  @RequestMapping(value = "/cstmr_m/customCard/getMyCardList")
  public AjaxResult getMyCardList(int customMemberNo) throws Exception {
    List<CustomCard> myCardList = customCardService.getMyCardList(customMemberNo);
    List<CustomCard> myFavoriteCardList = customCardService.getMyFavoriteCardList(customMemberNo);
    List<CustomCard> myFinishCardList = customCardService.getMyFinishCardList(customMemberNo);
    
    Map<String, Object> resultMap = new HashMap<>();
    resultMap.put("myCardList", myCardList);
    resultMap.put("myFavoriteCardList", myFavoriteCardList);
    resultMap.put("myFinishCardList", myFinishCardList);
    
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  
  @RequestMapping(value = "/cstmr_m/customCard/findCafe")
  public AjaxResult findCafe(int customMemberNo, String searchKeyword, int postNo, int pageCount, String orderBy) throws Exception {
    Map<String, Object> resultMap = customCardService.findCafe(customMemberNo, searchKeyword, postNo, pageCount, orderBy);
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  
  @RequestMapping(value = "/cstmr_m/customCard/likeCafe")
  public AjaxResult likeCafe(int customMemberNo, int postNo, int pageCount, String orderBy) throws Exception {
    Map<String, Object> resultMap = customCardService.likeCafe(customMemberNo, postNo, pageCount, orderBy);
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  
  @RequestMapping(value = "/cstmr_m/message/cafeNoNameList")
  public AjaxResult cafeNoNameList(int customMemberNo) throws Exception {
  	List<CustomCard> cafeNoNameList = customCardService.cafeNoNameList(customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, cafeNoNameList);
  }
  
  @RequestMapping(value = "/admin/message/customerNoNameList")
  public AjaxResult customerNoNameList(int cafeMemberNo) throws Exception {
    List<CustomCard> customerNoNameList = customCardService.customerNoNameList(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, customerNoNameList);
  }
  
  @RequestMapping(value = "/cstmr_m/cafe/getCafeMapList")
  public AjaxResult getCafeMapList(String searchKeyword) throws Exception {
    return new AjaxResult(AjaxResult.SUCCESS, customCardService.getCafeMapList(searchKeyword));
  }

  
}





