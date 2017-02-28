package bitcamp.java89.ems2.domain;

public class CafePhoto extends Cafe {
  private static final long serialVersionUID = 1L;
  
  protected int cafePhotoNo;
  protected String path;
  
  public int getCafePhotoNo() {
    return cafePhotoNo;
  }
  public void setCafePhotoNo(int cafePhotoNo) {
    this.cafePhotoNo = cafePhotoNo;
  }
  public String getPath() {
    return path;
  }
  public void setPath(String path) {
    this.path = path;
  }
  
  
  
}
