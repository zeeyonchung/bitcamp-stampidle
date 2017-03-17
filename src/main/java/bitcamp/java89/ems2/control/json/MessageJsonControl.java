package bitcamp.java89.ems2.control.json;

import java.util.List;

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
  
  @RequestMapping(value = "/cstmr_m/message/insertMsg")
  public AjaxResult getMsgList(Message message) throws Exception {
  	System.out.println("-------" + message.getContents());
  	messageService.insertMsg(message);
    return new AjaxResult(AjaxResult.SUCCESS, "메시지 추가 성공");
  }
  
  @RequestMapping(value = "/cstmr_m/messageDetail/getMsgList")
  public AjaxResult getMsgList(int customMemberNo, int cafeMemberNo) throws Exception {
  	List<Message> list = messageService.getMsgList(customMemberNo, cafeMemberNo);
  	return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  /*@RequestMapping(value = "/cstmr_m/message/getLastMsgList")
  public AjaxResult getLastMsgList(int customMemberNo, int cafeMemberNo, String sendMember) throws Exception {
  	List<Message> list = messageService.getLastMsgList(customMemberNo, cafeMemberNo, sendMember);
  	return new AjaxResult(AjaxResult.SUCCESS, list);
  }*/
  
  
}





