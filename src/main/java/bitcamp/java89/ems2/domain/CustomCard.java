package bitcamp.java89.ems2.domain;

import java.util.List;

public class CustomCard extends StampCardInfo {
  private static final long serialVersionUID = 1L;

  protected int customCardNo;
  protected String cardIssueDate;
  protected String cardState;
  protected String cardUseDate;
  
  protected List<Stamp> stampList;
  
  protected int customMemberNo;
  protected String customTel;
  protected String customEmail;
  protected String customName;
  protected String customNick;
  protected String customPhoto;
  
  protected int currentStampCount;
  protected String recentStampDate;
  
  
public String getRecentStampDate() {
    return recentStampDate;
  }
  public void setRecentStampDate(String recentStampDate) {
    this.recentStampDate = recentStampDate;
  }
public int getCurrentStampCount() {
    return currentStampCount;
  }
  public void setCurrentStampCount(int currentStampCount) {
    this.currentStampCount = currentStampCount;
  }
public String getCardUseDate() {
    return cardUseDate;
  }
  public void setCardUseDate(String cardUseDate) {
    this.cardUseDate = cardUseDate;
  }
public String getCustomPhoto() {
    return customPhoto;
  }
  public void setCustomPhoto(String customPhoto) {
    this.customPhoto = customPhoto;
  }
public int getCustomCardNo() {
	return customCardNo;
}
public void setCustomCardNo(int customCardNo) {
	this.customCardNo = customCardNo;
}
public String getCardIssueDate() {
	return cardIssueDate;
}
public void setCardIssueDate(String cardIssueDate) {
	this.cardIssueDate = cardIssueDate;
}
public String getCardState() {
	return cardState;
}
public void setCardState(String cardState) {
	this.cardState = cardState;
}
public List<Stamp> getStampList() {
	return stampList;
}
public void setStampList(List<Stamp> stampList) {
	this.stampList = stampList;
}
public int getCustomMemberNo() {
	return customMemberNo;
}
public void setCustomMemberNo(int customMemberNo) {
	this.customMemberNo = customMemberNo;
}
public String getCustomTel() {
	return customTel;
}
public void setCustomTel(String customTel) {
	this.customTel = customTel;
}
public String getCustomEmail() {
	return customEmail;
}
public void setCustomEmail(String customEmail) {
	this.customEmail = customEmail;
}
public String getCustomName() {
	return customName;
}
public void setCustomName(String customName) {
	this.customName = customName;
}
public String getCustomNick() {
	return customNick;
}
public void setCustomNick(String customNick) {
	this.customNick = customNick;
}
  
  
  

}
