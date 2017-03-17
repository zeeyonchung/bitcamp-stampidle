package bitcamp.java89.ems2.dao;

import java.util.ArrayList;

import bitcamp.java89.ems2.domain.Message;

public interface MessageDao {
	int insertCustomMsg(Message message) throws Exception;
	int insertCafeMsg(Message message) throws Exception;
	ArrayList<Message> getMsgList(Message message) throws Exception;
}
