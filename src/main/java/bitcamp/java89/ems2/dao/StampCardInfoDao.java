package bitcamp.java89.ems2.dao;

import java.util.List;

import bitcamp.java89.ems2.domain.StampCardInfo;

public interface StampCardInfoDao {
  int insert(StampCardInfo stampCardInfo) throws Exception;
  int insertPosition(StampCardInfo stampCardInfo) throws Exception;
  StampCardInfo getCardInfo(int cafeMemberNo) throws Exception;
  List<StampCardInfo> getCafeCardDetail(int cafeMemberNo) throws Exception;
}
