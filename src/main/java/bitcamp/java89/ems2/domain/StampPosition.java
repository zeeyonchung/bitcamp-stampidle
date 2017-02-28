package bitcamp.java89.ems2.domain;

public class StampPosition extends StampCardInfo{
  private static final long serialVersionUID = 1L;
  
  protected int positionNo;
  protected float positionX;
  protected float positionY;
  
  
  
  public int getPositionNo() {
    return positionNo;
  }
  public void setPositionNo(int positionNo) {
    this.positionNo = positionNo;
  }
  public float getPositionX() {
    return positionX;
  }
  public void setPositionX(float positionX) {
    this.positionX = positionX;
  }
  public float getPositionY() {
    return positionY;
  }
  public void setPositionY(float positionY) {
    this.positionY = positionY;
  }
  
  
}
