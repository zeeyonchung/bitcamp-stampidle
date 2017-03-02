package bitcamp.java89.ems2.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.service.StatisticsService;

@RestController
public class StatisticsJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired StatisticsService statisticsService;
  
  @RequestMapping(value = "/admin/stat/getOne")
  public AjaxResult mainStatistics(int cafeMemberNo) throws Exception {
    
    return new AjaxResult(AjaxResult.SUCCESS, statisticsService.getOne(cafeMemberNo));
  }
  
}





