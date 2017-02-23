package bitcamp.java89.ems2.dao;

import java.util.ArrayList;

import bitcamp.java89.ems2.domain.Event;

public interface EventDao {
  ArrayList<Event> getList(int cafeMemberNo) throws Exception;
  Event getOne(int memberNo) throws Exception;
}
