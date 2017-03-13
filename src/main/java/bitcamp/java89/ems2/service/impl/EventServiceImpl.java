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
  
  public List<Event> getList(int cafeMemberNo, int pageCount, int postNo, String searchCondition, String searchKeyword) throws Exception {
    Map<String, Object> paramMap = new HashMap<>();
    int firstPost = (pageCount - 1) * postNo;
    int allEventNo = eventDao.getCount(cafeMemberNo);
    if (firstPost > allEventNo) {
    	firstPost = (pageCount - 2) * postNo;
    }
    
    paramMap.put("cafeMemberNo", cafeMemberNo);
    paramMap.put("firstPost", firstPost);
    paramMap.put("postNo", postNo);
    
    if (searchKeyword != null) {
      paramMap.put("searchKeyword", searchKeyword);
      if (searchCondition != null) {
        switch (searchCondition) {
          case "e.titl" : 
            paramMap.put("searchCondition", searchCondition);
            return eventDao.getListByTitle(paramMap);
          case "c.cname" :
            paramMap.put("searchCondition", searchCondition); 
            return eventDao.getListByCafe(paramMap);
          case "e.econts" :
            paramMap.put("searchCondition", searchCondition); 
            return eventDao.getListByContents(paramMap);
        }
      }
      
    }
    return eventDao.getList(paramMap);
  }
  
  
  public List<Event> getListInfinityScroll(int cafeMemberNo, int pageCount, int postNo) throws Exception {
    Map<String, Object> paramMap = new HashMap<>();
    int firstPost = (pageCount - 1) * postNo;
    int allEventNo = eventDao.getCount(cafeMemberNo);
    if (firstPost > allEventNo) {
      firstPost = (pageCount - 2) * postNo;
    }
    
    paramMap.put("cafeMemberNo", cafeMemberNo);
    paramMap.put("firstPost", firstPost);
    paramMap.put("postNo", postNo);
    return eventDao.getList(paramMap);
  }
  
  public List<Event> getAllListInfinityScroll(int pageCount, int postNo) throws Exception {
    Map<String, Object> paramMap = new HashMap<>();
    int firstPost = (pageCount - 1) * postNo;
    
    paramMap.put("firstPost", firstPost);
    paramMap.put("postNo", postNo);
    return eventDao.getListAllEvent(paramMap);
  }
  
  
  public int getCount(int cafeMemberNo, String searchCondition, String searchKeyword) throws Exception {
    int allEventNo = 0;
    if (searchCondition != "" && searchKeyword != "") {
      Map<String, Object> paramMap = new HashMap<>();
      paramMap.put("cafeMemberNo", cafeMemberNo);
      paramMap.put("searchCondition", searchCondition);
      paramMap.put("searchKeyword", searchKeyword);
      allEventNo = eventDao.getCountByKeyword(paramMap);
    } else {
      allEventNo = eventDao.getCount(cafeMemberNo);
    }
    
    return allEventNo;
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
  
  
  public void updateView(int eventNo) throws Exception {
    eventDao.updateView(eventNo);
  }

  
  public List<Integer> getPagination(int cafeMemberNo, int currentPage, int postNo, String searchCondition, String searchKeyword) throws Exception {
    
    List<Integer> list = new ArrayList<>();
    
    int allEventNo = 0;
    
    if (searchCondition != "" && searchKeyword != "") {
      Map<String, Object> paramMap = new HashMap<>();
      paramMap.put("cafeMemberNo", cafeMemberNo);
      paramMap.put("searchCondition", searchCondition);
      paramMap.put("searchKeyword", searchKeyword);
      allEventNo = eventDao.getCountByKeyword(paramMap);
    } else {
      allEventNo = eventDao.getCount(cafeMemberNo);
    }
    
    int allPageNo = 0;
    
    if (allEventNo % postNo != 0) {
      allPageNo = (allEventNo / postNo) + 1;
    } else {
      allPageNo = allEventNo / postNo;
    }
    
    if (currentPage % postNo == 0) {
      for (int i = currentPage - 4; i <= allPageNo; i++) {
        if (list.size() == 5) {break;}
        list.add(i);
      }
    } else {
      int currentPosition = currentPage % postNo;
      if (currentPosition == 0) {currentPosition = 5;}
      for (int i = currentPage - currentPosition + 1; i <= allPageNo; i++) {
        if (list.size() == 5) {break;}
        list.add(i);
      }
    }
    
    return list;
  }
}
  
















