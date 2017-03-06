package bitcamp.java89.ems2.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Cafe;
import bitcamp.java89.ems2.domain.CafePhoto;
import bitcamp.java89.ems2.domain.CafeTime;
import bitcamp.java89.ems2.domain.Menu;
import bitcamp.java89.ems2.domain.Tag;
import bitcamp.java89.ems2.service.CafePhotoService;
import bitcamp.java89.ems2.service.CafeService;
import bitcamp.java89.ems2.service.CafeTimeService;
import bitcamp.java89.ems2.service.MenuService;
import bitcamp.java89.ems2.service.TagService;


@RestController
public class CafeJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired CafeService cafeService;
  @Autowired CafeTimeService cafeTimeService;
  @Autowired TagService tagService;
  @Autowired CafePhotoService cafePhotoService;
  @Autowired MenuService menuService;
  
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
  
  @RequestMapping("/admin/cafePhoto/add")
  public AjaxResult add(CafePhoto cafePhoto) throws Exception {
  	cafePhotoService.add(cafePhoto);
  	return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping("/admin/menu/add")
  public AjaxResult add(Menu menu) throws Exception {
  	menuService.add(menu);
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
  
  
  @RequestMapping(value = {"/admin/cafeTime/detail"})
  public AjaxResult detailTime(int cafeMemberNo) throws Exception {
  	CafeTime cafeTime = (CafeTime)cafeTimeService.detailTime(cafeMemberNo);
    
  	if (cafeTime == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 회원이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, cafeTime);
  }
  
  
  @RequestMapping(value = {"/admin/tag/detail"})
  public AjaxResult detailTag(int cafeMemberNo) throws Exception {
  	Tag tag = (Tag)tagService.detailTag(cafeMemberNo);
    
  	if (tag == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 회원이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, tag);
  }
  
  
  @RequestMapping(value = {"/admin/cafePhoto/detail"})
  public AjaxResult detailCafePhoto(int cafeMemberNo) throws Exception {
  	CafePhoto cafePhoto = (CafePhoto)cafePhotoService.detailCafePhoto(cafeMemberNo);
    
  	if (cafePhoto == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 회원이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, cafePhoto);
  }
  
  
  @RequestMapping(value = {"/admin/menu/detail"})
  public AjaxResult detailMenu(int cafeMemberNo) throws Exception {
  	Menu menu = (Menu)menuService.detailMenu(cafeMemberNo);
    
  	if (menu == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 회원이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, menu);
  }
  
  
}





