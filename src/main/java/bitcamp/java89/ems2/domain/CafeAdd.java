package bitcamp.java89.ems2.domain;

import java.util.List;

public class CafeAdd {
  
  protected Cafe cafe;
  protected List<CafeTime> cafeTimeList;
  protected Tag tag;
  protected List<CafePhoto> cafePhotoList;
  protected List<Menu> menuList;
  
  
  
  public Cafe getCafe() {
    return cafe;
  }
  public void setCafe(Cafe cafe) {
    this.cafe = cafe;
  }
  public List<CafeTime> getCafeTimeList() {
    return cafeTimeList;
  }
  public void setCafeTimeList(List<CafeTime> cafeTimeList) {
    this.cafeTimeList = cafeTimeList;
  }
  public Tag getTag() {
    return tag;
  }
  public void setTag(Tag tag) {
    this.tag = tag;
  }
  public List<CafePhoto> getCafePhotoList() {
    return cafePhotoList;
  }
  public void setCafePhotoList(List<CafePhoto> cafePhotoList) {
    this.cafePhotoList = cafePhotoList;
  }
  public List<Menu> getMenuList() {
    return menuList;
  }
  public void setMenuList(List<Menu> menuList) {
    this.menuList = menuList;
  }
  
  
  
  
}
