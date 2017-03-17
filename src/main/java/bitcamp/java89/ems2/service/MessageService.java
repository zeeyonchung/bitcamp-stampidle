package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Message;

public interface MessageService {
  int addCustom(Message message) throws Exception;
  int addCafe(Message message) throws Exception;
  List<Message> getMsgList(int customMemberNo, int cafeMemberNo) throws Exception;
}
















