package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.CafePhoto;

public interface CafePhotoDao {
	int insert(CafePhoto cafePhoto) throws Exception;
	CafePhoto getOne(int cafeMemberNo) throws Exception;
	int update(CafePhoto cafePhoto) throws Exception;
}
