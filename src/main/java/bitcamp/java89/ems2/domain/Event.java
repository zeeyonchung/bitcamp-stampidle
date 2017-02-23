package bitcamp.java89.ems2.domain;

public class Event extends Cafe {
  private static final long serialVersionUID = 1L;
  
  protected int eventNo;
  protected String eventTitle;
  protected String eventContents;
  protected String registDate;
  protected String eventPhotoPath;
  protected int eventView;
  protected String startDate;
  protected String endDate;
  
  
  public int getEventNo() {
    return eventNo;
  }
  public void setEventNo(int eventNo) {
    this.eventNo = eventNo;
  }
  public String getEventTitle() {
    return eventTitle;
  }
  public void setEventTitle(String eventTitle) {
    this.eventTitle = eventTitle;
  }
  public String getEventContents() {
    return eventContents;
  }
  public void setEventContents(String eventContents) {
    this.eventContents = eventContents;
  }
  public String getRegistDate() {
    return registDate;
  }
  public void setRegistDate(String registDate) {
    this.registDate = registDate;
  }
  public String getEventPhotoPath() {
    return eventPhotoPath;
  }
  public void setEventPhotoPath(String eventPhotoPath) {
    this.eventPhotoPath = eventPhotoPath;
  }
  public int getEventView() {
    return eventView;
  }
  public void setEventView(int eventView) {
    this.eventView = eventView;
  }
  public String getStartDate() {
    return startDate;
  }
  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }
  public String getEndDate() {
    return endDate;
  }
  public void setEndDate(String endDate) {
    this.endDate = endDate;
  }
  public static long getSerialversionuid() {
    return serialVersionUID;
  }
  
  
  
}
