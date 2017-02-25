package bitcamp.java89.ems2.control.json;

import java.io.File;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java89.ems2.domain.Event;
import bitcamp.java89.ems2.service.EventService;
import bitcamp.java89.ems2.util.MultipartUtil;

@RestController
public class EventJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired EventService eventService;
  
  @RequestMapping(value = "/admin/event/main")
  public AjaxResult list(int cafeMemberNo, int pageCount) throws Exception {
    List<Event> list = eventService.getList(cafeMemberNo, pageCount);
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  @RequestMapping(value = "/admin/event/add")
  public AjaxResult add(Event event, MultipartFile photo) throws Exception {
    
    // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
    if (photo != null && photo.getSize() > 0) { 
      String newFilename = MultipartUtil.generateFilename();
      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
      event.setEventPhotoPath(newFilename);
    }
    
    eventService.add(event);

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  
  @RequestMapping(value = "/admin/event/detail")
  public AjaxResult detail(int eventNo) throws Exception {
    Event event = eventService.getDetail(eventNo);
    
    if (event == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 글이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, event);
  }
  
  
  @RequestMapping(value = "/admin/event/delete")
  public AjaxResult delete(int eventNo) throws Exception {
    int count = eventService.delete(eventNo);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 글이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "삭제 성공입니다.");
  }
  
  @RequestMapping(value="/admin/event/update")
  public AjaxResult update(Event event) throws Exception {

    int count = eventService.update(event);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
  
  @RequestMapping("/admin/event/pagination")
  public AjaxResult pagination(int currentPage) throws Exception {
    List<Integer> pageNumbers = eventService.getPagination(currentPage);
    
    return new AjaxResult(AjaxResult.SUCCESS, pageNumbers);
  }
}





