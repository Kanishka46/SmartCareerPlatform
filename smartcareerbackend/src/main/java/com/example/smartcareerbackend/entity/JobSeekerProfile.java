// entity/JobSeekerProfile.java
package com.example.smartcareerbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobSeekerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;
    private String location;
    private String skills; // comma-separated for Phase 1
    private String experienceLevel;
    private String resumeUrl;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
}
