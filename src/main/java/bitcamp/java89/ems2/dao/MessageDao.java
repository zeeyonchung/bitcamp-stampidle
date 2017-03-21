package bitcamp.java89.ems2.dao;

import java.util.ArrayList;
import java.util.Map;

import bitcamp.java89.ems2.domain.Message;

public interface MessageDao {
	int insertMsg(Message message) throws Exception;
	ArrayList<Message> getMsgListCstmr(Map<String, Object> paramMap) throws Exception;
	ArrayList<Message> getMsgListCafe(Map<String, Object> paramMap) throws Exception;
	ArrayList<Message> getMsgListAllCstmr(int cafeMemberNo) throws Exception;
	void deleteMsg(Message message) throws Exception;
}
