package com.example.smartcareerbackend.controller;

import com.example.smartcareerbackend.entity.Internship;
import com.example.smartcareerbackend.service.InternshipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}