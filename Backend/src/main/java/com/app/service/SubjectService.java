package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.SubjectRepository;
import com.app.dto.SubjectDTO;
import com.app.entities.Subject;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ModelMapper modelMapper; // Or use manual mapping
  
    public List<SubjectDTO> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        return subjects.stream()
                .map(subject -> modelMapper.map(subject, SubjectDTO.class))
                .collect(Collectors.toList());
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id).orElse(null);
    }

    public Subject saveSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }


   
    public Subject addSubject(Subject subject) {
        return subjectRepository.save(subject);
    }
    public List<Subject> getSubjectsByDepartment(Long departmentId) {
        List<Subject> subjects = subjectRepository.findByDepartmentId(departmentId);
//        return subjects.stream().map(subject -> modelMapper.map(subjects, SubjectDTO.class)).collect(Collectors.toList());
        return subjects;
    }

	public Optional<Subject> findById(Long subjectId) {
		// TODO Auto-generated method stub
		return subjectRepository.findById(subjectId);
	}
    
}