// controller/RecruiterController.java
package com.example.smartcareerbackend.controller;

import com.example.smartcareerbackend.entity.*;
import com.example.smartcareerbackend.service.RecruiterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin
public class RecruiterController {

    private final RecruiterService recruiterService;

    public RecruiterController(RecruiterService recruiterService) {
        this.recruiterService = recruiterService;
    }

    @PostMapping("/profile")
    public RecruiterProfile saveProfile(@RequestBody RecruiterProfile profile) {
        return recruiterService.saveProfile(profile);
    }

    @GetMapping("/profile/{userId}")
    public RecruiterProfile getProfile(@PathVariable Long userId) {
        return recruiterService.getProfile(userId);
    }

    @PostMapping("/jobs/{recruiterId}")
    public Job createJob(@PathVariable Long recruiterId, @RequestBody Job job) {
        return recruiterService.createJob(recruiterId, job);
    }

    @GetMapping("/jobs/{recruiterId}")
    public List<Job> recruiterJobs(@PathVariable Long recruiterId) {
        return recruiterService.getRecruiterJobs(recruiterId);
    }

    @GetMapping("/job/{jobId}/applications")
    public List<JobApplication> getApplications(@PathVariable Long jobId) {
        return recruiterService.getApplicationsForJob(jobId);
    }

    @PatchMapping("/application/{applicationId}/status")
    public JobApplication updateStatus(@PathVariable Long applicationId,
                                       @RequestParam ApplicationStatus status) {
        return recruiterService.updateApplicationStatus(applicationId, status);
    }
}
