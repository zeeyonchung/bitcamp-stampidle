package bitcamp.java89.ems2.dao;

import java.util.ArrayList;
import java.util.Map;

import bitcamp.java89.ems2.domain.Message;

public interface MessageDao {
	int insertMsg(Message message) throws Exception;
	ArrayList<Message> getMsgList(Map<String, Object> paramMap) throws Exception;
	ArrayList<Message> getLastMsgList(Map<String, Object> paramMap) throws Exception;
}
