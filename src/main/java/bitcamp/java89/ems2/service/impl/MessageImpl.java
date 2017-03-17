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
  public int addCustom(Message message) throws Exception {
    return messageDao.insertCustomMsg(message);
  }
  @Override
  public int addCafe(Message message) throws Exception {
    return messageDao.insertCustomMsg(message);
  }
  @Override
  public List<Message> getMsgList(int customMemberNo, int cafeMemberNo) throws Exception {
  	Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("customMemberNo", customMemberNo);
    paramMap.put("cafeMemberNo", cafeMemberNo);
    return messageDao.getMsgList(paramMap);
  }
  
}
















