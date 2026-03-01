package com.example.smartcareerbackend.controller;

import com.example.smartcareerbackend.entity.StudentProfile;
import com.example.smartcareerbackend.service.StudentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping("/profile/{userId}")
    public StudentProfile getProfile(@PathVariable Long userId) {
        return service.getProfile(userId);
    }

    @PostMapping("/profile")
    public StudentProfile saveProfile(@RequestBody StudentProfile profile) {
        return service.saveProfile(profile);
    }
}