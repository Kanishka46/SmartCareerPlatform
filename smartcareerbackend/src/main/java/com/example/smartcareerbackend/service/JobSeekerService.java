// service/JobSeekerService.java
package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.entity.*;
import com.example.smartcareerbackend.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobSeekerService {

    private final UserRepository userRepository;
    private final JobSeekerProfileRepository jobSeekerProfileRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public JobSeekerService(UserRepository userRepository,
                            JobSeekerProfileRepository jobSeekerProfileRepository,
                            JobRepository jobRepository,
                            JobApplicationRepository jobApplicationRepository) {
        this.userRepository = userRepository;
        this.jobSeekerProfileRepository = jobSeekerProfileRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public JobSeekerProfile saveProfile(JobSeekerProfile profile) {
        return jobSeekerProfileRepository.save(profile);
    }

    public JobSeekerProfile getProfile(Long userId) {
        return jobSeekerProfileRepository.findByUserId(userId).orElse(null);
    }

    public List<Job> getAllActiveJobs() {
        return jobRepository.findByActiveTrueOrderByPostedAtDesc();
    }

    public List<Job> searchJobs(String keyword, String location) {
        return jobRepository.findByActiveTrueAndTitleContainingIgnoreCaseOrActiveTrueAndLocationContainingIgnoreCase(
                keyword == null ? "" : keyword,
                location == null ? "" : location
        );
    }

    public JobApplication apply(Long jobId, Long jobSeekerId, String coverLetter, String resumeUrl) {
        User seeker = userRepository.findById(jobSeekerId)
                .orElseThrow(() -> new RuntimeException("Job seeker not found"));
        if (seeker.getRole() != Role.JOB_SEEKER) {
            throw new RuntimeException("User is not job seeker");
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (jobApplicationRepository.findByJobIdAndJobSeekerId(jobId, jobSeekerId).isPresent()) {
            throw new RuntimeException("Already applied for this job");
        }

        JobApplication app = new JobApplication();
        app.setJob(job);
        app.setJobSeeker(seeker);
        app.setCoverLetter(coverLetter);
        app.setResumeUrl(resumeUrl);
        app.setStatus(ApplicationStatus.APPLIED);

        return jobApplicationRepository.save(app);
    }

    public List<JobApplication> getMyApplications(Long jobSeekerId) {
        return jobApplicationRepository.findByJobSeekerIdOrderByAppliedAtDesc(jobSeekerId);
    }
}
