package bitcamp.java89.ems2.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.StampCardInfo;
import bitcamp.java89.ems2.service.CafeCardService;

@RestController
public class CafeCardJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired CafeCardService cafeCardService;
  
  @RequestMapping(value = "/admin/cardadd/add")
  public AjaxResult add(@RequestBody StampCardInfo stampCardInfo) throws Exception {
	cafeCardService.add(stampCardInfo);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공");
  }
  
  
  
  @RequestMapping(value = {"/admin/cardadd/getCafeCardDetail", "/cstmr_m/cardadd/getCafeCardDetail"})
  public AjaxResult getCafeCardDetail(int cafeMemberNo) throws Exception {
    return new AjaxResult(AjaxResult.SUCCESS, cafeCardService.getCafeCardDetail(cafeMemberNo));
  }
  
}





