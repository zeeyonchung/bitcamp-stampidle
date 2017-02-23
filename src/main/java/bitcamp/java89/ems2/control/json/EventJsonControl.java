package bitcamp.java89.ems2.control.json;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Event;
import bitcamp.java89.ems2.service.EventService;

@RestController
public class EventJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired EventService eventService;
  
  @RequestMapping(value = "/admin/event/main")
  public AjaxResult list(int cafeMemberNo) throws Exception {
    List<Event> list = eventService.getList(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  
  @RequestMapping(value = "/admin/event/detail")
  public AjaxResult detail(int eventNo) throws Exception {
    Event event = eventService.getDetail(eventNo);
    
    if (event == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 글이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, event);
  }
  
  
}





