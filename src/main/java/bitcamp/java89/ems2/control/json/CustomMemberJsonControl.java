package bitcamp.java89.ems2.control.json;

import java.util.List;

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
  
  @RequestMapping(value = {"/admin/customMember/add", "/cstmr_m/customMember/addMyCard"})
  public AjaxResult add(CustomMember customMember, int cafeMemberNo) throws Exception {
    try {
      int customMemberNo = customMemberService.add(customMember, cafeMemberNo);
      return new AjaxResult(AjaxResult.SUCCESS, customMemberNo);
    } catch (Exception e) {
      return new AjaxResult(AjaxResult.FAIL, e);
    }
  }
  
  @RequestMapping(value = {"/admin/customMember/srchList", "/cstmr_m/customMember/srchList"})
  public AjaxResult srchList(int cafeMemberNo) throws Exception {
    List<CustomMember> srchList = customMemberService.getSrchListCustomMember(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, srchList);
  }
  
  @RequestMapping(value = {"/cstmr_m/customMember/update"})
  public AjaxResult update(CustomMember customMember) throws Exception {
    customMemberService.update(customMember);
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
  
  @RequestMapping(value = {"/cstmr_m/customMember/getOne"})
  public AjaxResult getOne(int customMemberNo) throws Exception {
    CustomMember customMember = customMemberService.getOne(customMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, customMember);
  }
  
  @RequestMapping(value = {"/cstmr_m/customMember/add"})
  public AjaxResult add(CustomMember customMember) throws Exception {
    customMemberService.add(customMember);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
}