package bitcamp.java89.ems2.domain;

import java.util.List;

public class Cafe extends CafeMember {
  private static final long serialVersionUID = 1L;
  
  protected String cafeTel;
  protected String cafeName;
  protected String intro;
  protected String postCode;
	protected String address;
  protected String detailAddress;
  protected int chairNo;
  protected String logPath;
  
  protected int tagNo;
  protected String tagName;
  
  protected List<CafeTime> cafeTimeList;
  
  protected int likesCount;
  protected int cafeCount;
  
  
  

  public int getCafeCount() {
    return cafeCount;
  }

  public void setCafeCount(int cafeCount) {
    this.cafeCount = cafeCount;
  }

  public int getLikesCount() {
    return likesCount;
  }

  public void setLikesCount(int likesCount) {
    this.likesCount = likesCount;
  }

  public String getCafeTel() {
    return cafeTel;
  }

  public void setCafeTel(String cafeTel) {
    this.cafeTel = cafeTel;
  }

  public String getCafeName() {
    return cafeName;
  }

  public void setCafeName(String cafeName) {
    this.cafeName = cafeName;
  }

  public String getIntro() {
    return intro;
  }

  public void setIntro(String intro) {
    this.intro = intro;
  }

  public String getPostCode() {
    return postCode;
  }

  public void setPostCode(String postCode) {
    this.postCode = postCode;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getDetailAddress() {
    return detailAddress;
  }

  public void setDetailAddress(String detailAddress) {
    this.detailAddress = detailAddress;
  }

  public int getChairNo() {
    return chairNo;
  }

  public void setChairNo(int chairNo) {
    this.chairNo = chairNo;
  }

  public String getLogPath() {
    return logPath;
  }

  public void setLogPath(String logPath) {
    this.logPath = logPath;
  }

  public int getTagNo() {
    return tagNo;
  }

  public void setTagNo(int tagNo) {
    this.tagNo = tagNo;
  }

  public String getTagName() {
    return tagName;
  }

  public void setTagName(String tagName) {
    this.tagName = tagName;
  }

  public List<CafeTime> getCafeTimeList() {
    return cafeTimeList;
  }

  public void setCafeTimeList(List<CafeTime> cafeTimeList) {
    this.cafeTimeList = cafeTimeList;
  }
  
  
}
