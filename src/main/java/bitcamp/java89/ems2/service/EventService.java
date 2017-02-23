package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Event;

public interface EventService {
  List<Event> getList() throws Exception;
  Event getDetail(int no) throws Exception;
}
















