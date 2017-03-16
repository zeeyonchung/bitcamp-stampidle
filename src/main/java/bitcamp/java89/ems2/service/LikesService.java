package bitcamp.java89.ems2.service;

public interface LikesService {
  int count(int cafeMemberNo) throws Exception;
  public void addLikes(int customMemberNo, int cafeMemberNo) throws Exception;
  int getLikesCount(int customMemberNo, int cafeMemberNo) throws Exception;
  public void deleteLikes(int customMemberNo, int cafeMemberNo) throws Exception;
}
















