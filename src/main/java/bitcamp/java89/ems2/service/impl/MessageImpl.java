package bitcamp.java89.ems2.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.MessageDao;
import bitcamp.java89.ems2.domain.Message;
import bitcamp.java89.ems2.service.MessageService;

@Service
public class MessageImpl implements MessageService {
  @Autowired MessageDao messageDao;

  @Override
  public int insertMsg(Message message) throws Exception {
    return messageDao.insertMsg(message);
  }
  
  @Override
  public List<Message> getMsgListCstmr(int customMemberNo, String sendMember) throws Exception {
  	Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("customMemberNo", customMemberNo);
    paramMap.put("sendMember", sendMember);
    return messageDao.getMsgListCstmr(paramMap);
  }
  
  @Override
  public List<Message> getMsgListCafe(int cafeMemberNo, String sendMember) throws Exception {
  	System.out.println(cafeMemberNo + "iiiiii" + sendMember);
  	Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("cafeMemberNo", cafeMemberNo);
    paramMap.put("sendMember", sendMember);
    return messageDao.getMsgListCafe(paramMap);
  }
  
  @Override
  public void deleteMsg(Message message) throws Exception {
    messageDao.deleteMsg(message);
  }
}
















