package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Message;

public interface MessageService {
  int insertMsg(Message message) throws Exception;
  List<Message> getMsgListCstmr(int customMemberNo, String sendMember) throws Exception;
  List<Message> getMsgListCafe(int cafeMemberNo, String sendMember) throws Exception;
  void deleteMsg(Message message) throws Exception;
}
















