package bitcamp.java89.ems2.control.json;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.service.AuthService;

@RestController
public class AuthAdminJsonControl {
  
  @Autowired AuthService authService;
  
  @RequestMapping(value = {"/admin/auth/login", "/admin_m/auth/login"})
  public AjaxResult login(String id, String password,
      HttpServletResponse response, HttpSession session, Model model) throws Exception {
    
    CafeMember cafeMember = authService.getCafeMemberInfo(id, password);
    if (cafeMember == null) {
      return new AjaxResult(AjaxResult.FAIL, "아이디 또는 암호가 틀리거나, 가입된 회원이 아닙니다.2");
    }
    
    session.setAttribute("cafeMember", cafeMember); // HttpSession에 저장한다.
    return new AjaxResult(AjaxResult.SUCCESS, "로그인 성공! admin");
  }
  
  @RequestMapping("/admin/auth/logout")
  public AjaxResult logout(HttpSession session) throws Exception {
    session.invalidate(); // 기존 세션을 무효화시킨다.
    return new AjaxResult(AjaxResult.SUCCESS, "로그아웃 성공입니다. admin");
  }
  
  @RequestMapping(value = {"/admin/auth/loginUser", "/admin_m/auth/loginUser"})
  public AjaxResult loginUser(HttpSession session) throws Exception {
    CafeMember cafeMember = (CafeMember)session.getAttribute("cafeMember");

    if (cafeMember == null) { // 로그인이 되지 않은 상태
      return new AjaxResult(AjaxResult.FAIL, "로그인을 하지 않았습니다. admin");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, cafeMember);
  }
}








