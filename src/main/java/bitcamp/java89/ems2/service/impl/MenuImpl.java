package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.MenuDao;
import bitcamp.java89.ems2.domain.Menu;
import bitcamp.java89.ems2.service.MenuService;

@Service
public class MenuImpl implements MenuService {
  @Autowired MenuDao menuDao;

  @Override
  public int add(Menu menu) throws Exception {
    return menuDao.insert(menu);
  }
  
  public Menu detailMenu(int cafeMemberNo) throws Exception {
  	return menuDao.getOne(cafeMemberNo);
  }
}
















