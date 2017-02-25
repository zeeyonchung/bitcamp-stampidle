package bitcamp.java89.ems2.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.service.CafeMemberService;

@RestController
public class CafeMemberJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired CafeMemberService cafeMemberService;

  
  
  @RequestMapping(value = {"/admin/cafeMember/update"})
  public AjaxResult update(CafeMember cafeMember) throws Exception {
    
    int count = cafeMemberService.update(cafeMember);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 회원이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
 
}





