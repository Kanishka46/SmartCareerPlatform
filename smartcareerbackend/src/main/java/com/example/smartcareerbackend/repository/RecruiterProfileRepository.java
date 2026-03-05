// repository/RecruiterProfileRepository.java
package com.example.smartcareerbackend.repository;

import com.example.smartcareerbackend.entity.RecruiterProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, Long> {
    Optional<RecruiterProfile> findByUserId(Long userId);
}
