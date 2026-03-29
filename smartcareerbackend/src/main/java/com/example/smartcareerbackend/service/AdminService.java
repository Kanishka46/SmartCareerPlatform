package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.dto.AdminOverviewResponse;
import com.example.smartcareerbackend.entity.ApplicationStatus;
import com.example.smartcareerbackend.entity.Role;
import com.example.smartcareerbackend.entity.User;
import com.example.smartcareerbackend.repository.InternshipRepository;
import com.example.smartcareerbackend.repository.JobApplicationRepository;
import com.example.smartcareerbackend.repository.JobRepository;
import com.example.smartcareerbackend.repository.UserRepository;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final InternshipRepository internshipRepository;

    public AdminService(
        UserRepository userRepository,
        JobRepository jobRepository,
        JobApplicationRepository jobApplicationRepository,
        InternshipRepository internshipRepository
    ) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.internshipRepository = internshipRepository;
    }

    public AdminOverviewResponse getOverview() {
        AdminOverviewResponse response = new AdminOverviewResponse();

        response.setTotalUsers(userRepository.count());
        response.setStudents(userRepository.countByRole(Role.STUDENT));
        response.setJobSeekers(userRepository.countByRole(Role.JOB_SEEKER));
        response.setRecruiters(userRepository.countByRole(Role.RECRUITER));
        response.setAdmins(userRepository.countByRole(Role.ADMIN));
        response.setActiveJobs(jobRepository.countByActiveTrue());
        response.setInternships(internshipRepository.count());
        response.setTotalApplications(jobApplicationRepository.count());
        response.setShortlistedApplications(jobApplicationRepository.countByStatus(ApplicationStatus.SHORTLISTED));
        response.setRejectedApplications(jobApplicationRepository.countByStatus(ApplicationStatus.REJECTED));

        List<AdminOverviewResponse.RecentUserDTO> recentUsers = userRepository.findAll().stream()
            .sorted(Comparator.comparing(User::getId).reversed())
            .limit(5)
            .map(user -> new AdminOverviewResponse.RecentUserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
            ))
            .toList();

        response.setRecentUsers(recentUsers);
        return response;
    }
}
