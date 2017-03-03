package bitcamp.java89.ems2.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.StampCardInfo;
import bitcamp.java89.ems2.domain.StampPosition;
import bitcamp.java89.ems2.service.CafeCardService;

@RestController
public class CafeCardJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired CafeCardService cafeCardService;
  
  @RequestMapping(value = "/admin/cardadd/add")
  public AjaxResult add(Object stampCardInfo) throws Exception {
    
    String jsonStampPositionList;
    
    
    return new AjaxResult(AjaxResult.SUCCESS, null);
  }
  
  
  @RequestMapping(value = "/admin/cardadd/addStampPosition")
  public void addStampPosition(StampPosition stampPosition) throws Exception {
    cafeCardService.addStampPosition(stampPosition);
  }
  
  
}





