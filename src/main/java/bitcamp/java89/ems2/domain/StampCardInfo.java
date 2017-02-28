package bitcamp.java89.ems2.domain;

import java.util.List;

public class StampCardInfo extends Cafe {
  private static final long serialVersionUID = 1L;
  
  protected int stampCafeCardNo;
  protected String backImgPath;
  protected int stampCount;
  protected String stampImgPath;
  protected List<StampPosition> stampPositionList;
  
  
  
  
  public int getStampCafeCardNo() {
    return stampCafeCardNo;
  }
  public void setStampCafeCardNo(int stampCafeCardNo) {
    this.stampCafeCardNo = stampCafeCardNo;
  }
  public String getBackImgPath() {
    return backImgPath;
  }
  public void setBackImgPath(String backImgPath) {
    this.backImgPath = backImgPath;
  }
  public int getStampCount() {
    return stampCount;
  }
  public void setStampCount(int stampCount) {
    this.stampCount = stampCount;
  }
  public String getStampImgPath() {
    return stampImgPath;
  }
  public void setStampImgPath(String stampImgPath) {
    this.stampImgPath = stampImgPath;
  }
  public List<StampPosition> getStampPositionList() {
    return stampPositionList;
  }
  public void setStampPositionList(List<StampPosition> stampPositionList) {
    this.stampPositionList = stampPositionList;
  }
  
}
