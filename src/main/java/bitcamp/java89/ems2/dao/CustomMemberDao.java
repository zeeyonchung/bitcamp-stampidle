package bitcamp.java89.ems2.dao;

import java.util.ArrayList;

import bitcamp.java89.ems2.domain.CustomMember;

public interface CustomMemberDao {
  int insert(CustomMember customMember) throws Exception;
  ArrayList<CustomMember> getSrchListCustomMember() throws Exception;
  
}
