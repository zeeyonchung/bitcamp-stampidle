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
  
  public int count(int cafeMemberNo) throws Exception {
  	return commentDao.count(cafeMemberNo);
  }
}
















