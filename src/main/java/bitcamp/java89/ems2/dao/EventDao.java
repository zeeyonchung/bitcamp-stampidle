package bitcamp.java89.ems2.dao;

import java.util.ArrayList;

import bitcamp.java89.ems2.domain.Event;

public interface EventDao {
  ArrayList<Event> getList() throws Exception;
  int insert(Event event) throws Exception;
  ArrayList<Event> getList(int cafeMemberNo) throws Exception;
  Event getOne(int eventNo) throws Exception;
  int countByNo(int eventNo) throws Exception;
  int delete(int eventNo) throws Exception;
}
