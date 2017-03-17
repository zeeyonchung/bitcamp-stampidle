package bitcamp.java89.ems2.domain;

public class Message extends CustomMember {
  private static final long serialVersionUID = 1L;
  
  protected int messageNo;
  protected int sendMemberNo;
  protected String contents;
  protected String uploadTime;
  protected int cafeMemberNo;
  protected String cafeName;
  protected String logoPath;
  
  
	public int getMessageNo() {
		return messageNo;
	}
	public void setMessageNo(int messageNo) {
		this.messageNo = messageNo;
	}
	public int getSendMemberNo() {
		return sendMemberNo;
	}
	public void setSendMemberNo(int sendMemberNo) {
		this.sendMemberNo = sendMemberNo;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public String getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(String uploadTime) {
		this.uploadTime = uploadTime;
	}
	public int getCafeMemberNo() {
		return cafeMemberNo;
	}
	public void setCafeMemberNo(int cafeMemberNo) {
		this.cafeMemberNo = cafeMemberNo;
	}
	public String getCafeName() {
		return cafeName;
	}
	public void setCafeName(String cafeName) {
		this.cafeName = cafeName;
	}
	public String getLogoPath() {
		return logoPath;
	}
	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}
	
  
  
	
  
	
  
}
