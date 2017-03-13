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
  
  protected List<Tag> tagList;
  protected List<CafeTime> cafeTimeList;
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
  public List<Tag> getTagList() {
    return tagList;
  }
  public void setTagList(List<Tag> tagList) {
    this.tagList = tagList;
  }
  public List<CafeTime> getCafeTimeList() {
    return cafeTimeList;
  }
  public void setCafeTimeList(List<CafeTime> cafeTimeList) {
    this.cafeTimeList = cafeTimeList;
  }
  
 
  
  
  
}
