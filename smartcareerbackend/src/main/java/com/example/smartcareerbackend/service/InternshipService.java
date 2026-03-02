package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.entity.Internship;
import com.example.smartcareerbackend.repository.InternshipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InternshipService {

    private final InternshipRepository repo;

    public InternshipService(InternshipRepository repo) {
        this.repo = repo;
    }

    public List<Internship> getAllInternships() {
        return repo.findAll();
    }
}