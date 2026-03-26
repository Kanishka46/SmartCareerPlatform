package com.example.smartcareerbackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.smartcareerbackend.entity.Internship;
import com.example.smartcareerbackend.service.InternshipService;

@RestController
@RequestMapping("/api/internships")
@CrossOrigin
public class InternshipController {

    private final InternshipService service;

    public InternshipController(InternshipService service) {
        this.service = service;
    }

    @GetMapping
    public List<Internship> getAll() {
        return service.getAllInternships();
    }

    @PostMapping
    public Internship create(@RequestBody Internship internship) {
        return service.createInternship(internship);
    }
}