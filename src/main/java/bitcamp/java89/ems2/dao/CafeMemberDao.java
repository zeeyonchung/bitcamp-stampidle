package bitcamp.java89.ems2.dao;

import java.util.ArrayList;

import bitcamp.java89.ems2.domain.Event;

public interface CafeMemberDao {
  ArrayList<Event> getList() throws Exception;

}
