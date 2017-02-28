package bitcamp.java89.ems2.domain;

import java.io.Serializable;

public class StampPosition implements Serializable{

  private static final long serialVersionUID = 1L;
  
  protected int positionNo;
  protected float positionX;
  protected float positionY;
  protected  int belongStampNo;
  
  
  
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
  public int getBelongStampNo() {
    return belongStampNo;
  }
  public void setBelongStampNo(int belongStampNo) {
    this.belongStampNo = belongStampNo;
  }

  
  
}
