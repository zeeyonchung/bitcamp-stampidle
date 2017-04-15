package bitcamp.java89.ems2.control.json;

import java.io.File;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java89.ems2.domain.Student;
import bitcamp.java89.ems2.service.StudentService;
import bitcamp.java89.ems2.util.MultipartUtil;

//@Controller
@RestController // 이 애노테이션을 붙이면, 스프링 설정 파일에 JSON 변환기 'MappingJackson2JsonView' 객체를 등록하지 않아도 된다.
public class StudentJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired StudentService studentService;
  
  @RequestMapping(value = {"/admin/student/list", "/admin_m/student/list",  "/cstmr_m/student/list", "/student/list"})
  public AjaxResult list() throws Exception {
    List<Student> list = studentService.getList();
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  @RequestMapping(value = {"/admin/student/detail", "/admin_m/student/detail", "/cstmr_m/student/detail", "/student/detail"})
  public AjaxResult detail(int memberNo) throws Exception {
    Student student = studentService.getDetail(memberNo);
    
    if (student == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 학생이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, student);
  }
  
  @RequestMapping(value = {"/admin/student/add", "/admin_m/student/add", "/cstmr_m/student/add", "/student/add"})
  public AjaxResult add(Student student, MultipartFile photo) throws Exception {
    
    // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
    if (photo != null && photo.getSize() > 0) { 
      String newFilename = MultipartUtil.generateFilename();
      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
      student.setPhotoPath(newFilename);
    }
    
    studentService.add(student);

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }

  @RequestMapping(value = {"/admin/student/delete", "/admin_m/student/delete", "/cstmr_m/student/delete", "/student/delete"})
  public AjaxResult delete(int memberNo, HttpServletRequest request) throws Exception {
    int count = studentService.delete(memberNo);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "삭제 성공입니다.");
  }
  
  @RequestMapping(value = {"/admin/student/update", "/admin_m/student/update", "/cstmr_m/student/update", "/student/update"})
  public AjaxResult update(Student student, MultipartFile photo) throws Exception {
    
    if (photo != null && photo.getSize() > 0) { // 파일이 업로드 되었다면,
      String newFilename = MultipartUtil.generateFilename();
      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
      student.setPhotoPath(newFilename);
    }
    
    int count = studentService.update(student);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
}





