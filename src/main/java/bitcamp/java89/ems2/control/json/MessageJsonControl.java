package bitcamp.java89.ems2.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Message;
import bitcamp.java89.ems2.service.MessageService;

@RestController
public class MessageJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired MessageService messageService;
  
  @RequestMapping(value = "/cstmr_m/message/addCustom")
  public AjaxResult addCustom(Message message) throws Exception {
  	messageService.addCustom(message);
    return new AjaxResult(AjaxResult.SUCCESS, "스탬프 추가 성공");
  }
}





