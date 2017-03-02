package bitcamp.java89.ems2.control.json;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.CustomMember;
import bitcamp.java89.ems2.service.AuthService;

@RestController
public class AuthCustomJsonControl {
  
  @Autowired AuthService authService;
  
  @RequestMapping("/cstmr_m/auth/login")
  public AjaxResult login(String name, String tel,
      HttpServletResponse response, HttpSession session, Model model) throws Exception {
    
    CustomMember customMember = authService.getCustomMemberInfo(name, tel);
    
    if (customMember == null) {
      return new AjaxResult(AjaxResult.FAIL, "이름 또는 전화번호가 틀리거나, 가입된 회원이 아닙니다.");
    }
    
    session.setAttribute("customMember", customMember); // HttpSession에 저장한다.
    return new AjaxResult(AjaxResult.SUCCESS, "로그인 성공! cstmr_m");
  }
  
  @RequestMapping("/cstmr_m/auth/logout")
  public AjaxResult logout(HttpSession session) throws Exception {
    session.invalidate(); // 기존 세션을 무효화시킨다.
    return new AjaxResult(AjaxResult.SUCCESS, "로그아웃 성공입니다. custom");
  }
  
  @RequestMapping("/cstmr_m/auth/loginUser")
  public AjaxResult loginUser(HttpSession session) throws Exception {
    CustomMember customMember = (CustomMember)session.getAttribute("customMember");

    if (customMember == null) { // 로그인이 되지 않은 상태
      return new AjaxResult(AjaxResult.FAIL, "로그인을 하지 않았습니다. custom");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, customMember);
  }
}








