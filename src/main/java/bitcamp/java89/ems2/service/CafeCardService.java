package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.StampCardInfo;

public interface CafeCardService {
  int add(StampCardInfo stampCardInfo) throws Exception;
  StampCardInfo getCardInfo(int cafeMemberNo) throws Exception;
  List<StampCardInfo> getCafeCardDetail(int cafeMemberNo) throws Exception;
}
















