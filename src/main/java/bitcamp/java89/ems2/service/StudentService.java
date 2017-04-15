package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Student;

public interface StudentService {
  List<Student> getList() throws Exception;
  Student getDetail(int no) throws Exception;
  int add(Student student) throws Exception;
  int delete(int no) throws Exception;
  int update(Student student) throws Exception;
}
















