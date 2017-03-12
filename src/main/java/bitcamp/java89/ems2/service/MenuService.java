package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Menu;

public interface MenuService {
  int add(Menu menu) throws Exception;
  List<Menu> detailMenu(int cafeMemberNo) throws Exception;
  int update(Menu menu) throws Exception;
}
















