// repository/JobApplicationRepository.java
package com.example.smartcareerbackend.repository;

import com.example.smartcareerbackend.entity.JobApplication;
import com.example.smartcareerbackend.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByJobSeekerIdOrderByAppliedAtDesc(Long jobSeekerId);
    List<JobApplication> findByJobIdOrderByAppliedAtDesc(Long jobId);
    Optional<JobApplication> findByJobIdAndJobSeekerId(Long jobId, Long jobSeekerId);
    long countByStatus(ApplicationStatus status);
}
