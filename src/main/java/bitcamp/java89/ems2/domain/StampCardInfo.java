package bitcamp.java89.ems2.domain;

import java.util.List;

public class StampCardInfo extends Cafe {
  private static final long serialVersionUID = 1L;
  
  protected int stampCafeCardNo;
  protected String frontImgPath;
  protected String backImgPath;
  protected int stampCount;
  protected String stampImgPath;
  protected String service;
  
  protected List<StampPosition> stampPositionList;
  
  
  
  
public String getFrontImgPath() {
    return frontImgPath;
  }
  public void setFrontImgPath(String frontImgPath) {
    this.frontImgPath = frontImgPath;
  }
  public String getService() {
    return service;
  }
  public void setService(String service) {
    this.service = service;
  }
public List<StampPosition> getStampPositionList() {
	return stampPositionList;
}
public void setStampPositionList(List<StampPosition> stampPositionList) {
	this.stampPositionList = stampPositionList;
}
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

}
