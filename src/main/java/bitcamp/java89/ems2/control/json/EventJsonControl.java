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
  
  @Autowired EventService evnetService;
  
  @RequestMapping(value = "/admin/event/list")
  public AjaxResult list() throws Exception {
    List<Event> list = evnetService.getList();
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  
}





