package com.example.smartcareerbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.smartcareerbackend.entity.Internship;
import com.example.smartcareerbackend.repository.InternshipRepository;

@Service
public class InternshipService {

    private final InternshipRepository repo;

    public InternshipService(InternshipRepository repo) {
        this.repo = repo;
    }

    public List<Internship> getAllInternships() {
        return repo.findAll();
    }

    public Internship createInternship(Internship internship) {
        return repo.save(internship);
    }
}