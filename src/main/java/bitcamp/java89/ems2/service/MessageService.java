package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Message;

public interface MessageService {
  int insertMsg(Message message) throws Exception;
  List<Message> getMsgList(int customMemberNo, int cafeMemberNo) throws Exception;
  List<Message> getLastMsgList(int customMemberNo, int cafeMemberNo, String sendMember) throws Exception;
}
















