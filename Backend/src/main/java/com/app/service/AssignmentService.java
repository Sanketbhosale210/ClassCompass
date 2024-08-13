package com.app.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AssignmentRepository;
import com.app.entities.Assignment;


@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment saveAssignment(Assignment assignment) {
 
        return assignmentRepository.save(assignment);
    }
    
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id).orElse(null);
    }

	public void deleteAssignment(Long id) {
		assignmentRepository.deleteById(id);
		
	}
	public List<Assignment> getAssignmentsByDepartment(Long departmentId) {
        return assignmentRepository.findBySubjectDepartmentId(departmentId);
    }
}
