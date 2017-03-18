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
  public AjaxResult insertMsg(Message message) throws Exception {
  	messageService.insertMsg(message);
    return new AjaxResult(AjaxResult.SUCCESS, "메시지 추가 성공");
  }
  
  /*@RequestMapping(value = "/cstmr_m/message/deleteMsg")
  public AjaxResult deleteMsg(Message message) throws Exception {
  	messageService.deleteMsg(message);
  	return new AjaxResult(AjaxResult.SUCCESS, "메시지 삭제 성공");
  }*/
  
  @RequestMapping(value = "/cstmr_m/message/getMsgListCstmr")
  public AjaxResult getMsgListCstmr(int customMemberNo, String sendMember) throws Exception {
  	List<Message> list = messageService.getMsgListCstmr(customMemberNo, sendMember);
  	return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
 @RequestMapping(value = {"/admin/message/getMsgListCafe", "/admin_m/message/getMsgListCafe"})
  public AjaxResult getMsgListCafe(int cafeMemberNo, String sendMember) throws Exception {
	 System.out.println(cafeMemberNo + "ttttttt" + sendMember);
  	List<Message> list = messageService.getMsgListCafe(cafeMemberNo, sendMember);
  	return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
}





