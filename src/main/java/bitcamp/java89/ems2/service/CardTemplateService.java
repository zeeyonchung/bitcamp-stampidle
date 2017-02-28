package bitcamp.java89.ems2.service;

import bitcamp.java89.ems2.domain.StampCardInfo;
import bitcamp.java89.ems2.domain.StampPosition;

public interface CardTemplateService {
  int add(StampCardInfo stampCardInfo) throws Exception;
  void addStampPosition(StampPosition stampPosition) throws Exception;
}
















