package com.example.smartcareerbackend.repository;

import com.example.smartcareerbackend.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository
        extends JpaRepository<Education, Long> {
}