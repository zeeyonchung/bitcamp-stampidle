package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.Menu;

public interface MenuDao {
	int insert(Menu menu) throws Exception;
	Menu getOne(int cafeMemberNo) throws Exception;
}
