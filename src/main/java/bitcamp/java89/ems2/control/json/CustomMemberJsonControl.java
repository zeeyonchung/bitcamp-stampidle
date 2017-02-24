package bitcamp.java89.ems2.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.CustomMember;
import bitcamp.java89.ems2.service.CustomMemberService;

@RestController
public class CustomMemberJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired CustomMemberService customMemberService;
  
  @RequestMapping("/admin/customMember/add")
  public AjaxResult add(CustomMember customMember) throws Exception {
    customMemberService.add(customMember);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
}





