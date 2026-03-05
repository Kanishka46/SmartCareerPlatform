// entity/Job.java
package com.example.smartcareerbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company;
    private String location;
    private String employmentType; // FULL_TIME, INTERN, CONTRACT
    @Column(length = 3000)
    private String description;
    private String requiredSkills;
    private String salaryRange;
    private Boolean active = true;
    private LocalDateTime postedAt;

    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    private User recruiter;

    @PrePersist
    public void prePersist() {
        this.postedAt = LocalDateTime.now();
        if (this.active == null) this.active = true;
    }
}
