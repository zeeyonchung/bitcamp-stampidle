package bitcamp.java89.ems2.service;

import bitcamp.java89.ems2.domain.Menu;

public interface MenuService {
  int add(Menu menu) throws Exception;
  Menu detailMenu(int cafeMemberNo) throws Exception;
  int update(Menu menu) throws Exception;
}
















