package com.example.smartcareerbackend.controller;

import com.example.smartcareerbackend.entity.Job;
import com.example.smartcareerbackend.service.JobSeekerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class JobController {

    private final JobSeekerService jobSeekerService;

    public JobController(JobSeekerService jobSeekerService) {
        this.jobSeekerService = jobSeekerService;
    }

    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobSeekerService.getAllActiveJobs();
    }

    @GetMapping("/jobs/search")
    public List<Job> searchJobs(@RequestParam(required = false) String keyword,
                                @RequestParam(required = false) String location) {
        return jobSeekerService.searchJobs(keyword, location);
    }
}
