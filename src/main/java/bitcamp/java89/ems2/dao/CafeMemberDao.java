package bitcamp.java89.ems2.dao;

import java.util.ArrayList;
import java.util.Map;

import bitcamp.java89.ems2.domain.CafeMember;
import bitcamp.java89.ems2.domain.Event;

public interface CafeMemberDao {
  ArrayList<Event> getList() throws Exception;
  CafeMember getOneByIdPassword(Map<String,String> paramMap) throws Exception;
}
