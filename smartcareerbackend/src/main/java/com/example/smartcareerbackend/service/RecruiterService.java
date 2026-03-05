// service/RecruiterService.java
package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.entity.*;
import com.example.smartcareerbackend.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruiterService {

    private final UserRepository userRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public RecruiterService(UserRepository userRepository,
                            RecruiterProfileRepository recruiterProfileRepository,
                            JobRepository jobRepository,
                            JobApplicationRepository jobApplicationRepository) {
        this.userRepository = userRepository;
        this.recruiterProfileRepository = recruiterProfileRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public RecruiterProfile saveProfile(RecruiterProfile profile) {
        return recruiterProfileRepository.save(profile);
    }

    public RecruiterProfile getProfile(Long userId) {
        return recruiterProfileRepository.findByUserId(userId).orElse(null);
    }

    public Job createJob(Long recruiterId, Job job) {
        User recruiter = userRepository.findById(recruiterId)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        if (recruiter.getRole() != Role.RECRUITER) {
            throw new RuntimeException("User is not recruiter");
        }
        job.setRecruiter(recruiter);
        return jobRepository.save(job);
    }

    public List<Job> getRecruiterJobs(Long recruiterId) {
        return jobRepository.findByRecruiterIdOrderByPostedAtDesc(recruiterId);
    }

    public List<JobApplication> getApplicationsForJob(Long jobId) {
        return jobApplicationRepository.findByJobIdOrderByAppliedAtDesc(jobId);
    }

    public JobApplication updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        JobApplication app = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        return jobApplicationRepository.save(app);
    }
}
