package com.example.smartcareerbackend.repository;

import com.example.smartcareerbackend.entity.SavedInternship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedInternshipRepository
        extends JpaRepository<SavedInternship, Long> {
}