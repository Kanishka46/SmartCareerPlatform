package com.example.smartcareerbackend.controller;

import com.example.smartcareerbackend.entity.Resume;
import com.example.smartcareerbackend.service.ResumeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin
public class ResumeController {

    private final ResumeService service;

    public ResumeController(ResumeService service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public Resume upload(@RequestBody Resume resume) {
        return service.saveResume(resume);
    }
}