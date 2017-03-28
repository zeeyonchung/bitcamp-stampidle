package bitcamp.java89.ems2.control.json;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Message;
import bitcamp.java89.ems2.service.CustomMemberService;
import bitcamp.java89.ems2.service.MessageService;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@RestController
public class MessageJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired MessageService messageService;
  @Autowired CustomMemberService customMemberService;
  
  @RequestMapping(value = "/message/insertMsg")
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
  	List<Message> list = messageService.getMsgListCafe(cafeMemberNo, sendMember);
  	return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  

@RequestMapping("/cstmr_m/sms")
 public AjaxResult sms(String customTel, String text) throws Exception {
	 System.out.println(customTel + " " + text + "-----------------------------");
	 
	 net.nurigo.java_sdk.api.Message coolsms = new net.nurigo.java_sdk.api.Message("NCS58D4D67BACF13", "C6AA1000E7622662A47428356D6B86EC");
  
	 HashMap<String, String> params = new HashMap<String, String>();
	 params.put("to", customTel);
   params.put("from", "01032380192");
   params.put("type", "SMS");
   params.put("text", "[stampidle 선물] " + text);
   params.put("app_version", "test app 1.2");

   //params 키, 값 목록확인
   for (Map.Entry<String, String> entry : params.entrySet()) {
     System.out.println(entry.getKey() + ", " + entry.getValue());
   }
   
   try {
     JSONObject obj = (JSONObject)coolsms.send(params);
     System.out.println(obj.toString());
     return new AjaxResult(AjaxResult.SUCCESS, obj);
   } catch (CoolsmsException e) {
     System.out.println(e.getMessage() + "getMessage");
     System.out.println(e.getCode() + "getCode");
     return new AjaxResult(AjaxResult.FAIL, e.getMessage());
   }
 }
 
 
}





