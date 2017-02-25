package bitcamp.java89.ems2.service.impl;

import java.util.ArrayList;
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
  
  public int update(Event event) throws Exception {
    if (eventDao.countByNo(event.getEventNo()) == 0) {
      throw new Exception("해당이벤트 번호가 존재하지 않습니다.");
    }
    return eventDao.update(event);
}

  
  public List<Integer> getPagination(int currentPage) throws Exception {
    
    List<Integer> list = new ArrayList<>();
    
    int allEventNo = eventDao.getCount(currentPage);
    int pageNo = 0;
    
    if (allEventNo % 5 != 0) {
      pageNo = (allEventNo / 5) + 1;
    } else {
      pageNo = allEventNo / 5;
    }
    
    
    if (currentPage % 5 == 0) {
      for (int i = currentPage - 4; i <= pageNo; i++) {
        if (list.size() == 5) {break;}
        list.add(i);
      }
    } else {
      int currentPosition = currentPage % 5;
      for (int i = currentPage - currentPosition + 1; i <= pageNo; i++) {
        if (list.size() == 5) {break;}
        list.add(i);
      }
    }
    
    return list;
  }
}
  
















