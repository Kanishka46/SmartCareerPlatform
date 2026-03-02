package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.entity.Resume;
import com.example.smartcareerbackend.repository.ResumeRepository;
import org.springframework.stereotype.Service;

@Service
public class ResumeService {

    private final ResumeRepository repo;

    public ResumeService(ResumeRepository repo) {
        this.repo = repo;
    }

    public Resume saveResume(Resume resume) {
        return repo.save(resume);
    }
}