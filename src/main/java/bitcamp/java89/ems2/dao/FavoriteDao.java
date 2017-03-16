package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.Favorite;

public interface FavoriteDao {
  int insert(Favorite favorite) throws Exception;
  int getFavoriteCount(Favorite favorite) throws Exception;
}
