package bitcamp.java89.ems2.dao;

import java.util.ArrayList;

import bitcamp.java89.ems2.domain.Comment;

public interface CommentDao {
  ArrayList<Comment> getList(int cafeMemberNo) throws Exception;
  int commentCount(int cafeMemberNo) throws Exception;
  int commentAdd(Comment comment) throws Exception;
  int commentDelete(int cmmentsNo) throws Exception;
}
