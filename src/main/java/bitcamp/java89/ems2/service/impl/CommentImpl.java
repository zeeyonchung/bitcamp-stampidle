package bitcamp.java89.ems2.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CommentDao;
import bitcamp.java89.ems2.domain.Comment;
import bitcamp.java89.ems2.service.CommentService;

@Service
public class CommentImpl implements CommentService {
  @Autowired CommentDao commentDao;

  public List<Comment> getList(int cafeMemberNo) throws Exception {
  	return commentDao.getList(cafeMemberNo);
  }
  
  @Override
  public int commentCount(int cafeMemberNo) throws Exception {
    return commentDao.commentCount(cafeMemberNo);
  }
  
  @Override
  public int add(Comment comment) throws Exception {
    return commentDao.commentAdd(comment);
  }
  
  @Override
  public int delete(int commentsNo) throws Exception {
    return commentDao.commentDelete(commentsNo);
  }
  
}
















