package bitcamp.java89.ems2.control.json;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Cafe;
import bitcamp.java89.ems2.domain.CafeAdd;
import bitcamp.java89.ems2.domain.CafePhoto;
import bitcamp.java89.ems2.domain.CafeTime;
import bitcamp.java89.ems2.domain.Comment;
import bitcamp.java89.ems2.domain.CustomCard;
import bitcamp.java89.ems2.domain.Favorite;
import bitcamp.java89.ems2.domain.Menu;
import bitcamp.java89.ems2.domain.StampCardInfo;
import bitcamp.java89.ems2.domain.Tag;
import bitcamp.java89.ems2.service.CafeCardService;
import bitcamp.java89.ems2.service.CafePhotoService;
import bitcamp.java89.ems2.service.CafeService;
import bitcamp.java89.ems2.service.CafeTimeService;
import bitcamp.java89.ems2.service.CommentService;
import bitcamp.java89.ems2.service.CustomCardService;
import bitcamp.java89.ems2.service.FavoriteService;
import bitcamp.java89.ems2.service.LikesService;
import bitcamp.java89.ems2.service.MenuService;
import bitcamp.java89.ems2.service.TagService;


@RestController
public class CafeJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired CafeService cafeService;
  @Autowired CafeTimeService cafeTimeService;
  @Autowired TagService tagService;
  @Autowired CafePhotoService cafePhotoService;
  @Autowired CommentService commentService;
  @Autowired MenuService menuService;
  @Autowired LikesService likesService;
  @Autowired CafeCardService cafeCardService;
  @Autowired CustomCardService customCardService;
  @Autowired FavoriteService favoriteService;
  
  
  @RequestMapping("/admin/cafe/add")
  public AjaxResult add(@RequestBody CafeAdd cafe) throws Exception {
    cafeService.add(cafe);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping("/admin/cafe/cafeAllDelete")
  public AjaxResult cafeAllDelete(int cafeMemberNo) throws Exception {
    cafeService.cafeAllDelete(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping(value ={"/admin/cafe/getAllInfo"})
  public AjaxResult getAllInfo(int cafeMemberNo) throws Exception {
    Cafe cafe = (Cafe)cafeService.getDetail(cafeMemberNo);
    if (cafe == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 회원이 없습니다.");
    }
    Map<String,Object> dataMap = new HashMap<>();
    dataMap.put("cafe", cafe);
    dataMap.put("cafeTimeList", cafeTimeService.detailTime(cafeMemberNo));
    dataMap.put("cafePhotoList", cafePhotoService.detailCafePhoto(cafeMemberNo));
    dataMap.put("tag", tagService.detailTag(cafeMemberNo));
    dataMap.put("stampCardInfo", cafeCardService.getCardInfo(cafeMemberNo));
    dataMap.put("likeCount", likesService.count(cafeMemberNo));
    dataMap.put("menuList", menuService.detailMenu(cafeMemberNo));
    dataMap.put("commentList", commentService.getList(cafeMemberNo));
    
    return new AjaxResult(AjaxResult.SUCCESS, dataMap);
  }
  
  @RequestMapping(value ={"/cstmr_m/cafe/detail"})
  public AjaxResult detail(int cafeMemberNo, int customMemberNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();
    
    CustomCard customCard = (CustomCard)customCardService.getCustomCardDetail(customMemberNo, cafeMemberNo).get("cardDetail");
    if (customCard != null) {
      int customCardNo = customCard.getCustomCardNo();
      resultMap.put("customCardNo", customCardNo);
    }
    
    Cafe cafe = (Cafe)cafeService.getDetail(cafeMemberNo);
    if (cafe == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 카페가 없습니다.");
    }
    
    resultMap.put("cafe", cafe);
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
  
  @RequestMapping(value ={"/admin/cafe/detail"})
  public AjaxResult detail(int cafeMemberNo) throws Exception {
    Cafe cafe = (Cafe)cafeService.getDetail(cafeMemberNo);
    if (cafe == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 카페가 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, cafe);
  }
  
  
  @RequestMapping(value = {"/admin/cafeTime/detail", "/cstmr_m/cafeTime/detail"})
  public AjaxResult detailTime(int cafeMemberNo) throws Exception {
  	List<CafeTime> list = cafeTimeService.detailTime(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  
  @RequestMapping(value = {"/admin/tag/detail", "/cstmr_m/tag/detail"})
  public AjaxResult detailTag(int cafeMemberNo) throws Exception {
  	Tag tag = (Tag)tagService.detailTag(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, tag);
  }
  
  
  @RequestMapping(value = {"/admin/cafePhoto/detail"})
  public AjaxResult detailCafePhoto(int cafeMemberNo) throws Exception {
  	List<CafePhoto> list = cafePhotoService.detailCafePhoto(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  
  @RequestMapping(value = {"/admin/menu/detail", "/cstmr_m/menu/detail"})
  public AjaxResult detailMenu(int cafeMemberNo) throws Exception {
  	List<Menu> list = menuService.detailMenu(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  
  @RequestMapping(value = {"/admin/cardinfo/detail", "/cstmr_m/cardinfo/detail"})
  public AjaxResult detailCardInfo(int cafeMemberNo) throws Exception {
  	StampCardInfo stampCardInfo = (StampCardInfo)cafeCardService.getCardInfo(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, stampCardInfo);
  }
  
  
  @RequestMapping(value = {"/cstmr_m/comment/detail"})
  public AjaxResult getListDetail(int cafeMemberNo, int customMeberNo) throws Exception {
    List<Comment> list = commentService.getList(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  @RequestMapping(value = {"/admin/comment/detail"})
  public AjaxResult getList(int cafeMemberNo) throws Exception {
    List<Comment> list = commentService.getList(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  @RequestMapping(value = {"/cstmr_m/comment/delete"})
  public AjaxResult delete(int commentsNo) throws Exception {
    commentService.delete(commentsNo);
    return new AjaxResult(AjaxResult.SUCCESS, "좋아요 삭제 성공입니다.");
  }
  

  @RequestMapping(value = {"/admin/cafe/update"})
  public AjaxResult update(Cafe cafe) throws Exception {
    int count = cafeService.update(cafe);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 회원이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
  
  
  @RequestMapping(value = {"/admin/cafeTime/update"})
  public AjaxResult update(CafeTime cafeTime) throws Exception {
    int count = cafeTimeService.update(cafeTime);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 회원이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
  
  
  @RequestMapping(value = {"/admin/tag/update"})
  public AjaxResult update(Tag tag) throws Exception {
    int count = tagService.update(tag);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 회원이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
  
  
  @RequestMapping(value = {"/admin/cafePhoto/update"})
  public AjaxResult update(CafePhoto cafePhoto) throws Exception {
    int count = cafePhotoService.update(cafePhoto);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 회원이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
  
  @RequestMapping(value = {"/admin/menu/update"})
  public AjaxResult update(Menu menu) throws Exception {
    int count = menuService.update(menu);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 회원이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
  
  @RequestMapping(value = {"/admin/likes/count", "/cstmr_m/likes/count"})
  public AjaxResult likesCount(int cafeMemberNo) throws Exception {
    int num = likesService.count(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, num);
  }
  
  @RequestMapping(value = {"/cstmr_m/likes/addLikes"})
  public AjaxResult addLikes(int customMemberNo, int cafeMemberNo) throws Exception {
    likesService.addLikes(customMemberNo, cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, "좋아요 등록 성공입니다.");
  }
  
  @RequestMapping(value = {"/cstmr_m/likes/getLikesCount"})
  public AjaxResult getLikesCount(int customMemberNo, int cafeMemberNo) throws Exception {
    int countResult = likesService.getLikesCount(customMemberNo, cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, countResult);
  }
  
  @RequestMapping(value = {"/admin/comment/count", "/cstmr_m/comment/count"})
  public AjaxResult commentCount(int cafeMemberNo) throws Exception {
    int count = commentService.commentCount(cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, count);
  }
  
  @RequestMapping(value = {"/cstmr_m/likes/deleteLikes"})
  public AjaxResult deleteLikes(int customMemberNo, int cafeMemberNo) throws Exception {
    likesService.deleteLikes(customMemberNo, cafeMemberNo);
    return new AjaxResult(AjaxResult.SUCCESS, "좋아요 삭제 성공입니다.");
  }
  
  @RequestMapping(value = "/cstmr_m/comment/add")
  public AjaxResult commentAdd(Comment comment) throws Exception {
    commentService.add(comment);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping(value = "/cstmr_m/favorite/add")
  public AjaxResult favoriteAdd(Favorite favorite) throws Exception {
    favoriteService.add(favorite);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping(value = {"/cstmr_m/favorite/getFavoriteCount"})
  public AjaxResult getLikesCount(Favorite favorite) throws Exception {
    int countResult = favoriteService.getFavoriteCount(favorite);
    return new AjaxResult(AjaxResult.SUCCESS, countResult);
  }
  
  @RequestMapping(value = "/cstmr_m/favorite/delete")
  public AjaxResult favoriteDelete(Favorite favorite) throws Exception {
    favoriteService.delete(favorite);
    return new AjaxResult(AjaxResult.SUCCESS, "삭제 성공입니다.");
  }
  
}





