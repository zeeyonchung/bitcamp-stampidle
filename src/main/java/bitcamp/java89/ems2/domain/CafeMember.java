package bitcamp.java89.ems2.domain;

import java.io.Serializable;

public class CafeMember implements Serializable {
  
  private static final long serialVersionUID = 1L;
  protected int cafeMemberNo;
  protected String id;
  protected String cellNo;
  protected String companyNo;
  protected String Email;
  protected String password;
  
  
  public int getCafeMemberNo() {
    return cafeMemberNo;
  }
  public void setCafeMemberNo(int cafeMemberNo) {
    this.cafeMemberNo = cafeMemberNo;
  }
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getCellNo() {
    return cellNo;
  }
  public void setCellNo(String cellNo) {
    this.cellNo = cellNo;
  }
  public String getCompanyNo() {
    return companyNo;
  }
  public void setCompanyNo(String companyNo) {
    this.companyNo = companyNo;
  }
  public String getEmail() {
    return Email;
  }
  public void setEmail(String email) {
    Email = email;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  
  
}
