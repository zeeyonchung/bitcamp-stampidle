package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.Message;

public interface MessageDao {
	int insertCustomMsg(Message message) throws Exception;
}
