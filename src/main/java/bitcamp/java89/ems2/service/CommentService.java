package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Comment;

public interface CommentService {
	List<Comment> getList(int cafeMemberNo) throws Exception;
	int commentCount(int cafeMemberNo) throws Exception;
	int add(Comment comment) throws Exception;
}
















