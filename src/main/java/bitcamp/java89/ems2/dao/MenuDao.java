package bitcamp.java89.ems2.dao;

import java.util.ArrayList;

import bitcamp.java89.ems2.domain.Menu;

public interface MenuDao {
	int insert(Menu menu) throws Exception;
	ArrayList<Menu> getOne(int cafeMemberNo) throws Exception;
	int update(Menu menu) throws Exception;
	int delete(int cafeMemberNo) throws Exception;
}
