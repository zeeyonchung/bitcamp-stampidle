package bitcamp.java89.ems2.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Cafe;
import bitcamp.java89.ems2.domain.CafeTime;
import bitcamp.java89.ems2.domain.Tag;
import bitcamp.java89.ems2.service.CafeService;
import bitcamp.java89.ems2.service.CafeTimeService;
import bitcamp.java89.ems2.service.TagService;

@RestController
public class CafeJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired CafeService cafeService;
  @Autowired CafeTimeService cafeTimeService;
  @Autowired TagService tagService;
  
  @RequestMapping("/admin/cafe/add")
  public AjaxResult add(Cafe cafe) throws Exception {
    cafeService.add(cafe);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping("/admin/cafeTime/add")
  public AjaxResult add(CafeTime cafeTime) throws Exception {
    cafeTimeService.add(cafeTime);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping("/admin/tag/add")
  public AjaxResult add(Tag tag) throws Exception {
    tagService.add(tag);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping("/admin/cafe/detail")
  public AjaxResult detail(int cafeMemberNo) throws Exception {
    Cafe cafe = (Cafe)cafeService.getDetail(cafeMemberNo);
    
    if (cafe == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 회원이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, cafe);
  }
}





