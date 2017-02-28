package bitcamp.java89.ems2.control.json;

import java.io.File;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.StampCardInfo;
import bitcamp.java89.ems2.service.CardTemplateService;
import bitcamp.java89.ems2.util.MultipartUtil;

@RestController
public class CardTemplateControl {
  @Autowired ServletContext sc;
  
  @Autowired CardTemplateService cardTemplateService;
  
  @RequestMapping(value = "/admin/cardadd/add")
  public void add(StampCardInfo stampCardInfo) throws Exception {
    cardTemplateService.add(stampCardInfo);
  }
  
  
}





