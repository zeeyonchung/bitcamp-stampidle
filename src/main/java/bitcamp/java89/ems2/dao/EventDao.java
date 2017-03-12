package bitcamp.java89.ems2.dao;

import java.util.ArrayList;
import java.util.Map;

import bitcamp.java89.ems2.domain.Event;

public interface EventDao {
  ArrayList<Event> getList(Map<String, Object> paramMap) throws Exception;
  ArrayList<Event> getListAllEvent(Map<String, Object> paramMap) throws Exception;
  ArrayList<Event> getListByTitle(Map<String, Object> paramMap) throws Exception;
  ArrayList<Event> getListByCafe(Map<String, Object> paramMap) throws Exception;
  ArrayList<Event> getListByContents(Map<String, Object> paramMap) throws Exception;
  int insert(Event event) throws Exception;
  Event getOne(int eventNo) throws Exception;
  int countByNo(int eventNo) throws Exception;
  int delete(int eventNo) throws Exception;
  void updateView(int eventNo) throws Exception;
  int update(Event event) throws Exception;
  int getCount(int cafeMemberNo) throws Exception;
  int getCountAll() throws Exception;
  int getCountByKeyword(Map<String, Object> paramMap) throws Exception;
}
