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
  
  
  
  
  @RequestMapping(value = "/admin/customCard/customListSelect")
  public AjaxResult customList(int cafeMemberNo, String selectCafeList, int pageNo, int pageSize) throws Exception {
    if (pageNo < 1) {
      pageNo = 1;
    }
    List<CustomCard> list = null;
    if(selectCafeList == null) {
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
  
  @RequestMapping(value = "/cstmr_m/customCard/getRecentCard")
  public AjaxResult getRecentCard(int customMemberNo) throws Exception {
    List<CustomCard> customCardList = customCardService.getRecentCard(customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, customCardList);
  }
  
  
  @RequestMapping(value = "/cstmr_m/customCard/getMyCardList")
  public AjaxResult getMyCardList(int customMemberNo) throws Exception {
    List<CustomCard> myCardList = customCardService.getMyCardList(customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, myCardList);
  }
  
  @RequestMapping(value = "/cstmr_m/customCard/getMyFinishCardList")
  public AjaxResult getMyFinishCardList(int customMemberNo) throws Exception {
    return new AjaxResult(AjaxResult.SUCCESS, customCardService.getMyFinishCardList(customMemberNo));
  }
  
  
  @RequestMapping(value = "/cstmr_m/customCard/getMyFavoriteCardList")
  public AjaxResult getMyFavoriteCardList(int customMemberNo) throws Exception {
    List<CustomCard> myCardList = customCardService.getMyFavoriteCardList(customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, myCardList);
  }
}





