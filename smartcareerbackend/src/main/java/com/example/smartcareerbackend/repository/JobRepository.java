// repository/JobRepository.java
package com.example.smartcareerbackend.repository;

import com.example.smartcareerbackend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByActiveTrueOrderByPostedAtDesc();
    List<Job> findByRecruiterIdOrderByPostedAtDesc(Long recruiterId);
    List<Job> findByActiveTrueAndTitleContainingIgnoreCaseOrActiveTrueAndLocationContainingIgnoreCase(String title, String location);
}
