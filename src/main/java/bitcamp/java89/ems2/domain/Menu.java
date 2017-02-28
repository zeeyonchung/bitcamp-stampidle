package bitcamp.java89.ems2.domain;

public class Menu extends Cafe {
  private static final long serialVersionUID = 1L;
  
  protected int menuNo;
  protected String menuName;
  protected int price;
  protected String menuPath;
  public int getMenuNo() {
    return menuNo;
  }
  public void setMenuNo(int menuNo) {
    this.menuNo = menuNo;
  }
  public String getMenuName() {
    return menuName;
  }
  public void setMenuName(String menuName) {
    this.menuName = menuName;
  }
  public int getPrice() {
    return price;
  }
  public void setPrice(int price) {
    this.price = price;
  }
  public String getMenuPath() {
    return menuPath;
  }
  public void setMenuPath(String menuPath) {
    this.menuPath = menuPath;
  }
  
}
