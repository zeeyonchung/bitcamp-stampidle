package bitcamp.java89.ems2.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
  
  public List<Event> getList(int cafeMemberNo, int pageCount) throws Exception {
    Map<String, Integer> paramMap = new HashMap<>();
    paramMap.put("cafeMemberNo", cafeMemberNo);
    pageCount = (pageCount - 1) * 5;
    paramMap.put("pageCount", pageCount);
    return eventDao.getList(paramMap);
  }
  
  @Override
  public int add(Event event) throws Exception {
    
    
    return eventDao.insert(event);
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
  
















