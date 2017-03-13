package bitcamp.java89.ems2.dao;

import java.util.List;

import bitcamp.java89.ems2.domain.StampCardInfo;
import bitcamp.java89.ems2.domain.StampPosition;

public interface StampCardInfoDao {
  int insert(StampCardInfo stampCardInfo) throws Exception;
  int insertPosition(StampPosition stampPosition) throws Exception;
  StampCardInfo getCardInfo(int cafeMemberNo) throws Exception;
  List<StampCardInfo> getCafeCardDetail(int cafeMemberNo) throws Exception;
}
