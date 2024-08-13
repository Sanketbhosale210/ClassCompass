package com.app.dao;

import java.util.List;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Resource;

public interface ResourceRepository extends JpaRepository<Resource, Long>{
    List<Resource> findBySubjectDepartmentId(Long departmentId);
}
