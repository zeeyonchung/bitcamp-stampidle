package bitcamp.java89.ems2.control.json;

import java.io.File;
import java.util.ArrayList;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java89.ems2.util.MultipartUtil;

@RequestMapping("/common/")
@RestController // 이 애노테이션을 붙이면, 스프링 설정 파일에 JSON 변환기 'MappingJackson2JsonView' 객체를 등록하지 않아도 된다.
public class CommonJsonControl {
  @Autowired ServletContext sc;
  
  @RequestMapping("fileupload")
  public AjaxResult fileupload(MultipartFile[] files) throws Exception {
    ArrayList<String> filenames = new ArrayList<>();
    
    // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
    if (files != null && files.length > 0) {
      for (MultipartFile file : files) {
        if (file.getSize() > 0) {
          String newFilename = MultipartUtil.generateFilename();
          file.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
          filenames.add(newFilename);
        }
      }
    }
    return new AjaxResult(AjaxResult.SUCCESS, filenames);
  }
  
  
  @RequestMapping("distance")
  public Long calDistance(double lat1, double lon1, double lat2, double lon2){  
      double theta, dist;  
      theta = lon1 - lon2;  
      dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))   
            * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));  
      dist = Math.acos(dist);  
      dist = rad2deg(dist);  
        
      dist = dist * 60 * 1.1515;   
      dist = dist * 1.609344;    // 단위 mile 에서 km 변환.  
      dist = dist * 1000.0;      // 단위  km 에서 m 로 변환  
      
      long distance = (long)dist;
      
      return distance;
  }  
    
      // 주어진 도(degree) 값을 라디언으로 변환  
  private double deg2rad(double deg){  
      return (double)(deg * Math.PI / (double)180d);  
  }  
    
      // 주어진 라디언(radian) 값을 도(degree) 값으로 변환  
  private double rad2deg(double rad){  
      return (double)(rad * (double)180d / Math.PI);  
  }
  
}





