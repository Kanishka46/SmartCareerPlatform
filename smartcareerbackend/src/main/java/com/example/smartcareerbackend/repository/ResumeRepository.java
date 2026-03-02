package com.example.smartcareerbackend.repository;

import com.example.smartcareerbackend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {
}