package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Event;

public interface EventService {
  List<Event> getList(int cafeMemberNo, int pageCount) throws Exception;
  int add(Event event) throws Exception;
  Event getDetail(int eventNo) throws Exception;
  int delete(int eventNo) throws Exception;
  int update(Event event) throws Exception;
  List<Integer> getPagination(int currentPage) throws Exception;
}
















