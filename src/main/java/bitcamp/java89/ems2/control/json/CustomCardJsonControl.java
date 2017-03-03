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
  
  
  @RequestMapping(value = "/admin/customCard/customList")
  public AjaxResult customList(int cafeMemberNo, int pageCount, int postNo, String searchDate, String searchCondition, String searchKeyword) throws Exception {
    
    
    return new AjaxResult(AjaxResult.SUCCESS, null);
  }
  
  
  @RequestMapping(value = "/admin/customCard/customDetail")
  public AjaxResult stampDetail(int customMemberNo, int cafeMemberNo) throws Exception {
    Map<String, Object> resultMap = customCardService.getCustomDetail(customMemberNo, cafeMemberNo);
    
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
}





