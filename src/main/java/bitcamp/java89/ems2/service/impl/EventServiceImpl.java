package bitcamp.java89.ems2.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafeDao;
import bitcamp.java89.ems2.dao.CafeMemberDao;
import bitcamp.java89.ems2.dao.EventDao;
import bitcamp.java89.ems2.domain.Event;
import bitcamp.java89.ems2.service.EventService;

@Service
public class EventServiceImpl implements EventService {
  @Autowired CafeMemberDao cafeMemberNo;
  @Autowired CafeDao cafeDao;
  @Autowired EventDao eventDao;
  
  public List<Event> getList(int cafeMemberNo) throws Exception {
    return eventDao.getList(cafeMemberNo);
  }
  
  public Event getDetail(int eventNo) throws Exception {
    return eventDao.getOne(eventNo);
  }
  
  public int delete(int eventNo) throws Exception {
    if (eventDao.countByNo(eventNo) == 0) {
      throw new Exception("해당 글이 없습니다.");
    }
    
    int count = eventDao.delete(eventNo);
    
    return count;
  }
}
















