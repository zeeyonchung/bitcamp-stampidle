package bitcamp.java89.ems2.service;

import bitcamp.java89.ems2.domain.Favorite;

public interface FavoriteService {
  int add(Favorite favorite) throws Exception;
  int getFavoriteCount(Favorite favorite) throws Exception;
  int delete(Favorite favorite) throws Exception;
}
















