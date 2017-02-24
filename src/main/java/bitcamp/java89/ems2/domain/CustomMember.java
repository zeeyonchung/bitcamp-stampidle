package bitcamp.java89.ems2.domain;

import java.io.Serializable;

public class CustomMember implements Serializable {
  
  private static final long serialVersionUID = 1L;
  protected int customMemberNo;
  protected String tel;
  protected String email;
  protected String name;
  protected String nick;
  protected String spot;
  protected boolean allow;
  
  public int getCustomMemberNo() {
    return customMemberNo;
  }
  public void setCustomMemberNo(int customMemberNo) {
    this.customMemberNo = customMemberNo;
  }
  public String getTel() {
    return tel;
  }
  public void setTel(String tel) {
    this.tel = tel;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getNick() {
    return nick;
  }
  public void setNick(String nick) {
    this.nick = nick;
  }
  public String getSpot() {
    return spot;
  }
  public void setSpot(String spot) {
    this.spot = spot;
  }
  public boolean isAllow() {
    return allow;
  }
  public void setAllow(boolean allow) {
    this.allow = allow;
  }
  
  
}
