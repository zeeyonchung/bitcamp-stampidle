package bitcamp.java89.ems2.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.MenuDao;
import bitcamp.java89.ems2.domain.Menu;
import bitcamp.java89.ems2.service.MenuService;

@Service
public class MenuImpl implements MenuService {
  @Autowired MenuDao menuDao;

  
  public List<Menu> detailMenu(int cafeMemberNo) throws Exception {
  	return menuDao.getOne(cafeMemberNo);
  }
  
  public int update(Menu menu) throws Exception {
    return menuDao.update(menu);
  }
}
















