package bitcamp.java89.ems2.dao;

import java.util.ArrayList;
import java.util.Map;

import bitcamp.java89.ems2.domain.Event;

public interface EventDao {
  ArrayList<Event> getList(Map<String, Integer> paramMap) throws Exception;
  int insert(Event event) throws Exception;
  Event getOne(int eventNo) throws Exception;
  int countByNo(int eventNo) throws Exception;
  int delete(int eventNo) throws Exception;
  int getCount(int currentPage) throws Exception;
}
