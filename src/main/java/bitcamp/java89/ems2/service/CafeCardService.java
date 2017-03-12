package bitcamp.java89.ems2.service;

import bitcamp.java89.ems2.domain.StampCardInfo;
import bitcamp.java89.ems2.domain.StampPosition;

public interface CafeCardService {
  int add(StampCardInfo stampCardInfo) throws Exception;
  void addPosition(StampPosition stampPosition) throws Exception;
  StampCardInfo getCardInfo(int cafeMemberNo) throws Exception;
}
















