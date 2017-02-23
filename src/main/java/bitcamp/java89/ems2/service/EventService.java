package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Event;
import bitcamp.java89.ems2.domain.Student;

public interface EventService {
  List<Event> getList() throws Exception;
  int add(Event event) throws Exception;

}
















