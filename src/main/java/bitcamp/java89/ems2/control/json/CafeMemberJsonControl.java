package bitcamp.java89.ems2.control.json;

import java.util.List;

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
 
  
  @RequestMapping(value = {"/admin/cafeMember/detail"})
  public AjaxResult detail(int cafeMemberNo) throws Exception {
  	CafeMember cafeMember = cafeMemberService.getDetail(cafeMemberNo);
    
    if (cafeMember == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 회원이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, cafeMember);
  }
  
  @RequestMapping(value = {"/admin/cafeMember/add", "/admin_m/cafeMember/add"})
  public AjaxResult add(CafeMember cafeMember) throws Exception {
    cafeMemberService.add(cafeMember);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  
  @RequestMapping("/admin/cafeMember/list")
  public AjaxResult list(int cafeMemberNo) throws Exception {
    List<CafeMember> list = cafeMemberService.getList(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
}





