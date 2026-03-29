package com.example.smartcareerbackend.dto;

import java.util.List;

public class AdminOverviewResponse {

    private long totalUsers;
    private long students;
    private long jobSeekers;
    private long recruiters;
    private long admins;
    private long activeJobs;
    private long internships;
    private long totalApplications;
    private long shortlistedApplications;
    private long rejectedApplications;
    private List<RecentUserDTO> recentUsers;

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getStudents() {
        return students;
    }

    public void setStudents(long students) {
        this.students = students;
    }

    public long getJobSeekers() {
        return jobSeekers;
    }

    public void setJobSeekers(long jobSeekers) {
        this.jobSeekers = jobSeekers;
    }

    public long getRecruiters() {
        return recruiters;
    }

    public void setRecruiters(long recruiters) {
        this.recruiters = recruiters;
    }

    public long getAdmins() {
        return admins;
    }

    public void setAdmins(long admins) {
        this.admins = admins;
    }

    public long getActiveJobs() {
        return activeJobs;
    }

    public void setActiveJobs(long activeJobs) {
        this.activeJobs = activeJobs;
    }

    public long getInternships() {
        return internships;
    }

    public void setInternships(long internships) {
        this.internships = internships;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public long getShortlistedApplications() {
        return shortlistedApplications;
    }

    public void setShortlistedApplications(long shortlistedApplications) {
        this.shortlistedApplications = shortlistedApplications;
    }

    public long getRejectedApplications() {
        return rejectedApplications;
    }

    public void setRejectedApplications(long rejectedApplications) {
        this.rejectedApplications = rejectedApplications;
    }

    public List<RecentUserDTO> getRecentUsers() {
        return recentUsers;
    }

    public void setRecentUsers(List<RecentUserDTO> recentUsers) {
        this.recentUsers = recentUsers;
    }

    public static class RecentUserDTO {
        private Long id;
        private String name;
        private String email;
        private String role;

        public RecentUserDTO() {
        }

        public RecentUserDTO(Long id, String name, String email, String role) {
          this.id = id;
          this.name = name;
          this.email = email;
          this.role = role;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
