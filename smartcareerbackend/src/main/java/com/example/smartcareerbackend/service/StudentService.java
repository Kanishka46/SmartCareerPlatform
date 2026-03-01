package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.entity.StudentProfile;
import com.example.smartcareerbackend.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentProfileRepository repo;

    public StudentService(StudentProfileRepository repo) {
        this.repo = repo;
    }

    public StudentProfile getProfile(Long userId) {
        return repo.findByUserId(userId).orElse(null);
    }

    public StudentProfile saveProfile(StudentProfile profile) {
        return repo.save(profile);
    }
}