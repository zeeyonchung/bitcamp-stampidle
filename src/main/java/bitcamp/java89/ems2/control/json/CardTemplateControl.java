package bitcamp.java89.ems2.control.json;

import java.io.File;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.StampPosition;
import bitcamp.java89.ems2.service.CardTemplateService;
import bitcamp.java89.ems2.util.MultipartUtil;

@RestController
public class CardTemplateControl {
  @Autowired ServletContext sc;
  
  @Autowired CardTemplateService cardTemplateService;
  
  @RequestMapping(value = "/admin/cardadd/add")
  public AjaxResult add(StampPosition stampPosition) throws Exception {
    
    // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
    if (photo != null && photo.getSize() > 0) { 
      String newFilename = MultipartUtil.generateFilename();
      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
      event.setEventPhotoPath(newFilename);
    }
    
    eventService.add(event);

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  
}





