package bitcamp.java89.ems2.domain;

public class Comment extends CustomMember {
  private static final long serialVersionUID = 1L;
  
  protected int commentNo;
  protected String contents;
  protected int star;
  protected String uploadDate;
  
	public int getCommentNo() {
		return commentNo;
	}
	public void setCommentNo(int commentNo) {
		this.commentNo = commentNo;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public String getUploadDate() {
		return uploadDate;
	}
	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}
  
}
