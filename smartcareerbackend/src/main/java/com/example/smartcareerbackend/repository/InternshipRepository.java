package com.example.smartcareerbackend.repository;

import com.example.smartcareerbackend.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipRepository
        extends JpaRepository<Internship, Long> {
}