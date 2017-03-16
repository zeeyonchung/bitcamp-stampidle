package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.FavoriteDao;
import bitcamp.java89.ems2.domain.Favorite;
import bitcamp.java89.ems2.service.FavoriteService;

@Service
public class FavoriteImpl implements FavoriteService {
  @Autowired FavoriteDao favoriteDao;

  @Override
  public int add(Favorite favorite) throws Exception {
    return favoriteDao.insert(favorite);
  }
  @Override
  public int getFavoriteCount(Favorite favorite) throws Exception {
    return favoriteDao.getFavoriteCount(favorite);
  }
  
  
}
















