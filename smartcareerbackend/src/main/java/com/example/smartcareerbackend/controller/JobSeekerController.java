// controller/JobSeekerController.java
package com.example.smartcareerbackend.controller;

import com.example.smartcareerbackend.dto.ApplyJobRequest;
import com.example.smartcareerbackend.entity.Job;
import com.example.smartcareerbackend.entity.JobApplication;
import com.example.smartcareerbackend.entity.JobSeekerProfile;
import com.example.smartcareerbackend.service.JobSeekerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobseeker")
@CrossOrigin
public class JobSeekerController {

    private final JobSeekerService jobSeekerService;

    public JobSeekerController(JobSeekerService jobSeekerService) {
        this.jobSeekerService = jobSeekerService;
    }

    @PostMapping("/profile")
    public JobSeekerProfile saveProfile(@RequestBody JobSeekerProfile profile) {
        return jobSeekerService.saveProfile(profile);
    }

    @GetMapping("/profile/{userId}")
    public JobSeekerProfile getProfile(@PathVariable Long userId) {
        return jobSeekerService.getProfile(userId);
    }

    @GetMapping("/jobs")
    public List<Job> allJobs() {
        return jobSeekerService.getAllActiveJobs();
    }

    @GetMapping("/jobs/search")
    public List<Job> searchJobs(@RequestParam(required = false) String keyword,
                                @RequestParam(required = false) String location) {
        return jobSeekerService.searchJobs(keyword, location);
    }

    @PostMapping("/jobs/{jobId}/apply")
    public JobApplication apply(@PathVariable Long jobId, @RequestBody ApplyJobRequest request) {
        return jobSeekerService.apply(
                jobId,
                request.getJobSeekerId(),
                request.getCoverLetter(),
                request.getResumeUrl()
        );
    }

    @GetMapping("/applications/{jobSeekerId}")
    public List<JobApplication> myApplications(@PathVariable Long jobSeekerId) {
        return jobSeekerService.getMyApplications(jobSeekerId);
    }
}
